/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import template from "./app.html";
import { ViewManager, View } from "@paperbits/common/ui";
import { Component, OnMounted, OnDestroyed } from "@paperbits/common/ko/decorators";
import { IObjectStorage, Query } from "@paperbits/common/persistence";
import { PageContract, IPageService, PageLocalizedContract } from "@paperbits/common/pages";
import { LayoutContract, ILayoutService, LayoutLocalizedContract } from "@paperbits/common/layouts";
import { Contract } from  "@paperbits/common/contract";
import { IBlockService } from  "@paperbits/common/blocks";
import { PageItem } from "@paperbits/core/workshops/page/ko/pageItem";
import { HttpClient } from "@paperbits/common/http";
import { IMediaService, MediaContract } from "@paperbits/common/media";
import { IUrlService, UrlContract } from "@paperbits/common/urls";
import { LayoutItem } from "@paperbits/core/workshops/layout/ko";
import { layoutTemplate } from "@paperbits/common/layouts/layoutTemplate";
import { EventManager } from "@paperbits/common/events";
import { EmailContract } from "@paperbits/emails/emailContract";
import { EmailItem } from "@paperbits/emails/workshops/emails/ko";
import { EmailService } from "@paperbits/emails/emailService";

const documentsPath = "files";
const templateBlockKey = "blocks/new-page-template";
const templateBlockEmailKey = "blocks/new-email-template";
const urlPath = "../../.env";
import { Logger } from "@paperbits/common/logging";

@Component({
    selector: "app",
    template: template
})

export class App {
    protected pagesPath: string = "pages";
    protected layoutsPath: string = "layouts";
    protected emailTemplatesPath: string = "emailTemplates";
    private brandWingsURL = "";
    private currentObject = {};
    private bearerToken = "";
    private themeId = "";
    
    constructor(
        private readonly viewManager: ViewManager,
        private readonly objectStorage: IObjectStorage,
        private readonly pageService: IPageService,
        private readonly blockService: IBlockService,
        private readonly httpClient: HttpClient,
        private readonly mediaService: IMediaService,
        private readonly urlService: IUrlService,
        private readonly layoutService: ILayoutService,
        private readonly emailService: EmailService,
        private readonly logger: Logger,
        private readonly eventManager: EventManager
    ) { 
        eventManager.addEventListener("onSaveChanges", async () => {
            var document = viewManager.getHostDocument();
            var sendObject = {
                type: this.currentObject['type'],
                id: this.currentObject['id'],
                html: document.documentElement.innerHTML
            }
            // return new Promise<void>(resolve => { 
            //     window.parent.postMessage({
            //             "message": "builder.saveHTML",
            //             "object": sendObject
            //         }, this.brandWingsURL)
            //     resolve();
            // });
            window.parent.postMessage({
                "message": "builder.saveHTML",
                "object": sendObject
            }, this.brandWingsURL)
        });
    }
        
    @OnMounted()
    public async initialize(): Promise<void> {
        var params = new Array();
        if(window.location.search) {
            var paramsString = window.location.search.split("?")[1];
            var paramValues = paramsString.split("&");
            paramValues.forEach(param => {
                var paramValue = param.split("=");
                params[paramValue[0]] = paramValue[1];
            });
        }

        this.viewManager.setHost({ name: "page-host" });

        //NEW FROM PAPERBITS
        this.logger.trackEvent("Startup", { message: `App started.` });

        setTimeout(() => this.eventManager.dispatchEvent("displayHint", {
            key: "a69b",
            content: `When you're in the administrative view, you still can navigate any website hyperlink by clicking on it holding Ctrl (Windows) or ⌘ (Mac) key.`
        }), 5000);
        //END NEW FROM PAPERBITS

        this.httpClient.send({
            url: "/data/url.json",
            method: "GET"
        }).then(response => {
            var responseObject = response.toObject();
            this.brandWingsURL = responseObject['BRAND_WINGS_URL'];
        });

        window.addEventListener("message", this.functionEventListener);
    }

    @OnDestroyed()
    public async dispose(): Promise<void> {
        window.removeEventListener("message", this.functionEventListener);
    }

    public functionEventListener(event) {
        if(event.origin != this.brandWingsURL) {
            return;
        }
        var eData = event.data;
        this.currentObject = eData;
        this.openObject(eData);
    }

    public openObject(object) {
        if(object.token) {
            this.bearerToken = object.token
        }
        if(object.themeId) {
            this.themeId = object.themeId
        }
        if(object.type) {
            switch (object.type) {
                case "style":
                    this.openStyle(object.content.style, object.hideScreen);
                    break;
                case "layout":
                    this.loadImageList(object.imagesList);
                    this.loadUrlsList(object.urlsList);
                    this.loadLinkPagesList(object.pageLinksList);
                    this.loadMenuList(object.menusList);
                    this.openStyle(object.styles, object.hideScreen);
                    this.openLayoutObject(object.id, object.name, object.markup);
                    break;
                case "page":
                    this.loadImageList(object.imagesList);
                    this.loadUrlsList(object.urlsList);
                    this.loadLinkPagesList(object.pageLinksList, object.id);
                    this.openStyle(object.styles, object.hideScreen);
                    this.openPageObject(object.id, object.title, object.language, object.markup)
                    break;
                case "emailTemplate":
                    this.loadImageList(object.imagesList);
                    this.loadVariablesList(object.variableFields)
                    this.openStyle(object.styles, object.hideScreen);
                    this.openEmailObject(object.id, object.title, object.language, object.markup)
                    break;
                case "images": 
                    this.loadImageList(object);
                    break;
                default:
                    break;
            }
        }
    }

    public async openPageObject(pageId: string, pageTitle: string, requestedLocale: string, content: string): Promise<void> {
        let pageObject = await this.pageService.getPageByKey(pageId);

        const pageUrl = "/pages/" + pageId;
        if(!pageObject) {
            pageObject = await this.createPage(pageUrl, pageTitle, "", "", pageId, requestedLocale, content)
        }

        const pageItem = new PageItem(pageObject);

        const view: View = {
            heading: "Page",
            component: {
                name: "page-details-workshop",
                params: {
                    pageItem: pageItem,
                }
            }
        };

        this.viewManager.openViewAsWorkshop(view);
    }

    public async createPage(permalink: string, title: string, description: string, keywords: string, identifier: string, locale: string, content: string): Promise<PageContract> {
        const pageKey = `${this.pagesPath}/${identifier}`;
        const contentKey = `${documentsPath}/${identifier}`;

        const localizedPage: PageLocalizedContract = {
            key: pageKey,
            locales: {
                [locale]: {
                    title: title,
                    description: description,
                    keywords: keywords,
                    permalink: permalink,
                    contentKey: contentKey
                }
            }
        };

        
        await this.objectStorage.addObject<PageLocalizedContract>(pageKey, localizedPage);
        
        let template;
        if(content && content != '') {
            template = {
                nodes: JSON.parse(content),
                type: "page",
                key: contentKey
            }
        } else {
            template = await this.blockService.getBlockContent(templateBlockKey);
            template["key"] = contentKey;
        }
        await this.objectStorage.addObject<Contract>(contentKey, template);
        
        const pageContent: PageContract = {
            key: pageKey,
            title: title,
            description: description,
            keywords: keywords,
            permalink: permalink,
            contentKey: contentKey
        };

        return pageContent;
    }

    public async openLayoutObject(layoutId: string, layoutName: string, layoutContent: string) {
        let layoutObject = await this.layoutService.getLayoutByKey(layoutId)

        if(!layoutObject) {
            const layoutUrlTemplate = "/" + layoutId;
            layoutObject = await this.createLayout(layoutName, "", layoutUrlTemplate, layoutId, layoutContent);
        }
        const layoutItem = new LayoutItem(layoutObject);

        const view: View = {
            heading: "Layout",
            component: {
                name: "layout-details-workshop",
                params: {
                    layoutItem: layoutItem
                }
            }
        };

        this.viewManager.openViewAsWorkshop(view);
    }

    public async createLayout(title: string, description: string, permalinkTemplate: string, identifier: string, content: string): Promise<LayoutContract> {
        const layoutKey = `${this.layoutsPath}/${identifier}`;
        const contentKey = `${documentsPath}/${identifier}`;

        const localizedLayout: LayoutLocalizedContract = {
            key: layoutKey,
            locales: {
                ['en-us']: {
                    title: title,
                    description: description,
                    permalinkTemplate: permalinkTemplate,
                    contentKey: contentKey
                }
            }
        };

        await this.objectStorage.addObject<LayoutLocalizedContract>(layoutKey, localizedLayout);
        let layoutNewTemplate;
        if(content && content != '') {
            layoutNewTemplate = {
                nodes: JSON.parse(content),
                type: "layout"
            }
        } else {
            layoutNewTemplate = layoutTemplate;
        }
        await this.objectStorage.addObject<Contract>(contentKey, layoutNewTemplate);

        const layoutContent: LayoutContract = {
            key: layoutKey,
            title: title,
            description: description,
            permalinkTemplate: permalinkTemplate,
            contentKey: contentKey
        };

        return layoutContent;
    }

    public async loadImageList(imagesList) {
        const query = Query
            .from<MediaContract>()
            .orderBy(`fileName`);
        this.mediaService.search(query)
            .then(response => {
                response.value.forEach(element => {
                    this.mediaService.deleteMedia(element)
                });
                Object.values(imagesList).forEach(image => {
                    const media: MediaContract = {
                        key: image["key"],
                        fileName: image["fileName"],
                        blobKey: undefined,
                        downloadUrl: image["downloadUrl"],
                        description: "",
                        keywords: "",
                        permalink: image["permalink"],
                        mimeType: image["mimeType"]
                    };
                    this.objectStorage.addObject(media.key, media);
                });
            })
    }

    public async loadMenuList(menusList) {
        menusList.forEach(element => {
            element.navigationItems = [{
                key: element.key,
                label: element.label,
                navigationItems: [],
                targetKey: element.key,
                targetWindow: "_self",
            }]
        });

        this.objectStorage.deleteObject('navigationItems')
            .then(() => {
                this.objectStorage.addObject('navigationItems', menusList);
            })
    }

    public async loadUrlsList(urlsList) {
        const query = Query
            .from<UrlContract>()
            .orderBy(`title`);
        this.urlService.search(query)
            .then(response => {
                response.value.forEach(element => {
                    if(element.permalink !== '{{Link}}') {
                        this.urlService.deleteUrl(element)
                    }
                });
                if(urlsList) {
                    Object.values(urlsList).forEach(url => {
                        const urlItem: UrlContract = {
                            key: url["key"],
                            permalink: url["permalink"],
                            title: url["title"]
                        };
                        this.objectStorage.addObject(urlItem.key, urlItem);
                    });
                }
            })
    }

    public openStyle(content, hideScreen = true) {
        if(content) {
            this.objectStorage.deleteObject('style')
                .then(() => {
                    this.objectStorage.addObject('styles', JSON.parse(content))
                    if(!hideScreen) {
                        this.viewManager.setHost({ name: "style-guide" });
                    }
                })
        } else {
            this.viewManager.setHost({ name: "page-host" });
        }
    }

    public async loadVariablesList(variablesList) {
        this.objectStorage.deleteObject('variables')
            .then(() => {
                this.objectStorage.addObject('variables', variablesList);
            })
    }

    public async openEmailObject(emailId, title, description, emailContent) {
        let emailObject = await this.emailService.getEmailTemplateByKey(emailId)

        if(!emailObject) {
            const emailUrlTemplate = "/" + emailId;
            emailObject = await this.createEmailTemplate(title, description, emailId, emailContent);
        }

        const emailItem = new EmailItem(emailObject)

        this.viewManager.setHost({ name: "email-host" });

        const view: View = {
            heading: "Email template",
            component: {
                name: "email-details-workshop",
                params: {
                    emailItem: emailItem,
                }
            }
        };

        this.viewManager.openViewAsWorkshop(view);
    }

    public async createEmailTemplate(title: string, description: string, identifier: string, content: string): Promise<EmailContract> {
        const emailTemplateKey = `${this.emailTemplatesPath}/${identifier}`;
        const contentKey = `${documentsPath}/${identifier}`;

        const emailTemplate: EmailContract = {
            key: emailTemplateKey,
            title: title,
            description: description,
            contentKey: contentKey
        };

        await this.objectStorage.addObject(emailTemplateKey, emailTemplate);

        let template;
        if(content && content != '') {
            template = {
                nodes: JSON.parse(content),
                type: "email",
                key: contentKey
            }
        } else {
            template = await this.blockService.getBlockContent(templateBlockEmailKey);
            template["key"] = contentKey;
        }

        await this.objectStorage.addObject(contentKey, template);

        return emailTemplate;
    }

    public async loadLinkPagesList(pageLinksList, currentPageId = null) {
        const query = Query
            .from<PageContract>()
            .orderBy(`title`);
        this.pageService.search(query)
            .then(response => {
                response.value.forEach(element => {
                    if(element.permalink !== '/') {
                        this.pageService.deletePage(element)
                    }
                });
                if(pageLinksList) {
                    Object.values(pageLinksList).forEach(async page => {
                        if(page["id"] != currentPageId) {
                            const pageUrl = "/pages/" + page["id"];
                            await this.createPage(pageUrl, page["title"], "", "", page["id"], page["language"].toLowerCase(), '[]')
                        }
                    });
                }
            })
    }
}
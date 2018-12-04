import * as ko from "knockout";
import * as Utils from "@paperbits/common/utils";
import { IBlogService, BlogPostContract } from "@paperbits/common/blogs";
import { IPublisher } from "@paperbits/common/publishing";
import { IRouteHandler } from "@paperbits/common/routing";
import { IBlobStorage } from "@paperbits/common/persistence";
import { ISettings, ISiteService } from "@paperbits/common/sites";
import { IPermalinkService } from "@paperbits/common/permalinks";
import { IMediaService, MediaContract } from "@paperbits/common/media";
import { MetaDataSetter } from "@paperbits/common/meta";
import { LayoutViewModelBinder } from "@paperbits/core/layout/ko";
import { createDocument } from "@paperbits/core/ko/knockout-rendring";
import { ISettingsProvider } from "@paperbits/common/configuration";

export class BlogPublisher implements IPublisher {
    constructor(
        private readonly routeHandler: IRouteHandler,
        private readonly blogService: IBlogService,
        private readonly permalinkService: IPermalinkService,
        private readonly siteService: ISiteService,
        private readonly outputBlobStorage: IBlobStorage,
        private readonly layoutViewModelBinder: LayoutViewModelBinder,
        private readonly mediaService: IMediaService,
        private readonly settingsProvider: ISettingsProvider
    ) {
        this.publish = this.publish.bind(this);
        this.renderBlogPost = this.renderBlogPost.bind(this);
    }

    private async renderBlogPost(post: BlogPostContract, settings: ISettings, iconFile: MediaContract): Promise<{ name, bytes }> {
        console.log(`Publishing blog post ${post.title}...`);

        const pageTemplate = <string>await this.settingsProvider.getSetting("pageTemplate");
        const templateDocument = createDocument(pageTemplate);

        let resourceUri: string;
        let htmlContent: string;

        const buildContentPromise = new Promise(async (resolve, reject) => {
            const permalink = await this.permalinkService.getPermalinkByKey(post.permalinkKey);
            resourceUri = permalink.uri;

            this.routeHandler.navigateTo(resourceUri);

            const layoutViewModel = await this.layoutViewModelBinder.getLayoutViewModel();
            ko.applyBindingsToNode(templateDocument.body, { widget: layoutViewModel });

            setTimeout(() => {
                this.setSiteSettings(templateDocument, settings, iconFile, post);
                htmlContent = "<!DOCTYPE html>" + templateDocument.documentElement.outerHTML;
                resolve();
            }, 10);
        });

        await buildContentPromise;

        const contentBytes = Utils.stringToUnit8Array(htmlContent);

        if (!resourceUri || resourceUri === "/blog") {
            resourceUri = "/blog/index.html";
        }
        else {
            // if filename has no extension we publish it to a dedicated folder with index.html
            if (!resourceUri.substr((~-resourceUri.lastIndexOf(".") >>> 0) + 2)) {
                resourceUri = `/${resourceUri}/index.html`;
            }
        }

        return { name: resourceUri, bytes: contentBytes };
    }

    public async publish(): Promise<void> {
        const posts = await this.blogService.search("");
        const results = [];
        const settings = await this.siteService.getSiteSettings();

        let iconFile;

        if (settings && settings.site.faviconPermalinkKey) {
            iconFile = await this.mediaService.getMediaByPermalinkKey(settings.site.faviconPermalinkKey);
        }

        const renderAndUpload = async (page): Promise<void> => {
            const pageRenderResult = await this.renderBlogPost(page, settings, iconFile);
            await this.outputBlobStorage.uploadBlob(`website\\${pageRenderResult.name}`, pageRenderResult.bytes);
        };

        for (const post of posts) {
            results.push(renderAndUpload(post));
        }

        await Promise.all(results);
    }

    public setSiteSettings(templateDocument: Document, settings: ISettings, iconFile: MediaContract, post: BlogPostContract): void {
        if (settings && post) {
            if (settings.site.faviconPermalinkKey) {
                if (iconFile && iconFile.downloadUrl) {
                    MetaDataSetter.setFavIcon(iconFile.downloadUrl);
                }
            }

            templateDocument.title = `${post.title} | Blog | ${settings.site.title}`;

            if (settings.site.description) {
                MetaDataSetter.setDescription(post.description || settings.site.description);
            }
            if (settings.site.keywords) {
                MetaDataSetter.setKeywords(post.keywords);
            }
            if (settings.site.author) {
                MetaDataSetter.setAuthor(settings.site.author);
            }
        }
    }
}
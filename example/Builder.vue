<template>
<div id="builder_content">
    <page-title :page="getTitle" folder="portal.content_pages" :section="$t('app.portal.content_pages.breadcrumb_section')" :show-back="true" :breadcrumb="getBreadcrumb">
        <div slot="actions" class="page-actions">
        </div>
    </page-title>
    <h3 class="pt-12 pb-12" v-if="showEditLayout">
        <span v-if="!layout.isEditing && layout">
            {{layout.name}}
            <b-button variant="btn btn-circular btn-small" class="ml-3" v-b-tooltip.hover.window :title="$t('app.portal.themes.tooltips.edit_name')" @click="editName(layout)">
                <span class="mdi mdi-pencil"></span>
            </b-button>
        </span>
        <span v-if="layout.isEditing">
            <b-row>
                <b-col>
                    <b-form-input id="name" size="sm" v-model="layout.name"></b-form-input>
                </b-col>
                <b-col md="auto" class=" ml-3">
                    <b-button class="btn btn-circular btn-small" v-b-tooltip.hover.window :title="$t('app.portal.themes.tooltips.cancel_edit')" @click="cancelEditName(layout)">
                        <span class="mdi mdi-cancel"></span>
                    </b-button>
                    <b-button variant="btn btn-circular btn-small" v-b-tooltip.hover.window :title="$t('app.portal.themes.tooltips.save_edit')" @click="saveName(layout)">
                        <span class="mdi mdi-content-save"></span>
                    </b-button>
                </b-col>
            </b-row>
        </span>
    </h3>
    <vue-friendly-iframe ref="printMe" :src="getBuilderSource" className="iframe-builder" target="_blank"></vue-friendly-iframe>
</div>
</template>

<script>
import mimeTypes from 'mime-types';
import commonMixins from "@/mixins/commonMixins";

export default {
    name: 'PortalBuilder',
    mixins: [
        commonMixins
    ],
    data() {
        return {
            page: {},
            layout: {},
            style: {},
            emailTemplate: {},
            frameLoaded: false,
            savingObject: false,
            imagesList: {},
            menusList: {},
            stylesList: [],
            portal: [],
            breadcrumbPage: [{
                    params: {
                        name: 'contentpages'
                    },
                    label: this.$t('app.template.navigation.portal.content_pages')
                },
                {
                    params: '/portal/contentpages/details/' + this.$route.params.id,
                    label: this.$t('app.portal.content_pages.breadcrumb_section')
                },
                {
                    params: '',
                    label: this.$t('app.portal.builder.page_builder')
                }
            ],
            breadcrumbLayout: [{
                    params: {
                        name: 'themes'
                    },
                    label: this.$t('app.template.navigation.portal.theme_design')
                },
                {
                    params: '/portal/themes/details/' + this.$route.params.themeId,
                    label: this.$t('app.portal.themes.breadcrumb_section')
                },
                {
                    params: '',
                    label: this.$t('app.portal.builder.layout_builder')
                }
            ],
            breadcrumbStyle: [{
                    params: {
                        name: 'themes'
                    },
                    label: this.$t('app.template.navigation.portal.theme_design')
                },
                {
                    params: '/portal/themes/details/' + this.$route.params.id,
                    label: this.$t('app.portal.themes.breadcrumb_section')
                },
                {
                    params: '',
                    label: this.$t('app.portal.builder.style_editor')
                }
            ],
            breadcrumbEmailTemplate: [{
                    params: {
                        name: 'notificationTemplates'
                    },
                    label: this.$t('app.notificationTemplates.title')
                },
                {
                    params: '/settings/notificationTemplates/details/' + this.$route.params.id,
                    label: this.$t('app.notificationTemplates.details')
                },
                {
                    params: '',
                    label: this.$t('app.portal.builder.email_builder')
                }
            ],
        }
    },
    metaInfo() {
        return {
            title: this.$t('app.portal.themes.portal_buider')
        }
    },
    computed: {
        getBuilderSource() {
            var url = process.env.VUE_APP_PAPERBIT_URL;
            if (this.$route.params.type && this.$route.params.type != "") {
                url = url + "/?type=" + this.$route.params.type;
            }
            if (this.$route.params.id && this.$route.params.id != "") {
                url = url + "&id=" + this.$route.params.id;
            }
            return url;
        },
        getBreadcrumb() {
            if (this.$route.params.type == 'page') {
                return this.breadcrumbPage;
            } else if (this.$route.params.type == 'layout') {
                return this.breadcrumbLayout;
            } else if (this.$route.params.type == 'style') {
                return this.breadcrumbStyle;
            } else if (this.$route.params.type == 'emailTemplate') {
                return this.breadcrumbEmailTemplate;
            }
            return null
        },
        showEditLayout() {
            return this.$route.params.type == 'layout';
        },
        getTitle() {
            if (this.$route.params.type == 'page') {
                return this.page.title;
            } else if (this.$route.params.type == 'layout') {
                return this.layout.name;
            } else if (this.$route.params.type == 'style') {
                return this.$t('app.portal.builder.style_editor');
            } else if (this.$route.params.type == 'emailTemplate') {
                return this.emailTemplate.name;
            }
            return this.$t('app.portal.builder.title')
        }
    },
    mounted() {
        this.initBuilder();
    },
    methods: {
        async initBuilder() {
            await this.getPortalSettings();
            await this.getStyle()
            window.addEventListener('message', this.receiveMessage)
        },
        async getPortalSettings() {
            await this.$http.get('/portals')
                .then(response => {
                    this.portal = response.data;
                })
        },
        async getPage() {
            this.mountImageList();
            var themeId = this.portal.themeId;
            await this.$http.get('themes/' + themeId + '/style')
                .then(response => {
                    this.stylesList = response.style;

                    this.$http.get('contentpages/' + this.$route.params.id)
                        .then(response => {
                            this.page = response.data;
                            var _page = this.page;
                            _page.imagesList = this.imagesList;
                            _page.styles = this.stylesList;
                            _page.language = _page.language.toLowerCase();
                            this.sendMessage(_page, 'page')
                        })
                })
        },
        sendMessage(object, type) {
            var iframe = document.querySelector(".iframe-builder");
            var _window = iframe.contentWindow;
            object.type = type;
            setTimeout(function () {
                _window.postMessage(object, process.env.VUE_APP_PAPERBIT_URL)
            }, 500)
        },
        receiveMessage(event) {
            if (event.origin != process.env.VUE_APP_PAPERBIT_URL) {
                return;
            }
            switch (event.data.message) {
                case "builder.loaded":
                    if (!this.frameLoaded) {
                        this.frameLoaded = true;
                        switch (this.$route.params.type) {
                            case 'page':
                                this.getPage();
                                break
                            case 'layout':
                                this.getLayout();
                                break;
                            case 'style':
                                this.getStyle();
                                break;
                            case 'emailTemplate':
                                this.getEmailTemplate();
                                break;
                            default:
                                this.getPage();
                        }
                    }
                    break;
                case "builder.saved":
                    var saveObject = event.data.object;
                    if (saveObject) {
                        var saveData = {
                            type: null
                        }
                        if (saveObject.emailTemplates) {
                            saveData = saveObject.files[this.$route.params.id];
                            saveData.type = 'email-layout'
                        } else if (saveObject.files) {
                            saveData = saveObject.files[this.$route.params.id];
                        } else if (saveObject.styles) {
                            saveData.type = 'styles'
                        }
                        setTimeout(() => {
                            if (saveData.type == 'page') {
                                this.savePage(saveData['nodes'], saveObject.thumbnail);
                            } else if (saveData.type == 'layout') {
                                this.saveLayout(saveData['nodes']);
                            } else if (saveData.type == 'styles') {
                                this.saveStyle(saveObject)
                            } else if (saveData.type == 'email-layout') {
                                this.saveEmailTemplate(saveData['nodes'], saveObject.thumbnail)
                            }
                        }, 500);
                    }
                    break;
                case "builder.imageUploaded":
                    var image = event.data.object;
                    if (image) {
                        this.uploadImage(image)
                    }
                    break
                case "builder.saveHTML":
                    var saveContent = event.data.object;
                    this.defineHTML(saveContent);
                    break;
                default:
                    break;
            }
        },
        savePage(markup, thumbnail) {
            this.page.markup = JSON.stringify(markup);
            this.page.previewImage = thumbnail.replace(/^.+?(\bbase64\b)/, '').substring(1);
            this.page.previewImageName = 'thumbPage.png';
            setTimeout(() => {
                if (!this.savingObject && this.page.id && this.page.id == this.$route.params.id) {
                    this.savingObject = true;
                    this.page.content = this.page.content.replace(this.style.content.html, '')
                    this.$http.put('contentPages', this.page)
                        .then(() => {
                            this.savingObject = false;
                        })
                }
            }, 500);
        },
        uploadImage(image) {
            var extension = mimeTypes.extension(image.mimeType);
            var name = 'image_' + this.create_UUID();
            var saveObject = {
                fileName: name + '.' + extension,
                name: name,
                file: image.content
            }
            this.$http.post('portals/images', saveObject);
        },
        async mountImageList() {
            this.imagesList = [];
            await this.$http.get('portals/images')
                .then(response => {
                    response.data.forEach(image => {
                        var imageSource = {
                            description: image.description,
                            downloadUrl: image.url,
                            fileName: image.name,
                            key: "uploads/" + image.id,
                            keywords: "",
                            mimeType: "image/png",
                            permalink: "/images/" + image.name
                        }
                        this.imagesList[image.id] = imageSource;
                    });
                })
        },
        async mountMenus() {
            this.menusList = [];
            await this.$http.get('themes/' + this.$route.params.themeId + '/menus')
                .then(response => {
                    response.data.forEach(menu => {
                        if (!menu.endDate) {
                            var navigationItem = {
                                key: menu.id,
                                label: menu.name,
                                navigationItems: []
                            }
                            this.$http.get('themes/' + this.$route.params.themeId + '/menus/' + menu.id)
                                .then(response1 => {
                                    response1.data.themeMenuItems.forEach(menu1 => {
                                        var targetKey = this.getMenuLink(menu1);
                                        var submenuItem = {
                                            key: menu1.id,
                                            label: menu1.label,
                                            targetKey: targetKey,
                                            targetWindow: menu1.newTab ? '_blank' : '_self',
                                            navigationItems: []
                                        }
                                        menu1.childMenuItems.forEach(menu2 => {
                                            var targetKey2 = this.getMenuLink(menu2);
                                            var submenuItem2 = {
                                                key: menu2.id,
                                                label: menu2.label,
                                                targetKey: targetKey2,
                                                targetWindow: menu2.newTab ? '_blank' : '_self',
                                                navigationItems: []
                                            };
                                            menu2.childMenuItems.forEach(menu3 => {
                                                var targetKey3 = this.getMenuLink(menu3);
                                                var submenuItem3 = {
                                                    key: menu3.id,
                                                    label: menu3.label,
                                                    targetKey: targetKey3,
                                                    targetWindow: menu3.newTab ? '_blank' : '_self',
                                                    navigationItems: []
                                                };
                                                submenuItem2.navigationItems.push(submenuItem3);
                                            });
                                            submenuItem.navigationItems.push(submenuItem2);
                                        });
                                        navigationItem.navigationItems.push(submenuItem);
                                    });
                                })
                            this.menusList.push(navigationItem)
                        }
                    });
                })
        },
        getMenuLink(menuItem) {
            var targetKey = null;
            if (menuItem.type == 'URL') {
                targetKey = menuItem.url
            } else if (menuItem.type == 'ParentOnly') {
                targetKey = null
            } else if (menuItem.type == 'ContentPage') {
                targetKey = '/pages/' + menuItem.targetID
            } else if (menuItem.type == 'Template') {
                targetKey = '/templates/' + menuItem.targetID
            } else if (menuItem.type == 'Asset') {
                targetKey = '/assets/' + menuItem.targetID
            } else if (menuItem.type == 'Product') {
                targetKey = '/products/' + menuItem.targetID
            } else if (menuItem.type == 'Folders') {
                if (menuItem.targetID) {
                    targetKey = '/folders/' + menuItem.targetID
                } else {
                    targetKey = '/folders'
                }
            } else if (menuItem.type == 'Contact') {
                targetKey = '/contacts'
            } else if (menuItem.type == 'Label') {
                targetKey = '/labels/' + menuItem.targetID
            } else if (menuItem.type == 'TemplateList') {
                targetKey = '/templates'
            } else if (menuItem.type == 'AssetList') {
                targetKey = '/assetsList'
            } else if (menuItem.type == 'ProductList') {
                targetKey = '/products'
            } else if (menuItem.type == 'PartnerInfo') {
                targetKey = '/partner'
            } else if (menuItem.type == 'Activity') {
                targetKey = '/activities'
            } else if (menuItem.type == 'Profile') {
                targetKey = '/profile'
            } else if (menuItem.type == 'Logout') {
                targetKey = '/sessions/signOut'
            }
            return targetKey;
        },
        async getLayout() {
            this.mountImageList();
            this.mountMenus();
            var themeId = this.$route.params.themeId;
            await this.$http.get('themes/' + themeId + '/style')
                .then(response => {
                    this.stylesList = response.style;

                    this.$http.get('themes/' + this.$route.params.themeId + '/layouts/' + this.$route.params.id)
                        .then(response => {
                            this.layout = response;
                            var _layout = this.layout;
                            _layout.imagesList = this.imagesList;
                            _layout.menusList = this.menusList;
                            _layout.styles = this.stylesList;
                            _layout.language = 'en-us';
                            this.sendMessage(_layout, 'layout')
                        })
                })
        },
        saveLayout(content) {
            this.layout.markup = JSON.stringify(content);
            if (!this.savingObject && this.layout.id && this.layout.id == this.$route.params.id) {
                this.savingObject = true;
                this.layout.html = this.layout.html.replace(this.style.content.html, '')
                this.$http.put('themes/' + this.$route.params.themeId + '/layouts', this.layout)
                    .then(() => {
                        this.savingObject = false;
                    })
            }
        },
        editName(layout) {
            layout.isEditing = true;
            this.layout.oldName = layout.name;
            this.$forceUpdate();
        },
        cancelEditName(layout) {
            layout.isEditing = false;
            layout.name = layout.oldName;
            this.$forceUpdate();
        },
        saveName(layout) {
            if (this.layout.name != '') {
                this.$http.put('/themes/' + layout.themeId + '/layouts', layout)
                    .then(() => {
                        layout.isEditing = false;
                        this.$forceUpdate();
                    })
            }
        },
        defineHTML(content) {
            if (content.type == 'page') {
                if (this.page.id == content.id) {
                    this.page.content = content.html;
                }
            } else if (content.type == 'layout') {
                this.layout.html = content.html
            } else if (content.type == 'style') {
                this.style.content.html = this.getMainStyleHTML(content.html)
            } else if (content.type == 'emailTemplate') {
                if (this.emailTemplate.id == content.id) {
                    this.emailTemplate.html = content.html
                }
            }
        },
        async getStyle() {
            var themeId = this.$route.params.themeId ? this.$route.params.themeId : this.portal.themeId;
            await this.$http.get('themes/' + themeId + '/style')
                .then(response => {
                    this.style = {
                        content: response
                    };
                    var _style = this.style;
                    this.sendMessage(_style, 'style')
                })
        },
        saveStyle(content) {
            if (!this.savingObject && this.$route.params.type == 'style') {
                this.savingObject = true;
                var saveData = {
                    themeId: this.$route.params.themeId,
                    style: JSON.stringify(content.styles),
                    html: this.style.content.html
                }
                this.$http.put('themes/' + this.$route.params.themeId + '/style', saveData)
                    .then(() => {
                        this.savingObject = false;
                    })
            }
        },
        getMainStyleHTML(html) {
            let mainCSS = html.substring(
                html.indexOf("<style>") + 7, html.indexOf("</style>")
            );
            return mainCSS;
        },
        async getEmailTemplate() {
            this.mountImageList();
            var themeId = this.portal.themeId;
            await this.$http.get('themes/' + themeId + '/style')
                .then(response => {
                    this.stylesList = response.style;

                    this.$http.get('/Notifications/variables')
                        .then(response => {
                            let variables = response.data;
                            this.$http.get('/Notifications/templates/' + this.$route.params.id)
                                .then(response => {
                                    this.emailTemplate = response.data
                                    var _emailTemplate = this.emailTemplate;
                                    _emailTemplate.imagesList = this.imagesList;
                                    _emailTemplate.styles = this.stylesList;
                                    _emailTemplate.language = 'en-us';
                                    _emailTemplate.variableFields = variables;
                                    this.sendMessage(_emailTemplate, 'emailTemplate')
                                })
                        })

                })
        },
        saveEmailTemplate(markup, thumbnail) {
            this.emailTemplate.markup = JSON.stringify(markup);
            this.emailTemplate.previewFile = thumbnail.replace(/^.+?(\bbase64\b)/, '').substring(1);
            this.emailTemplate.previewFileName = 'thumbPage.png';

            //get property tag: /<property([^<]*)>/g
            //get variable inside property: \{\{([^<}]*)}}
            if (this.emailTemplate && this.emailTemplate.html) {
                var variablesToChange = this.emailTemplate.html.match(/property name([^\\<]*)>/g);
                if(variablesToChange) {
                    variablesToChange.forEach(element => {
                        if(element) {
                            var variableValue = element.match(/\{\{([^<}]*)}}/g)[0];
                            var stringToReplace = '<' + element + '</property>';
                            this.emailTemplate.html = this.emailTemplate.html.replace(stringToReplace, variableValue);
                        }
                    });
                }

                var partnerLogoToChange = this.emailTemplate.html.match(/<partner-logo([^]*)partner-logo-runtime>/g);
                if(partnerLogoToChange) {
                    partnerLogoToChange.forEach(element => {
                        if(element) {
                            var partnerLogoUrl = element.match(/\{\{([^<}]*)}}/g)[0];
                            var partnerLogoWidth = element.match(/width([^<]*),/g)[0];
                            partnerLogoWidth = partnerLogoWidth.replace('width&quot;:', '');
                            partnerLogoWidth = partnerLogoWidth.replace(',', '');
                            var partnerLogoHeight = element.match(/height([^<]*)}/g)[0];
                            partnerLogoHeight = partnerLogoHeight.replace('height&quot;:', '');
                            partnerLogoHeight = partnerLogoHeight.replace('}', '');
                            var partnerLogoValue = '<img src="' + partnerLogoUrl + '" width="' + partnerLogoWidth + '" height="' + partnerLogoHeight + '">';
                            this.emailTemplate.html = this.emailTemplate.html.replace(element, partnerLogoValue);
                        }
                    });
                }

                var brandLogoToChange = this.emailTemplate.html.match(/<brand-logo([^]*)brand-logo-runtime>/g);
                if(brandLogoToChange) {
                    brandLogoToChange.forEach(element => {
                        if(element) {
                            var brandLogoUrl = element.match(/\{\{([^<}]*)}}/g)[0];
                            var brandLogoWidth = element.match(/width([^<]*),/g)[0];
                            brandLogoWidth = brandLogoWidth.replace('width&quot;:', '');
                            brandLogoWidth = brandLogoWidth.replace(',', '');
                            var brandLogoHeight = element.match(/height([^<]*)}/g)[0];
                            brandLogoHeight = brandLogoHeight.replace('height&quot;:', '');
                            brandLogoHeight = brandLogoHeight.replace('}', '');
                            var brandLogoValue = '<img src="' + brandLogoUrl + '" width="' + brandLogoWidth + '" height="' + brandLogoHeight + '">';
                            this.emailTemplate.html = this.emailTemplate.html.replace(element, brandLogoValue);
                        }
                    });
                }

                // <partner-logo([^<]*)>
                // <brand-logo([^<]*)>
            }

            setTimeout(() => {
                if (!this.savingObject && this.emailTemplate.id && this.emailTemplate.id == this.$route.params.id) {
                    this.savingObject = true;
                    this.$http.put('Notifications/templates', this.emailTemplate)
                        .then(() => {
                            this.savingObject = false;
                        })
                }
            }, 500);
        },
    }
}
</script>

<style lang="scss">
.iframe-builder {
    width: 100%;
    height: calc(100vh - 230px);
}

.top .top-left ul {
    display: none;
}

.footer {
    display: none;
}
</style>

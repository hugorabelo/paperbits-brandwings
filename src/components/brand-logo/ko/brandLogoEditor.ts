import * as ko from "knockout";
import template from "./brandLogoEditor.html";
import { BrandLogoModel } from "../brandLogoModel";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";
import { WidgetEditor } from "@paperbits/common/widgets";
import { ChangeRateLimit } from "@paperbits/common/ko/consts";
import { BackgroundStylePluginConfig } from "@paperbits/styles/contracts";
import { SizeStylePluginConfig } from "@paperbits/styles/plugins/size/sizeStylePluginConfig";
import { StyleHelper } from "@paperbits/styles";

@Component({
    selector: "brand-logo-editor",
    template: template
})
export class BrandLogoEditor implements WidgetEditor<BrandLogoModel> {
    public readonly logoSource: ko.Observable<string>;
    public readonly width: ko.Observable<number>;
    public readonly background: ko.Observable<BackgroundStylePluginConfig>;

    constructor() {
        this.logoSource = ko.observable("0");
        this.width = ko.observable();
        this.background = ko.observable<BackgroundStylePluginConfig>();
    }

    @Param()
    public model: BrandLogoModel;

    @Event()
    public onChange: (model: BrandLogoModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        /*
           This method is called after component created. At this moment all the parameters,
           includinig "model", are available.
        */

        this.logoSource(this.model.logoSource);
        this.logoSource
            .extend(ChangeRateLimit)
            .subscribe(this.applyChanges);
        this.width(this.model.width)

        const backgroundStyleConfig = StyleHelper.getPluginConfigForLocalStyles(this.model.styles, "background");
        this.background(backgroundStyleConfig);
    }

    private applyChanges(): void {
        this.model.logoSource = this.logoSource();
        switch(this.model.logoSource.toString()) {
            case '{{BrandLogoUrlXSmall}}':
                this.model.width = 50
                break
            case '{{BrandLogoUrlSmall}}':
                this.model.width = 150
                break
            case '{{BrandLogoUrlMedium}}':
                this.model.width = 300
                break
            case '{{BrandLogoUrlLarge}}':
                this.model.width = 400
                break
            case '{{BrandLogoUrlXLarge}}':
                this.model.width = 600
                break
            case '{{BrandLogoUrlXXLarge}}':
                this.model.width = 800
                break
        }
        this.onChange(this.model);
    }

    public onBackgroundChange(pluginConfig: BackgroundStylePluginConfig): void {
        StyleHelper.setPluginConfigForLocalStyles(this.model.styles, "background", pluginConfig);
        this.onChange(this.model);
    }

}
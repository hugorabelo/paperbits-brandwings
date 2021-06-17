import * as ko from "knockout";
import template from "./iframeEditor.html";
import { IframeModel } from "../iframeModel";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";
import { WidgetEditor } from "@paperbits/common/widgets";
import { ChangeRateLimit } from "@paperbits/common/ko/consts";
import { BackgroundStylePluginConfig } from "@paperbits/styles/contracts";
import { SizeStylePluginConfig } from "@paperbits/styles/plugins/size/sizeStylePluginConfig";
import { StyleHelper } from "@paperbits/styles";

@Component({
    selector: "iframe-editor",
    template: template
})
export class IframeEditor implements WidgetEditor<IframeModel> {
    public readonly frameSrc: ko.Observable<string>;
    public readonly sizeConfig: ko.Observable<SizeStylePluginConfig>;

    constructor() {
        this.frameSrc = ko.observable("0");
        this.sizeConfig = ko.observable();
    }

    @Param()
    public model: IframeModel;

    @Event()
    public onChange: (model: IframeModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        /*
           This method is called after component created. At this moment all the parameters,
           includinig "model", are available.
        */

        this.frameSrc(this.model.frameSrc);
        this.frameSrc
            .extend(ChangeRateLimit)
            .subscribe(this.applyChanges);
        
        this.sizeConfig({ width: this.model.width, height: this.model.height });
        this.sizeConfig.extend(ChangeRateLimit).subscribe(this.applyChanges);

    }

    private applyChanges(): void {
        this.model.frameSrc = this.frameSrc();
        this.onChange(this.model);
    }

    public onSizeChange(sizeConfig: SizeStylePluginConfig): void {
        this.model.width = <number>sizeConfig.width;
        this.model.height = <number>sizeConfig.height;
        this.applyChanges();
    }

}
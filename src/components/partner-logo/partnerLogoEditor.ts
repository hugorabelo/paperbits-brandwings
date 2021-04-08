import * as ko from "knockout";
import template from "./partnerLogoEditor.html";
import { PartnerLogoModel } from "./partnerLogoModel";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";
import { WidgetEditor } from "@paperbits/common/widgets";

@Component({
    selector: "partner-logo-editor",
    template: template
})
export class PartnerLogoEditor implements WidgetEditor<PartnerLogoModel> {
    public readonly logoSize: ko.Observable<string>;

    constructor() {
        this.logoSize = ko.observable("0");
    }

    @Param()
    public model: PartnerLogoModel;

    @Event()
    public onChange: (model: PartnerLogoModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        /*
           This method is called after component created. At this moment all the parameters,
           includinig "model", are available.
        */

        this.logoSize(this.model.logoSize);
        this.logoSize.subscribe(this.applyChanges);
    }

    private applyChanges(): void {
        this.model.logoSize = this.logoSize();
        this.onChange(this.model);
    }
}

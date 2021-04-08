import template from "./partner-logo-runtime.html";
import { Component, RuntimeComponent, Prop, OnMounted, OnDestroyed, OnUpdated } from "@paperbits/common/vue/decorators";


@RuntimeComponent({
    selector: "partner-logo-runtime"
})
@Component({
    selector: "partner-logo-runtime",
    template: template
})
export class PartnerLogoRuntime {
    public selectedLogo: string;
    public width: number;
    public height: number;

    constructor() {
        this.selectedLogo = '{{PartnerLogoUrlXLarge}}';
        this.width = 1000;
        this.height = 80;
    }

    @Prop()
    public readonly logoSize: string;

    @OnMounted()
    public async initialize(): Promise<void> {
        this.selectedLogo = this.logoSize ? '{{' + this.logoSize + '}}' : '{{PartnerLogoUrlXLarge}}';
        this.width = 1000;
        this.height = 80;
    }

    @OnDestroyed()
    public async dispose(): Promise<void> {
        // Your cleanup widget logic
    }

}
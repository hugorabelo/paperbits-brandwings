import * as ko from "knockout";
import template from "./partner-logo-runtime.html";
import { Component, RuntimeComponent, Param, OnMounted, OnDestroyed } from "@paperbits/common/ko/decorators";


@RuntimeComponent({
    selector: "partner-logo-runtime"
})
@Component({
    selector: "partner-logo-runtime",
    template: template
})
export class PartnerLogoRuntime {

    constructor() {
        this.logoSource = ko.observable<string>();
        this.width = ko.observable<number>();
        this.height = ko.observable<number>();
    }

    @Param()
    public readonly logoSource: ko.Observable<string>;

    @Param()
    public readonly width: ko.Observable<number>;
    
    @Param()
    public readonly height: ko.Observable<number>;

    @OnMounted()
    public async initialize(): Promise<void> {
        // Your initialization logic
    }

    @OnDestroyed()
    public async dispose(): Promise<void> {
        // Your cleanup widget logic
    }
}
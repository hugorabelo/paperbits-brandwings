import * as ko from "knockout";
import template from "./brand-logo-runtime.html";
import { Component, RuntimeComponent, Param, OnMounted, OnDestroyed } from "@paperbits/common/ko/decorators";


@RuntimeComponent({
    selector: "brand-logo-runtime"
})
@Component({
    selector: "brand-logo-runtime",
    template: template
})
export class BrandLogoRuntime {

    constructor() {
        this.logoSource = ko.observable<string>();
        this.width = ko.observable<number>();
    }

    @Param()
    public readonly logoSource: ko.Observable<string>;

    @Param()
    public width: ko.Observable<number>;

    @OnMounted()
    public async initialize(): Promise<void> {
        // Your initialization logic
    }

    @OnDestroyed()
    public async dispose(): Promise<void> {
        // Your cleanup widget logic
    }
}
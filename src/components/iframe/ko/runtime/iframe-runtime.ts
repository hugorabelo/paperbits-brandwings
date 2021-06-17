import * as ko from "knockout";
import template from "./iframe-runtime.html";
import { Component, RuntimeComponent, Param, OnMounted, OnDestroyed } from "@paperbits/common/ko/decorators";


@RuntimeComponent({
    selector: "iframe-runtime"
})
@Component({
    selector: "iframe-runtime",
    template: template
})
export class IframeRuntime {

    constructor() {
        this.frameSrc = ko.observable<string>();
    }

    @Param()
    public readonly frameSrc: ko.Observable<string>;

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
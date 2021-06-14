import * as ko from "knockout";
import template from "./html-snippet-runtime.html";
import { Component, RuntimeComponent, Param, OnMounted, OnDestroyed } from "@paperbits/common/ko/decorators";


@RuntimeComponent({
    selector: "html-snippet-runtime"
})
@Component({
    selector: "html-snippet-runtime",
    template: template
})
export class HtmlSnippetRuntime {

    constructor() {
        this.sourceCode = ko.observable<string>();
    }

    @Param()
    public readonly sourceCode: ko.Observable<string>;

    @OnMounted()
    public async initialize(): Promise<void> {
        // Your initialization logic
    }

    @OnDestroyed()
    public async dispose(): Promise<void> {
        // Your cleanup widget logic
    }
}
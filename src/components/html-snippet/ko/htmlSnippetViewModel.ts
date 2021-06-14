import * as ko from "knockout";
import template from "./htmlSnippet.html";
import { Component } from "@paperbits/common/ko/decorators";

@Component({
    selector: "html-snippet",
    template: template
})
export class HtmlSnippet {
    public readonly runtimeConfig: ko.Observable<string>;
    // public width: ko.Observable<number>;
    // public height: ko.Observable<number>;

    constructor() {
        this.runtimeConfig = ko.observable();
        // this.width = ko.observable<number>();
        // this.height = ko.observable<number>();
    }
}
import * as ko from "knockout";
import template from "./iframe.html";
import { Component } from "@paperbits/common/ko/decorators";

@Component({
    selector: "Iframe",
    template: template
})
export class Iframe {
    public readonly runtimeConfig: ko.Observable<string>;
    // public width: ko.Observable<number>;
    // public height: ko.Observable<number>;

    constructor() {
        this.runtimeConfig = ko.observable();
        // this.width = ko.observable<number>();
        // this.height = ko.observable<number>();
    }
}
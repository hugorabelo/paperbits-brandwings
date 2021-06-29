import * as ko from "knockout";
import template from "./activityPreview.html";
import { Component } from "@paperbits/common/ko/decorators";

@Component({
    selector: "activity-preview",
    template: template
})
export class ActivityPreview {
    public readonly runtimeConfig: ko.Observable<string>;
    // public width: ko.Observable<number>;
    // public height: ko.Observable<number>;

    constructor() {
        this.runtimeConfig = ko.observable();
        // this.width = ko.observable<number>();
        // this.height = ko.observable<number>();
    }
}
import * as ko from "knockout";
import template from "./partnerLogo.html";
import { Component } from "@paperbits/common/ko/decorators";

@Component({
    selector: "partner-logo",
    template: template
})
export class PartnerLogo {
    public readonly runtimeConfig: ko.Observable<string>;
    // public width: ko.Observable<number>;
    // public height: ko.Observable<number>;

    constructor() {
        this.runtimeConfig = ko.observable();
        // this.width = ko.observable<number>();
        // this.height = ko.observable<number>();
    }
}
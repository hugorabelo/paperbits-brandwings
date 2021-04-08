import * as ko from "knockout";
import template from "./partnerLogo.html";
import { Component } from "@paperbits/common/ko/decorators";

@Component({
    selector: "partner-logo",
    template: template
})
export class PartnerLogoViewModel {
    public readonly runtimeConfig: ko.Observable<string>;

    constructor() {
        this.runtimeConfig = ko.observable();
    }
}

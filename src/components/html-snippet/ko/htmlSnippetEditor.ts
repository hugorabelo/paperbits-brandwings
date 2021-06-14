import * as ko from "knockout";
import template from "./htmlSnippetEditor.html";
import { HtmlSnippetModel } from "../htmlSnippetModel";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";
import { WidgetEditor } from "@paperbits/common/widgets";
import { ChangeRateLimit } from "@paperbits/common/ko/consts";
import { BackgroundStylePluginConfig } from "@paperbits/styles/contracts";
import { SizeStylePluginConfig } from "@paperbits/styles/plugins/size/sizeStylePluginConfig";
import { StyleHelper } from "@paperbits/styles";

@Component({
    selector: "html-snippet-editor",
    template: template
})
export class HtmlSnippetEditor implements WidgetEditor<HtmlSnippetModel> {
    public readonly sourceCode: ko.Observable<string>;

    constructor() {
        this.sourceCode = ko.observable("0");
    }

    @Param()
    public model: HtmlSnippetModel;

    @Event()
    public onChange: (model: HtmlSnippetModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        /*
           This method is called after component created. At this moment all the parameters,
           includinig "model", are available.
        */

        this.sourceCode(this.model.sourceCode);
        this.sourceCode
            .extend(ChangeRateLimit)
            .subscribe(this.applyChanges);

    }

    private applyChanges(): void {
        this.model.sourceCode = this.sourceCode();
        this.onChange(this.model);
    }

}
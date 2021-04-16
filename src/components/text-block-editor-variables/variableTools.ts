import * as ko from "knockout";
import template from "./variableTools.html";
import { IHtmlEditorProvider } from "@paperbits/common/editing";
import { EventManager } from "@paperbits/common/events";
import { Component, OnDestroyed } from "@paperbits/common/ko/decorators";

@Component({
    selector: "text-block-editor-variables",
    template: template
})
export class TextBlockEditorVariablesTools {

    constructor(
        private readonly htmlEditorProvider: IHtmlEditorProvider,
        private readonly eventManager: EventManager
    ) {
        this.htmlEditorProvider = htmlEditorProvider;
        this.eventManager = eventManager;
    }

    @OnDestroyed()
    public dispose(): void {
    }
}

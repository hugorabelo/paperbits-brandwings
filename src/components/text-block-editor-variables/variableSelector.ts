import * as ko from "knockout";
import template from "./variableSelector.html";
import { IHtmlEditorProvider } from "@paperbits/common/editing";
import { Component, OnMounted } from "@paperbits/common/ko/decorators";
import { VariableService } from "./variableService"

@Component({
    selector: "variable-selector",
    template: template
})
export class VariableSelector {
    public readonly variables: ko.ObservableArray<string>;

    constructor(
        private readonly htmlEditorProvider: IHtmlEditorProvider,
        private readonly variableService: VariableService
    ) { 
        this.variables = ko.observableArray();
    }

    @OnMounted()
    public async initialize(): Promise<void> {
        this.variableService.getVariables()
            .then(response => {
                const variables = response
                this.variables(variables);
            })
    }

    public insertVariable(variable: string): void {
        const htmlEditor = this.htmlEditorProvider.getCurrentHtmlEditor();

        if (!htmlEditor) {
            return;
        }

        htmlEditor.insertProperty(variable, variable);
    }
 
}
import { Bag } from "@paperbits/common";
import { IWidgetBinding } from "@paperbits/common/editing";
import { EventManager } from "@paperbits/common/events";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { HtmlSnippetModel } from "../htmlSnippetModel";
import { HtmlSnippet } from "./htmlSnippetViewModel";

export class HtmlSnippetViewModelBinder implements ViewModelBinder<HtmlSnippetModel, HtmlSnippet>  {
    constructor(private readonly eventManager: EventManager) { }

    public async modelToViewModel(model: HtmlSnippetModel, viewModel?: HtmlSnippet, bindingContext?: Bag<any>): Promise<HtmlSnippet> {
        if (!viewModel) {
            viewModel = new HtmlSnippet();
        }

        viewModel.runtimeConfig(JSON.stringify({ sourceCode: model.sourceCode }));

        const binding: IWidgetBinding<HtmlSnippetModel, HtmlSnippet> = {
            name: "html-snippet",
            displayName: "HTML Snippet",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            flow: "block",
            draggable: true,
            editor: "html-snippet-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: HtmlSnippetModel): boolean {
        return model instanceof HtmlSnippetModel;
    }
}
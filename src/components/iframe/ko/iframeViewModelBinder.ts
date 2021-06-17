import { Bag } from "@paperbits/common";
import { IWidgetBinding } from "@paperbits/common/editing";
import { EventManager } from "@paperbits/common/events";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { IframeModel } from "../iframeModel";
import { Iframe } from "./iframeViewModel";

export class IframeViewModelBinder implements ViewModelBinder<IframeModel, Iframe>  {
    constructor(private readonly eventManager: EventManager) { }

    public async modelToViewModel(model: IframeModel, viewModel?: Iframe, bindingContext?: Bag<any>): Promise<Iframe> {
        if (!viewModel) {
            viewModel = new Iframe();
        }

        viewModel.runtimeConfig(JSON.stringify({ frameSrc: model.frameSrc, width: model.width, height: model.height }));

        const binding: IWidgetBinding<IframeModel, Iframe> = {
            name: "Iframe",
            displayName: "IFrame",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            flow: "block",
            draggable: true,
            editor: "iframe-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: IframeModel): boolean {
        return model instanceof IframeModel;
    }
}
import { Bag } from "@paperbits/common";
import { IWidgetBinding } from "@paperbits/common/editing";
import { EventManager } from "@paperbits/common/events";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { BrandLogoModel } from "../brandLogoModel";
import { BrandLogo } from "./brandLogoViewModel";

export class BrandLogoViewModelBinder implements ViewModelBinder<BrandLogoModel, BrandLogo>  {
    constructor(private readonly eventManager: EventManager) { }

    public async modelToViewModel(model: BrandLogoModel, viewModel?: BrandLogo, bindingContext?: Bag<any>): Promise<BrandLogo> {
        if (!viewModel) {
            viewModel = new BrandLogo();
        }

        viewModel.runtimeConfig(JSON.stringify({ logoSource: model.logoSource }));

        const binding: IWidgetBinding<BrandLogoModel, BrandLogo> = {
            name: "brand-logo",
            displayName: "Brand Logo",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            flow: "block",
            draggable: true,
            editor: "brand-logo-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: BrandLogoModel): boolean {
        return model instanceof BrandLogoModel;
    }
}
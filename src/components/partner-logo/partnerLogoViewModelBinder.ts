import { PartnerLogoViewModel } from "./partnerLogoViewModel";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { PartnerLogoModel } from "./partnerLogoModel";
import { EventManager } from "@paperbits/common/events";
import { IWidgetBinding } from "@paperbits/common/editing";
import { Bag } from "@paperbits/common";

export class PartnerLogoViewModelBinder implements ViewModelBinder<PartnerLogoModel, PartnerLogoViewModel>  {
    constructor(private readonly eventManager: EventManager) { }

    public async modelToViewModel(model: PartnerLogoModel, viewModel: PartnerLogoViewModel, bindingContext: Bag<any>): Promise<PartnerLogoViewModel> {
        if (!viewModel) {
            viewModel = new PartnerLogoViewModel();
        }

        viewModel.runtimeConfig(JSON.stringify({ logoSize: model.logoSize }));

        const binding: IWidgetBinding<PartnerLogoModel, PartnerLogoViewModel> = {
            name: "partner-logo",
            displayName: "Partner Logo",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            draggable: true,
            editor: "partner-logo-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: PartnerLogoModel): boolean {
        return model instanceof PartnerLogoModel;
    }
}
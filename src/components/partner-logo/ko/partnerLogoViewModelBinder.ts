import { Bag } from "@paperbits/common";
import { IWidgetBinding } from "@paperbits/common/editing";
import { EventManager } from "@paperbits/common/events";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { PartnerLogoModel } from "../partnerLogoModel";
import { PartnerLogo } from "./partnerLogoViewModel";

export class PartnerLogoViewModelBinder implements ViewModelBinder<PartnerLogoModel, PartnerLogo>  {
    constructor(private readonly eventManager: EventManager) { }

    public async modelToViewModel(model: PartnerLogoModel, viewModel?: PartnerLogo, bindingContext?: Bag<any>): Promise<PartnerLogo> {
        if (!viewModel) {
            viewModel = new PartnerLogo();
        }

        viewModel.runtimeConfig(JSON.stringify({ logoSource: model.logoSource, width: model.width, height: model.height }));

        const binding: IWidgetBinding<PartnerLogoModel, PartnerLogo> = {
            name: "partner-logo",
            displayName: "Partner Logo",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            flow: "block",
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
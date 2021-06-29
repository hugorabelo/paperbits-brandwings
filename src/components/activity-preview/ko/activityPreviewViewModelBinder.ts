import { Bag } from "@paperbits/common";
import { IWidgetBinding } from "@paperbits/common/editing";
import { EventManager } from "@paperbits/common/events";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { ActivityPreviewModel } from "../activityPreviewModel";
import { ActivityPreview } from "./activityPreviewViewModel";

export class ActivityPreviewViewModelBinder implements ViewModelBinder<ActivityPreviewModel, ActivityPreview>  {
    constructor(private readonly eventManager: EventManager) { }

    public async modelToViewModel(model: ActivityPreviewModel, viewModel?: ActivityPreview, bindingContext?: Bag<any>): Promise<ActivityPreview> {
        if (!viewModel) {
            viewModel = new ActivityPreview();
        }

        viewModel.runtimeConfig(JSON.stringify({ logoSource: model.logoSource, width: model.width }));

        const binding: IWidgetBinding<ActivityPreviewModel, ActivityPreview> = {
            name: "activity-preview",
            displayName: "Activity Preview",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            flow: "block",
            draggable: true,
            editor: "activity-preview-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: ActivityPreviewModel): boolean {
        return model instanceof ActivityPreviewModel;
    }
}
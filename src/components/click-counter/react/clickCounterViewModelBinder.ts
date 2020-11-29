import { ClickCounter } from "./clickCounter";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { EventManager } from "@paperbits/common/events";
import { Bag } from "@paperbits/common";
import { WidgetBinding } from "@paperbits/common/editing";
import { ClickCounterModel } from "../clickCounterModel";


export class ClickCounterViewModelBinder implements ViewModelBinder<ClickCounterModel, ClickCounter>  {
    constructor(private readonly eventManager: EventManager) { }

    public async createWidgetBinding(model: ClickCounterModel, bindingContext?: Bag<any>): Promise<WidgetBinding> {
        const binding = new WidgetBinding();
        binding.framework = "react";
        binding.model = model;
        binding.name = "click-counter";
        binding.editor = "click-counter-editor";
        binding.readonly = false;
        binding.draggable = true;
        binding.displayName = "Click counter";
        binding.viewModelClass = ClickCounter;
        binding.applyChanges = async (model) => {
            await this.modelToViewModel(model, binding.viewModelInstance);
            this.eventManager.dispatchEvent("onContentUpdate");
        };

        return binding;
    }

    public async modelToViewModel(model: ClickCounterModel, viewModel?: ClickCounter): Promise<any> {
        viewModel.setState(state => ({
            initialCount: model.initialCount
        }));

        return viewModel;
    }

    public canHandleModel(model: ClickCounterModel): boolean {
        return model instanceof ClickCounterModel;
    }
}
import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { ActivityPreviewEditor } from "./ko/activityPreviewEditor";
import { ActivityPreviewHandlers } from "./activityPreviewHandlers";
import { ActivityPreviewModelBinder } from "./activityPreviewModelBinder";


/* Knockout example component */
import { ActivityPreview, ActivityPreviewViewModelBinder } from "./ko";

export class ActivityPreviewEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("activityPreviewEditor", ActivityPreviewEditor);
        injector.bindToCollection("widgetHandlers", ActivityPreviewHandlers);
        injector.bind("activityPreview", ActivityPreview);
        injector.bindToCollection("modelBinders", ActivityPreviewModelBinder);
        injector.bindToCollection("viewModelBinders", ActivityPreviewViewModelBinder);
    }
}
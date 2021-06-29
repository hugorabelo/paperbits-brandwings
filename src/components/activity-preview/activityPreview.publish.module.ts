import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { ActivityPreviewModelBinder } from "./activityPreviewModelBinder";


/* Knockout example component */
import { ActivityPreview, ActivityPreviewViewModelBinder } from "./ko";

/* Uncomment to switch to Vue example component */
// import { ActivityPreview, ActivityPreviewViewModelBinder } from "./vue";

/* Uncomment to switch to React example component */
// import { ActivityPreview, ActivityPreviewViewModelBinder } from "./react";

/* Uncomment to switch to Angular example component */
// import { ActivityPreview, ActivityPreviewViewModelBinder } from "./angular";

export class ActivityPreviewModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("activityPreview", ActivityPreview);
        injector.bindToCollection("modelBinders", ActivityPreviewModelBinder);
        injector.bindToCollection("viewModelBinders", ActivityPreviewViewModelBinder);
    }
}
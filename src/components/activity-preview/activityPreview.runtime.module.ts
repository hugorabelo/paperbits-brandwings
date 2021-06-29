import { IInjector, IInjectorModule } from "@paperbits/common/injection";

/* Knockout example component */
import { ActivityPreviewRuntime } from "./ko/runtime";

/* Uncomment to switch to Vue example component */
// import { ActivityPreviewRuntime } from "./vue/runtime";

/* Uncomment to switch to React example component */
// import { ActivityPreviewRuntime } from "./react/runtime";

/* Uncomment to switch to Angular example component */
// import { ActivityPreviewRuntime } from "./angular/runtime";

export class ActivityPreviewRuntimeModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("activityPreviewRuntime", ActivityPreviewRuntime);
    }
}
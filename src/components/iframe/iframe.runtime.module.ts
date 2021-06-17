import { IInjector, IInjectorModule } from "@paperbits/common/injection";

/* Knockout example component */
import { IframeRuntime } from "./ko/runtime";

/* Uncomment to switch to Vue example component */
// import { IframeRuntime } from "./vue/runtime";

/* Uncomment to switch to React example component */
// import { IframeRuntime } from "./react/runtime";

/* Uncomment to switch to Angular example component */
// import { IframeRuntime } from "./angular/runtime";

export class IframeRuntimeModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("iframeRuntime", IframeRuntime);
    }
}
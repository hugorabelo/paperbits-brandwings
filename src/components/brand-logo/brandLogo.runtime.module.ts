import { IInjector, IInjectorModule } from "@paperbits/common/injection";

/* Knockout example component */
import { BrandLogoRuntime } from "./ko/runtime";

/* Uncomment to switch to Vue example component */
// import { BrandLogoRuntime } from "./vue/runtime";

/* Uncomment to switch to React example component */
// import { BrandLogoRuntime } from "./react/runtime";

/* Uncomment to switch to Angular example component */
// import { BrandLogoRuntime } from "./angular/runtime";

export class BrandLogoRuntimeModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("brandLogoRuntime", BrandLogoRuntime);
    }
}
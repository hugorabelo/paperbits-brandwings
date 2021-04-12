import { IInjector, IInjectorModule } from "@paperbits/common/injection";

/* Knockout example component */
import { PartnerLogoRuntime } from "./ko/runtime";

/* Uncomment to switch to Vue example component */
// import { PartnerLogoRuntime } from "./vue/runtime";

/* Uncomment to switch to React example component */
// import { PartnerLogoRuntime } from "./react/runtime";

/* Uncomment to switch to Angular example component */
// import { PartnerLogoRuntime } from "./angular/runtime";

export class PartnerLogoRuntimeModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("partnerLogoRuntime", PartnerLogoRuntime);
    }
}
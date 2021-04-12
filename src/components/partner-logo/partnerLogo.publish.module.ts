import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { PartnerLogoModelBinder } from "./partnerLogoModelBinder";


/* Knockout example component */
import { PartnerLogo, PartnerLogoViewModelBinder } from "./ko";

/* Uncomment to switch to Vue example component */
// import { PartnerLogo, PartnerLogoViewModelBinder } from "./vue";

/* Uncomment to switch to React example component */
// import { PartnerLogo, PartnerLogoViewModelBinder } from "./react";

/* Uncomment to switch to Angular example component */
// import { PartnerLogo, PartnerLogoViewModelBinder } from "./angular";

export class PartnerLogoModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("partnerLogo", PartnerLogo);
        injector.bindToCollection("modelBinders", PartnerLogoModelBinder);
        injector.bindToCollection("viewModelBinders", PartnerLogoViewModelBinder);
    }
}
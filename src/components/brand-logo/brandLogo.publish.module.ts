import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { BrandLogoModelBinder } from "./brandLogoModelBinder";


/* Knockout example component */
import { BrandLogo, BrandLogoViewModelBinder } from "./ko";

/* Uncomment to switch to Vue example component */
// import { BrandLogo, BrandLogoViewModelBinder } from "./vue";

/* Uncomment to switch to React example component */
// import { BrandLogo, BrandLogoViewModelBinder } from "./react";

/* Uncomment to switch to Angular example component */
// import { BrandLogo, BrandLogoViewModelBinder } from "./angular";

export class BrandLogoModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("brandLogo", BrandLogo);
        injector.bindToCollection("modelBinders", BrandLogoModelBinder);
        injector.bindToCollection("viewModelBinders", BrandLogoViewModelBinder);
    }
}
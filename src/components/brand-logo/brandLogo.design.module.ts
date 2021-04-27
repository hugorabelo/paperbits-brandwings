import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { BrandLogoEditor } from "./ko/brandLogoEditor";
import { BrandLogoHandlers } from "./brandLogoHandlers";
import { BrandLogoModelBinder } from "./brandLogoModelBinder";


/* Knockout example component */
import { BrandLogo, BrandLogoViewModelBinder } from "./ko";

/* Uncomment to switch to Vue example component */
// import { BrandLogo, BrandLogoViewModelBinder } from "./vue";

/* Uncomment to switch to React example component */
// import { BrandLogo, BrandLogoViewModelBinder } from "./react";

/* Uncomment to switch to Angular example component */
// import { BrandLogo, BrandLogoViewModelBinder } from "./angular";


export class BrandLogoEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("brandLogoEditor", BrandLogoEditor);
        injector.bindToCollection("widgetHandlers", BrandLogoHandlers);
        injector.bind("brandLogo", BrandLogo);
        injector.bindToCollection("modelBinders", BrandLogoModelBinder);
        injector.bindToCollection("viewModelBinders", BrandLogoViewModelBinder);
    }
}
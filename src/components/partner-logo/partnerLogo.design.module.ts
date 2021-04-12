import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { PartnerLogoEditor } from "./ko/partnerLogoEditor";
import { PartnerLogoHandlers } from "./partnerLogoHandlers";
import { PartnerLogoModelBinder } from "./partnerLogoModelBinder";


/* Knockout example component */
import { PartnerLogo, PartnerLogoViewModelBinder } from "./ko";

/* Uncomment to switch to Vue example component */
// import { PartnerLogo, PartnerLogoViewModelBinder } from "./vue";

/* Uncomment to switch to React example component */
// import { PartnerLogo, PartnerLogoViewModelBinder } from "./react";

/* Uncomment to switch to Angular example component */
// import { PartnerLogo, PartnerLogoViewModelBinder } from "./angular";


export class PartnerLogoEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("partnerLogoEditor", PartnerLogoEditor);
        injector.bindToCollection("widgetHandlers", PartnerLogoHandlers);
        injector.bind("partnerLogo", PartnerLogo);
        injector.bindToCollection("modelBinders", PartnerLogoModelBinder);
        injector.bindToCollection("viewModelBinders", PartnerLogoViewModelBinder);
    }
}
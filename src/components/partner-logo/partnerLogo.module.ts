import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { PartnerLogoViewModel } from "./partnerLogoViewModel";
import { PartnerLogoModelBinder } from "./partnerLogoModelBinder";
import { PartnerLogoViewModelBinder } from "./partnerLogoViewModelBinder";


export class PartnerLogoModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("partnerLogo", PartnerLogoViewModel);
        injector.bindToCollection("modelBinders", PartnerLogoModelBinder);
        injector.bindToCollection("viewModelBinders", PartnerLogoViewModelBinder);
    }
}
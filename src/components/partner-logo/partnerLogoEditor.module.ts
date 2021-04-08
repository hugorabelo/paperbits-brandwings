import { PartnerLogoModule } from "./partnerLogo.module";
import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { PartnerLogoEditor } from "./partnerLogoEditor";
import { PartnerLogoHandlers } from "./partnerLogoHandlers";

export class PartnerLogoEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new PartnerLogoModule());
        injector.bind("partnerLogoEditor", PartnerLogoEditor);
        injector.bindToCollection("widgetHandlers", PartnerLogoHandlers);
    }
}
import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { PartnerLogoRuntime } from "./partner-logo-runtime";

export class PartnerLogoRuntimeModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("partnerLogoRuntime", PartnerLogoRuntime);
    }
}
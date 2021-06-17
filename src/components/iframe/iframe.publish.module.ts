import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IframeModelBinder } from "./iframeModelBinder";


/* Knockout example component */
import { Iframe, IframeViewModelBinder } from "./ko";

/* Uncomment to switch to Vue example component */
// import { Iframe, IframeViewModelBinder } from "./vue";

/* Uncomment to switch to React example component */
// import { Iframe, IframeViewModelBinder } from "./react";

/* Uncomment to switch to Angular example component */
// import { Iframe, IframeViewModelBinder } from "./angular";

export class IframeModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("iframe", Iframe);
        injector.bindToCollection("modelBinders", IframeModelBinder);
        injector.bindToCollection("viewModelBinders", IframeViewModelBinder);
    }
}
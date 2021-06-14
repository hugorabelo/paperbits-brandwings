import { IInjector, IInjectorModule } from "@paperbits/common/injection";

/* Knockout example component */
import { HtmlSnippetRuntime } from "./ko/runtime";

/* Uncomment to switch to Vue example component */
// import { HtmlSnippetRuntime } from "./vue/runtime";

/* Uncomment to switch to React example component */
// import { HtmlSnippetRuntime } from "./react/runtime";

/* Uncomment to switch to Angular example component */
// import { HtmlSnippetRuntime } from "./angular/runtime";

export class HtmlSnippetRuntimeModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("htmlSnippetRuntime", HtmlSnippetRuntime);
    }
}
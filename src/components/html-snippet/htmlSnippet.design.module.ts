import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { HtmlSnippetEditor } from "./ko/htmlSnippetEditor";
import { HtmlSnippetHandlers } from "./htmlSnippetHandlers";
import { HtmlSnippetModelBinder } from "./htmlSnippetModelBinder";


/* Knockout example component */
import { HtmlSnippet, HtmlSnippetViewModelBinder } from "./ko";

/* Uncomment to switch to Vue example component */
// import { HtmlSnippet, HtmlSnippetViewModelBinder } from "./vue";

/* Uncomment to switch to React example component */
// import { HtmlSnippet, HtmlSnippetViewModelBinder } from "./react";

/* Uncomment to switch to Angular example component */
// import { HtmlSnippet, HtmlSnippetViewModelBinder } from "./angular";


export class HtmlSnippetEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("htmlSnippetEditor", HtmlSnippetEditor);
        injector.bindToCollection("widgetHandlers", HtmlSnippetHandlers);
        injector.bind("htmlSnippet", HtmlSnippet);
        injector.bindToCollection("modelBinders", HtmlSnippetModelBinder);
        injector.bindToCollection("viewModelBinders", HtmlSnippetViewModelBinder);
    }
}
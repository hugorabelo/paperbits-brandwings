/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */


import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { App } from "../components/app/app";
import { ConsoleLogger } from "@paperbits/common/logging";
import { SearchDesignModule } from "@paperbits/core/search/search.design.module";
import { MemoryObjectStorage } from "../persistence/memoryObjectStorage";
import { MemoryBlobStorage } from "../persistence/memoryBlobStorage";
import { StaticRoleService } from "../user/staticRoleService";
import { ClickCounterEditorModule } from "../components/click-counter/ko/clickCounterEditor.module";
import { PartnerLogoEditorModule } from "../components/partner-logo/partnerLogo.design.module";
import { HistoryRouteHandler } from "@paperbits/common/routing";
import { HttpDataProvider } from "../persistence/httpDataProvider";
import { DefaultEventManager } from "@paperbits/common/events";
import { TextBlockEditorVariablesTools } from "../components/text-block-editor-variables/variableTools"
import { VariableSelector } from "../components/text-block-editor-variables/variableSelector"
import { VariableService } from "../components/text-block-editor-variables/variableService";

export class DemoDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindSingleton("app", App);
        injector.bindSingleton("dataProvider", HttpDataProvider);
        injector.bindSingleton("blobStorage", MemoryBlobStorage);
        injector.bindSingleton("objectStorage", MemoryObjectStorage);
        injector.bindSingleton("roleService", StaticRoleService);
        injector.bindSingleton("variableService", VariableService);
        injector.bindToCollection("autostart", HistoryRouteHandler);
        injector.bindSingleton("logger", ConsoleLogger);
        injector.bindSingleton("eventManager", DefaultEventManager);
        injector.bindModule(new SearchDesignModule());
        injector.bindModule(new ClickCounterEditorModule());
        injector.bindModule(new PartnerLogoEditorModule());
        injector.bindInstance("textblockEditorPlugins", [
            "text-block-editor-formatting",
            "text-block-editor-hyperlinks",
            "text-block-editor-variables"
        ]);
        injector.bind("textblockEditorVariableTools", TextBlockEditorVariablesTools);
        injector.bind("variableSelector", VariableSelector);
    }
}
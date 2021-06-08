/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import "@paperbits/core/ko/bindingHandlers/bindingHandlers.component";
import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { DefaultEventManager } from "@paperbits/common/events";
import { DefaultRouter } from "@paperbits/common/routing";
import { VisibilityGuard } from "@paperbits/common/user";
import { XmlHttpRequestClient } from "@paperbits/common/http";
import { StaticUserService } from "../user/staticUserService";
import { StaticRoleService } from "../user/staticRoleService";


/* Knockout example component */

import { PartnerLogoRuntimeModule } from "../components/partner-logo/partnerLogo.runtime.module";
import { BrandLogoRuntimeModule } from "../components/brand-logo/brandLogo.runtime.module";
import { ClickCounterRuntimeModule } from "../components/click-counter/clickCounter.runtime.module";
export class DemoRuntimeModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new ClickCounterRuntimeModule());
        injector.bindModule(new PartnerLogoRuntimeModule());
        injector.bindModule(new BrandLogoRuntimeModule());
        // injector.bindSingleton("eventManager", DefaultEventManager);
        // injector.bindCollection("autostart");
        // injector.bindCollection("routeGuards");
        // injector.bindSingleton("router", DefaultRouter);
        injector.bind("httpClient", XmlHttpRequestClient);
        // injector.bindToCollection("autostart", VisibilityGuard);
        injector.bindSingleton("userService", StaticUserService);
        injector.bindSingleton("roleService", StaticRoleService);
    }
}
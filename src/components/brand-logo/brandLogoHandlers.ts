/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { BrandLogoModel } from "./brandLogoModel";


export class BrandLogoHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "brandLogo",
            displayName: "Brand Logo",
            iconClass: "widget-icon widget-icon-picture",
            requires: [],
            createModel: async () => {
                return new BrandLogoModel();
            }
        };

        return widgetOrder;
    }
}
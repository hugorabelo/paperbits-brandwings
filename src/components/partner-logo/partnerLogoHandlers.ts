/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { PartnerLogoModel } from "./partnerLogoModel";


export class PartnerLogoHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "partnerLogo",
            displayName: "Partner Logo",
            iconClass: "widget-icon widget-icon-picture-gallery",
            requires: [],
            createModel: async () => {
                return new PartnerLogoModel();
            }
        };

        return widgetOrder;
    }
}
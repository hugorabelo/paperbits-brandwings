/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { IframeModel } from "./iframeModel";


export class IframeHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "iframe",
            displayName: "IFrame",
            iconClass: "widget-icon widget-icon-card",
            requires: [],
            createModel: async () => {
                return new IframeModel();
            }
        };

        return widgetOrder;
    }
}
/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { ActivityPreviewModel } from "./activityPreviewModel";


export class ActivityPreviewHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "activityPreview",
            displayName: "Activity Preview",
            iconClass: "widget-icon widget-icon-carousel",
            requires: [],
            createModel: async () => {
                return new ActivityPreviewModel();
            }
        };

        return widgetOrder;
    }
}
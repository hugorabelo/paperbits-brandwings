/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { HtmlSnippetModel } from "./htmlSnippetModel";


export class HtmlSnippetHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "htmlSnippet",
            displayName: "HTML Snippet",
            iconClass: "widget-icon widget-icon-text-input",
            requires: [],
            createModel: async () => {
                return new HtmlSnippetModel();
            }
        };

        return widgetOrder;
    }
}
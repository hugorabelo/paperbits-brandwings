/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { LocalStyles } from "@paperbits/common/styles";

export class BrandLogoModel {
    /**
     * Brand Logo Source.
     */
    public logoSource: string;

    /**
     * Widget local styles.
     */
    public styles: LocalStyles;

    constructor() {
        this.logoSource = "{{BrandLogoUrlXLarge}}";
        this.styles = {
            appearance: "components/card/default"
        };
    }
}
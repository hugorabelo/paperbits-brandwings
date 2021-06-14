/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { LocalStyles } from "@paperbits/common/styles";

export class PartnerLogoModel {
    /**
     * Partner Logo Source.
     */
    public logoSource: string;

    /**
     * Widget local styles.
     */
    public styles: LocalStyles;

    constructor() {
        this.logoSource = "{{PartnerLogoUrlXLarge}}";
        this.styles = {
            appearance: "components/card/default"
        };
    }
}
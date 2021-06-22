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
     * Partner Logo Editor Width.
     */
    public width: number;

    /**
     * Widget local styles.
     */
    public styles: LocalStyles;

    constructor() {
        this.logoSource = "{{PartnerLogoUrlXLarge}}";
        this.width = 400;
        this.styles = {
            appearance: "components/card/default"
        };
    }
}
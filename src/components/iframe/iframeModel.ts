/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { LocalStyles } from "@paperbits/common/styles";

export class IframeModel {
    /**
     * IFrame Source.
     */
    public frameSrc: string;

    /**
     * IFrame width.
     */
     public width: number;

     /**
      * IFrame height.
      */
     public height: number;


    constructor() {
        this.frameSrc = "";
        this.width = 300;
        this.height = 150;
    }
}
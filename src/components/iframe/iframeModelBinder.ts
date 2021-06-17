/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IModelBinder } from "@paperbits/common/editing";
import { IframeModel } from "./iframeModel";
import { Contract } from "@paperbits/common";
import { IframeContract } from "./iframeContract";

export class IframeModelBinder implements IModelBinder<IframeModel> {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "Iframe";
    }

    public canHandleModel(model: IframeModel): boolean {
        return model instanceof IframeModel;
    }

    public async contractToModel(contract: IframeContract): Promise<IframeModel> {
        const model = new IframeModel();
        model.frameSrc = contract.frameSrc;
        model.width = contract.width;
        model.height = contract.height;
        return model;
    }

    public modelToContract(model: IframeModel): Contract {
        const contract: IframeContract = {
            type: "Iframe",
            frameSrc: model.frameSrc,
            width: model.width,
            height: model.height
        };

        return contract;
    }
}

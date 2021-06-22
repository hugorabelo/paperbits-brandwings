/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IModelBinder } from "@paperbits/common/editing";
import { BrandLogoModel } from "./brandLogoModel";
import { Contract } from "@paperbits/common";
import { BrandLogoContract } from "./brandLogoContract";

export class BrandLogoModelBinder implements IModelBinder<BrandLogoModel> {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "brand-logo";
    }

    public canHandleModel(model: BrandLogoModel): boolean {
        return model instanceof BrandLogoModel;
    }

    public async contractToModel(contract: BrandLogoContract): Promise<BrandLogoModel> {
        const model = new BrandLogoModel();
        model.logoSource = contract.logoSource;
        model.width = contract.width;
        model.styles = contract.styles;
        return model;
    }

    public modelToContract(model: BrandLogoModel): Contract {
        const contract: BrandLogoContract = {
            type: "brand-logo",
            logoSource: model.logoSource,
            width: model.width,
            styles: model.styles
        };

        return contract;
    }
}

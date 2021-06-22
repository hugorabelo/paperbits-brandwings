/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IModelBinder } from "@paperbits/common/editing";
import { PartnerLogoModel } from "./partnerLogoModel";
import { Contract } from "@paperbits/common";
import { PartnerLogoContract } from "./partnerLogoContract";

export class PartnerLogoModelBinder implements IModelBinder<PartnerLogoModel> {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "partner-logo";
    }

    public canHandleModel(model: PartnerLogoModel): boolean {
        return model instanceof PartnerLogoModel;
    }

    public async contractToModel(contract: PartnerLogoContract): Promise<PartnerLogoModel> {
        const model = new PartnerLogoModel();
        model.logoSource = contract.logoSource;
        model.width = contract.width;
        model.styles = contract.styles;
        return model;
    }

    public modelToContract(model: PartnerLogoModel): Contract {
        const contract: PartnerLogoContract = {
            type: "partner-logo",
            logoSource: model.logoSource,
            width: model.width,
            styles: model.styles
        };

        return contract;
    }
}

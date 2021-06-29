/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IModelBinder } from "@paperbits/common/editing";
import { ActivityPreviewModel } from "./activityPreviewModel";
import { Contract } from "@paperbits/common";
import { ActivityPreviewContract } from "./activityPreviewContract";

export class ActivityPreviewModelBinder implements IModelBinder<ActivityPreviewModel> {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "activity-preview";
    }

    public canHandleModel(model: ActivityPreviewModel): boolean {
        return model instanceof ActivityPreviewModel;
    }

    public async contractToModel(contract: ActivityPreviewContract): Promise<ActivityPreviewModel> {
        const model = new ActivityPreviewModel();
        model.logoSource = contract.logoSource;
        model.width = contract.width;
        model.styles = contract.styles;
        return model;
    }

    public modelToContract(model: ActivityPreviewModel): Contract {
        const contract: ActivityPreviewContract = {
            type: "activity-preview",
            logoSource: model.logoSource,
            width: model.width,
            styles: model.styles
        };

        return contract;
    }
}

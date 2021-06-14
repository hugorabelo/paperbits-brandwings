/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IModelBinder } from "@paperbits/common/editing";
import { HtmlSnippetModel } from "./htmlSnippetModel";
import { Contract } from "@paperbits/common";
import { HtmlSnippetContract } from "./htmlSnippetContract";

export class HtmlSnippetModelBinder implements IModelBinder<HtmlSnippetModel> {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "html-snippet";
    }

    public canHandleModel(model: HtmlSnippetModel): boolean {
        return model instanceof HtmlSnippetModel;
    }

    public async contractToModel(contract: HtmlSnippetContract): Promise<HtmlSnippetModel> {
        const model = new HtmlSnippetModel();
        model.sourceCode = contract.sourceCode;
        return model;
    }

    public modelToContract(model: HtmlSnippetModel): Contract {
        const contract: HtmlSnippetContract = {
            type: "html-snippet",
            sourceCode: model.sourceCode
        };

        return contract;
    }
}

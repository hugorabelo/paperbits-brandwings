import { IObjectStorage } from "@paperbits/common/persistence";

const variablesPath = "variables";

export class VariableService {
    constructor(
        private readonly objectStorage: IObjectStorage
    ) { }

    public async getVariables(): Promise<Array<string>> {
        const variables = await this.objectStorage.getObject<Array<string>>(variablesPath);
        
        return variables;
    }
}




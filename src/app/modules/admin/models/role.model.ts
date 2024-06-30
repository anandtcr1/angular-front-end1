import { PageEditingTypeEnum } from "src/app/core/enums/genric.enum";
import { GetList } from "src/app/core/models/genric.model";

export class Role {
    id: string;
    name: string;
    isActive: boolean;
    objectAddedStatus: PageEditingTypeEnum;
    constructor() {
        this.id = "";
    }
}

export class GetRoleList extends GetList {
    name: string | null;
}

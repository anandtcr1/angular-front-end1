import { DefinitionFilesTypesEnum } from 'src/app/core/enums/genric.enum';
import { GetList } from 'src/app/core/models/genric.model';

export class User {
    id: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    lockoutEnabled: boolean;
    emailConfirmed: boolean;
    phoneNumberConfirmed: boolean;
    roles: string[]
}

export class GetUserList extends GetList {
    displayName: string | null;
    email: string | null;
    emailConfirmed: boolean | null;
    phoneNumber: string | null;
    phoneNumberConfirmed: boolean | null;
    lockoutEnabled: boolean | null;
    role: string | null;
}

export class GetRoleList extends GetList {
    name: string | null;
}

export class Permission {
    children: any[]
    id: number
    isActive: boolean
    name: string
    parentId: any
}

export class Claim {
    id: number
    roleId: string
    claimType: string
    claimValue: string
    page: any
    pageId: number
    constructor(c?: Claim) {
        if (c) {
            this.id = c.id;
            this.roleId = c.roleId;
            this.claimType = c.claimType;
            this.claimValue = c.claimValue;
            this.page = c.page;
            this.pageId = c.pageId;
        }
    }
}

export class PermissionResponse {
    id: number
    name: string
    isActive: boolean
    claims: Claim[] = []
    constructor(a?: PermissionResponse) {
        if (a) {
            this.id = a.id;
            this.name = a.name;
            this.isActive = a.isActive;
            this.claims = [];
            for (let i = 0; i < a.claims.length; i++) {
                this.claims.push(a.claims[i]);
            }
        }
    }
}

export class RolePagesPut {
    roleId: string
    pageIds: number[]
    constructor() {
        this.roleId = undefined
        this.pageIds = []
    }
}

export class EditUserRequest {
    id: string
    displayName: string
}

export class CreateUserRequest {
    id: string
    displayName: string
    email: string
    phoneNumber: string
    userPassword: string
    roleId: string
}

export class GetDefinitionFiles extends GetList {
    arabicDescription: string
    englishDescription: string
    constructor() {
        super()
        this.arabicDescription = undefined
        this.englishDescription = undefined
    }
}

export class DefinitionFile {
    id: number
    arabicDescription: string
    englishDescription: string
}

export class PersonalInfo {
    id: string
    displayName: string
    email: string
    phoneNumber: string
    lockoutEnabled: boolean
    emailConfirmed: boolean
    phoneNumberConfirmed: boolean
    profile: Profile
}

class Profile {
    userId: string
    firstName: string
    lastName: string
    birthDate: string
    address: string
    gender: number
    alternativeEmail: string
    areaId: number
    nationalityId: number
    profilePictureId: string
    profileCoverId: string
    attachments: any 
    area: Area
}

class Area {
    id: number
    arabicName: string
    englishName: string
    cityId: number
}
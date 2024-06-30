export interface UserProfileSaveAPIModel {
    firstName: string,
    lastName: string,
    birthDate: string,
    address: string,
    gender: string,
    alternateEmail: string,

    area: string,
    nationalityId: string,
    profilePicture: File
    attachments: File[]
}

export interface GetUserApiModel {
    id: string,
    displayName: string,
    email: string,
    phoneNumber: string,
    lockoutEnabled: boolean,
    emailConfirmed: boolean,
    phoneNumberConfirmed: boolean,
    profile: ProfileAPIModel
}

export interface ProfileAPIModel {
    userId: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    address: string,
    gender: number,
    alternativeEmail: string,
    areaId: number,
    nationalityId: number,
    profilePictureId: string,
    profileCoverId: string,
    attachments: any,
    area: ProfileArea
}

export interface ProfileArea {
    id: number,
    arabicName: string,
    englishName: string,
    cityId: number
}
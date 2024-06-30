import { PopupTypeEnum } from "../enums/genric.enum"

export interface DataList<T> {
    id: any
    data: T[]
    name: string
}

export class Link {
    id?: string
    icon: any
    titleAr: string
    title: string
    link: string
    matchLinks?: string[]
    type?: string
    children?: Link[]
    constructor(l?: Link) {
        if (l) {
            this.id = l.id
            this.icon = l.icon
            this.title = l.title
            this.titleAr = l.titleAr
            this.link = l.link
            this.matchLinks = l.matchLinks
            this.type = l.type
            if (l.children && l.children.length) {
                let children = []
                l.children.forEach(element => {
                    let t = new Link(element)
                    children.push(t)
                });
                this.children = children 
            } else this.children = []
        } else {
            this.id = undefined
            this.icon = undefined
            this.title = undefined
            this.titleAr = undefined
            this.link = undefined
            this.matchLinks = undefined
            this.type = undefined
            this.children = []
        }
    }
}

export interface MessageModel {
    msg: string;
    type: PopupTypeEnum;
    autoClose?: boolean;
    timeOut?: number;
    iconPath?: string;
    isSuccess?: boolean;
}

export class GetList {
    pageNumber: number = 1;
    pageSize: number = 10;
}

export interface ResponseList<T> {
    list: T[]
    totalCount: number
}

export interface LookupRole {
    value: string
    englishDisplay: string
    arabicDisplay: string
}

export interface LookupCity {
    value: string
    englishDisplay: string
    arabicDisplay: string
}

export class LookupRolesFilter {
    name: string
}
export class LookupCitiesFilter {
    name: string
}

export class Gender {
    id: number
    text: string
    textAr: string
}

export interface LookupNationalities {
    value: number,
    englishDisplay: string,
    arabicDisplay: string
}
export interface LookupCities {
    value: number,
    englishDisplay: string,
    arabicDisplay: string
}

export interface LookupAreas {
    value: number,
    englishDisplay: string,
    arabicDisplay: string
}

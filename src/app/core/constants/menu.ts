import { Gender, Link } from 'src/app/core/models/genric.model';
import { DefinitionFilesTypesEnum, GenderEnum, PagesEnum } from '../enums/genric.enum';
export const MainList: Link[] = [
    {
        icon: 'shield',
        link: '',
        title: 'Security Modules',
        titleAr: 'إدارة الخصوصية',
        children: [
            {
                id: PagesEnum.UserManagment,
                icon: '',
                link: '/admin/users',
                title: 'Users',
                titleAr: 'المستخدمين'
            },
            {
                id: PagesEnum.RoleManagment,
                icon: '',
                link: '/admin/roles-list',
                title: 'Roles',
                titleAr: 'الأدوار'
            }
        ]
    },
    {
        icon: 'user',
        link: '/admin/my-profile',
        title: 'My Profile',
        titleAr: 'الملف الشخصي'
    },
    {
        id: PagesEnum.DefinitionFiles,
        icon: 'file-pen',
        link: '/admin/definition-files',
        title: 'Definition Files',
        titleAr: 'ملفات التعريف'
    }
]

export const DefinitionFilesTypeList = [
    {
        id: DefinitionFilesTypesEnum.ContractType,
        text: 'contractType'
    },
    {
        id: DefinitionFilesTypesEnum.IncomeType,
        text: 'incomeType'
    },
    {
        id: DefinitionFilesTypesEnum.OutgoingType,
        text: 'outgoingType'
    }
]

export const GenderList: Gender[] = [
    {
        id: GenderEnum.Male,
        text: 'Male',
        textAr: 'ذكر',
    },
    {
        id: GenderEnum.Female,
        text: 'Female',
        textAr: 'أنثى',
    }
]
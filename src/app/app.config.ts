import {environment} from "src/environments/environment";

const apisDomain = environment.apisDomain;

export const appConfig = {
    endPoints: {
        /******************* Authenticate *******************/
        authenticate: `${apisDomain}/api/Authenticate`,

        /******************* User *******************/
        user_GetList : `${apisDomain}/api/User/GetList`,
        user_UpdateUser : `${apisDomain}/api/User/UpdateUser`,
        user_CreateUser : `${apisDomain}/api/User/CreateUser`,

        /******************* Role *******************/
        role_GetRoleList : `${apisDomain}/api/Role/GetRoleList`,
        role_GetRole : `${apisDomain}/api/Role/Get/`,
        role_PutRolePages : `${apisDomain}/api/Role/UpdateRolePages`,

        /******************* Lookup *******************/
        lookups_GetRoleist : `${apisDomain}/api/Lookups/GetRoles`,
        lookups_GetCities : `${apisDomain}/api/Lookups/GetCities`,
        lookups_GetNationalityList : `${apisDomain}/api/Lookups/GetNationalities`,
        lookups_ClityList : `${apisDomain}/api/Lookups/GetCities`,
        lookups_AreaList : `${apisDomain}/api/Lookups/GetAreas`,

        /******************* Page *******************/
        page_GetPages : `${apisDomain}/api/Page/GetPages`,
        role_GetList : `${apisDomain}/api/Role/GetList`,
        role_GetItem : `${apisDomain}/api/Role/Get`,
        role_Create : `${apisDomain}/api/Role/Create`,
        role_Update : `${apisDomain}/api/Role/Update`,

        /******************* Definition Files *******************/
        defFiles_IncomeCorrespondenceTypes_GetList : `${apisDomain}/api/IncomeType/GetList`,
        defFiles_IncomeCorrespondenceTypes_Create : `${apisDomain}/api/IncomeType/Create`,
        defFiles_IncomeCorrespondenceTypes_Update : `${apisDomain}/api/IncomeType/Update`,

        

        defFiles_ContractTypess_GetList : `${apisDomain}/api/ContractTypes/GetList`,
        defFiles_ContractTypes_Create : `${apisDomain}/api/ContractTypes/Create`,
        defFiles_ContractTypes_Update : `${apisDomain}/api/ContractTypes/Update`,


        accountManagement_GetMenuItems : `${apisDomain}/api/AccountManagement/GetMenuItems`,
        accountManagement_GetUser : `${apisDomain}/api/AccountManagement/GetUser`,
        defFiles_OutGoingCorrespondenceTypes_GetList : `${apisDomain}/api/OutGoingCorrespondenceTypes/GetList`,
        defFiles_OutGoingCorrespondenceTypes_Create : `${apisDomain}/api/OutGoingCorrespondenceTypes/Create`,
        defFiles_OutGoingCorrespondenceTypes_Update : `${apisDomain}/api/OutGoingCorrespondenceTypes/Update`,

        /******************* AccountManagement *******************/
        accManagement_UpdateProfile : `${apisDomain}/api/AccountManagement/UpdateProfile`,
        accManagement_GetUser : `${apisDomain}/api/AccountManagement/GetUser`,
    },
    authExpiration: 3600 * 2
  }
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Claim, GetRoleList, Permission, PermissionResponse, RolePagesPut } from '../../models/user.model';
import { SettingsService } from 'src/app/core/services/settings.service';
import { GetList, LookupRole, LookupRolesFilter } from 'src/app/core/models/genric.model';
import { MessageService } from 'src/app/core/services/message.service';
import { LanguageEnum } from 'src/app/core/enums/genric.enum';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss']
})
export class RolePermissionComponent {
  lookupRolefilter: LookupRolesFilter = new LookupRolesFilter();
  filterRoleList: GetRoleList = new GetRoleList()
  allPermissions: Permission[] = []
  rolesPermissions: PermissionResponse = new PermissionResponse()
  rolesPermissions_ForSaveDiscardProccess: PermissionResponse = new PermissionResponse()
  totalCount = 0
  lastPageIndex
  roleId
  roles: LookupRole[] = []
  changeFlag: boolean = false
  lang
  langEnum = LanguageEnum
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private settingsService: SettingsService,
    private router: Router,
    private messageService: MessageService,
    private languageService:LanguageService
  ) {
    this.roleId = activatedRoute.snapshot.params['id']
    this.lang = this.languageService.getSelectedLanguage();
  }

  ngOnInit(): void {
    this.getList()
    this.getRoleList()
    this.getRolePermissions()
  }

  getList() {
    this.userService.getAllPermissions(this.filterRoleList).subscribe(permissions => {
      this.allPermissions = permissions.list
      this.totalCount = Number(permissions.totalCount)
      this.lastPageIndex = ((this.totalCount - (this.totalCount % this.filterRoleList.pageSize)) / this.filterRoleList.pageSize) + (this.totalCount % this.filterRoleList.pageSize ? 1 : 0)
    }, err => { })
  }

  getRolePermissions() {
    this.router.navigate(['/admin/role-permissions', this.roleId])
    this.userService.getRoleDetails(this.roleId).subscribe(permissions => {
      this.rolesPermissions = new PermissionResponse(permissions)
      console.log(this.rolesPermissions)
      this.rolesPermissions_ForSaveDiscardProccess = new PermissionResponse(permissions)
    }, err => { })
  }

  getRoleList() {
    this.settingsService.lookupRolesList(this.lookupRolefilter).subscribe(roles => {
      this.roles = roles
    }, err => { });
  }

  checkAllowPermission(id) {
    if (this.rolesPermissions?.claims) {
      let result = this.rolesPermissions.claims.filter(a => a.pageId === id)
      return result && result.length > 0;
    }
    else return false
  }

  changePermissions(item: Permission) {
    this.changeFlag = true
    let flag = this.checkAllowPermission(item.id)
    if (flag) {
      this.rolesPermissions.claims = this.rolesPermissions.claims.filter(a => a.pageId != item.id)
    } else {
      let claim: Claim = {
        claimType: "Page",
        claimValue: item.name,
        id: 0,
        page: null,
        pageId: item.id,
        roleId: this.roleId,
      }
      this.rolesPermissions.claims.push(claim)
    }
  }

  discardChanges() {
    this.rolesPermissions =  new PermissionResponse(this.rolesPermissions_ForSaveDiscardProccess)
  }

  updatePages(){
    let body = new RolePagesPut()
    body.roleId = this.roleId
    this.rolesPermissions.claims.forEach((element:Claim) => {
      body.pageIds.push(element.pageId)
    });

    this.userService.saveRolePages(body).subscribe(data => {
        this.messageService.success('rolePagesUpdatedSuccessfully')
    }, err => {
      this.messageService.error('rolePagesUpdatedError');
    });
  }
}

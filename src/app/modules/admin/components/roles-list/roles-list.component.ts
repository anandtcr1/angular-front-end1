import { Component, OnInit, SimpleChanges } from '@angular/core';
import { faPlusCircle,faEye,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';

import { RolesService } from '../../services/roles.service';
import { GetRoleList, Role } from '../../models/role.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleDetailsComponent } from '../role-details/role-details.component';
import { PageEditingTypeEnum } from 'src/app/core/enums/genric.enum';


@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {
  filter: GetRoleList = new GetRoleList();
  roles: Role[] = [];
  totalCount = 0;
  lastPageIndex;
  faEdit = faEdit;
  
  constructor(private roleService: RolesService, private modalService: NgbModal) { }
  
  ngOnInit(): void {
    this.getList();
  }

  openRoleDetails(role?:Role) {
    const modalRoleDetails = this.modalService.open(RoleDetailsComponent);
    modalRoleDetails.componentInstance.role = role;

    modalRoleDetails.componentInstance.onSaveDone.subscribe(role => {
      if(role.objectAddedStatus == PageEditingTypeEnum.Edit) {
        this.roles[
          this.roles.findIndex(x => 
            x.id == role.id
          )] = role;
      }
      else {
        this.getList();
      }
    });
  }

  getList() {
    this.filter.name = this.filter.name == undefined ? null : this.filter.name;

    this.roleService.getRoles(this.filter).subscribe(roles => {
      this.roles = roles.list;
      this.totalCount = Number(roles.totalCount)
      this.lastPageIndex = ((this.totalCount - (this.totalCount % this.filter.pageSize)) / this.filter.pageSize) + (this.totalCount % this.filter.pageSize ? 1 : 0)
    }, err => { })
  }  
}

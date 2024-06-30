import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faCircleXmark, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { PageEditingTypeEnum } from 'src/app/core/enums/genric.enum';
import { RolesService } from '../../services/roles.service';
import { Role } from '../../models/role.model';
import { MessageService } from 'src/app/core/services/message.service';
import { LanguagePipe } from 'src/app/shared/pipes/language.pipe';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ADD_ICON_Path, EDIT_ICON_Path } from 'src/app/core/constants/icon-path';

export enum stringEnum {
  id = "id",
  name = "name",
  isActive = "isActive"
}

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})

export class RoleDetailsComponent implements OnInit {

  @Input()
  roleId: string;

  @Output()
  onSaveDone = new EventEmitter<Role>();

  roleDetails: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    isActive: new FormControl(null),
  })

  submitted: boolean = false
  faCircleXmark = faCircleXmark
  faPlusCircle = faPlusCircle
  pageTypeEnum = PageEditingTypeEnum
  activePageType = PageEditingTypeEnum.View
  enableSaveButton: boolean = true;
  data: any = {}
  private role: Role = new Role();

  constructor(private roleService: RolesService,
    private messageService: MessageService,
    private languagePipe: LanguagePipe,
    private activeModel: NgbActiveModal) {

  }

  ngOnInit(): void {
    this.activePageType = PageEditingTypeEnum.Edit;

    if (this.role) {
      this.getRole();
      this.data.iconPath = EDIT_ICON_Path
    }
    else {
      this.activePageType = PageEditingTypeEnum.Add;
      this.data.iconPath = ADD_ICON_Path
    }
  }

  getRole() {
    if (this.role && this.role.name) {
      this.roleDetails.controls[stringEnum.name].setValue(this.role.name);
      this.roleDetails.controls[stringEnum.isActive].setValue(this.role.isActive);
    }
  }

  submitForm() {
    this.submitted = true;
    if (this.roleDetails.invalid) return;

    this.enableSaveButton = false;

    this.role.name = this.roleDetails.controls[stringEnum.name].value;
    this.role.isActive = this.roleDetails.controls[stringEnum.isActive].value == undefined ? false : this.roleDetails.controls[stringEnum.isActive].value;

    if (this.activePageType == PageEditingTypeEnum.Add) {

      this.roleService.createRole(this.role)
        .subscribe(result => {
          this.role = result;
          this.enableSaveButton = true;


          this.messageService.success(this.languagePipe.transform("roleCreated"));
          this.activeModel.close();

          this.role.objectAddedStatus = this.activePageType;
          this.onSaveDone.emit(this.role);

        });
    }
    else if (this.activePageType == PageEditingTypeEnum.Edit) {

      this.roleService.updateRole(this.role)
        .subscribe(result => {
          this.role = result;
          this.enableSaveButton = true;
          this.activeModel.close();

          this.messageService.success(this.languagePipe.transform("roleUpdated"));

          this.role.objectAddedStatus = this.activePageType;
          this.onSaveDone.emit(this.role);
        });
    }
  }

}

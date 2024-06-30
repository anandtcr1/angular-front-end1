import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CreateUserRequest } from '../../../models/user.model';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PASSWORD_PATTERN, PHONENUMBER_PATTERN } from 'src/app/core/constants/validators';
import { SettingsService } from 'src/app/core/services/settings.service';
import { LookupRole, LookupRolesFilter } from 'src/app/core/models/genric.model';
import { ADD_ICON_Path } from 'src/app/core/constants/icon-path';
import { LanguageService } from 'src/app/core/services/language.service';
import { LanguageEnum } from 'src/app/core/enums/genric.enum';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  user:CreateUserRequest = new CreateUserRequest();
  data : any = {iconPath: ADD_ICON_Path}
  showPassword:boolean = false;
  validation:boolean = false;
  createUserForm: FormGroup = new FormGroup({
    displayName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, [Validators.required,Validators.pattern(PHONENUMBER_PATTERN)]),
    userPassword: new FormControl(null, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]),
    roleId: new FormControl(null, Validators.required),
  })
  submitted: boolean = false
  roles:LookupRole[] = []
  lang
  langEnum = LanguageEnum

  constructor(
    private userService: UserService,
    private messageService:MessageService,
    public activeModal: NgbActiveModal,
    private settingsService: SettingsService,
    private languageService:LanguageService
    ) {
      this.getRoles()
    this.lang = this.languageService.getSelectedLanguage();
  }

  save() {
    this.validation = true
    
    if (this.createUserForm.valid){
      this.submitted = true
      this.userService.createUser(this.createUserForm.value).subscribe(data => {
        this.submitted = false
        this.messageService.success('userCreatedSuccessfully')
        this.activeModal.close(data)
      }, (error) => {
        this.submitted = false
        this.messageService.error(error)
      })
    }
  }

  getRoles(){
    let lookupRolefilter:LookupRolesFilter = new LookupRolesFilter()
    this.settingsService.lookupRolesList(lookupRolefilter).subscribe(data => {
      this.roles = data
    },err=>{})
  }
}

import { Component, Input,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { EditUserRequest } from '../../../models/user.model';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @Input() data: any
  user:EditUserRequest = new EditUserRequest();
  editUserForm: FormGroup = new FormGroup({
    id: new FormControl(this.user.id, Validators.required),
    displayName: new FormControl(this.user.displayName, Validators.required)
  })
  submitted: boolean = false

  constructor(
    private userService: UserService,
    private messageService:MessageService,
    public activeModal: NgbActiveModal
    ) {
  }
  ngOnInit(): void {
    if(this.user && this.user.id){
      this.editUserForm.controls['id'].setValue(this.user.id)
      this.editUserForm.controls['displayName'].setValue(this.user.displayName)
    }
  }

  save() {
    if (this.editUserForm.valid){
      this.submitted = true
      this.userService.editUser(this.editUserForm.value).subscribe(data => {
        this.submitted = false
        this.messageService.success('userSavedSuccessfully')
        this.activeModal.close(data)
      }, err => {
        this.submitted = false
        this.messageService.error('userErrorOnSave')
        this.activeModal.close()
      })
    }
  }
}

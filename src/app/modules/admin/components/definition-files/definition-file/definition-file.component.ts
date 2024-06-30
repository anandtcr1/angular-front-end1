import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { DefinitionFilesTypesEnum } from 'src/app/core/enums/genric.enum';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DefinitionFile } from '../../../models/user.model';

@Component({
  selector: 'app-definition-file',
  templateUrl: './definition-file.component.html',
  styleUrls: ['./definition-file.component.scss']
})
export class DefinitionFileComponent implements OnInit {
  data: any
  createForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    arabicDescription: new FormControl(null, Validators.required),
    englishDescription: new FormControl(null, Validators.required),
  });
  validation: boolean = false;
  submitted: boolean = false;
  defFileType = DefinitionFilesTypesEnum.IncomeType
  file: DefinitionFile

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private activeModal: NgbActiveModal
  ) {

  }
  ngOnInit(): void {
    if (this.file) {
      this.createForm.controls['id'].setValue(this.file.id)
      this.createForm.controls['arabicDescription'].setValue(this.file.arabicDescription)
      this.createForm.controls['englishDescription'].setValue(this.file.englishDescription)
    }
  }
  save() {
    if (!this.file)
      this.userService.createDefinitionsFile(this.createForm.value, this.defFileType).subscribe(data => {
        this.submitted = false
        this.messageService.success('createdSuccessfully')
        this.activeModal.close(data)
      }, err => {
        this.submitted = false
        this.messageService.error(err)
      })
    else
      this.userService.editDefinitionsFile(this.createForm.value, this.defFileType).subscribe(data => {
        this.submitted = false
        this.messageService.success('editedSuccessfully')
        this.activeModal.close(data)
      }, err => {
        this.submitted = false
        this.messageService.error(err)
      })
  }
}

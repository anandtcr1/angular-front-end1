import { Component, Input, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-error-handeling',
  templateUrl: './form-error-handeling.component.html',
  styleUrls: ['./form-error-handeling.component.scss']
})
export class FormErrorHandelingComponent implements OnInit,OnChanges {
  @Input() formRef: FormGroup;
  @Input() controlName: string;
  @Input() controlVal: string;
  specificPatterns = ['password', 'phone', 'userPassword', 'phoneNumber']
  errors: any = []
  constructor() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.formRef) {
      let errors: any = this.formRef.controls[this.controlName];
      if (errors) this.errors = errors.errors
    }
  }

  ngOnInit(): void {
  }

  check(x){
    return !this.specificPatterns.includes(x)
  }
}

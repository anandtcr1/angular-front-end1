import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupTypeEnum } from 'src/app/core/enums/genric.enum';

@Component({
  selector: 'message-popup',
  templateUrl: './message-popup.component.html',
  styleUrls: ['./message-popup.component.scss'],
})
export class MessagePopupComponent implements OnInit, OnDestroy {
  timer: any;
  @Input() data:any
  popupTypeEnum = PopupTypeEnum
  constructor(
    private dialogRef: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data.autoClose == true || this.data.autoClose == undefined)
      this.timer = setTimeout(() => {
        this.dialogRef.close();
      }, this.data?.timeOut || 3000);
  }
  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }
}

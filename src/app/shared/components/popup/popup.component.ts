import { Component, Input, Optional } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Input("showCloseBtn") showCloseBtn: boolean = true;
  @Input("showActionsButtons") showActionsButtons: boolean = false;
  @Input("confirmButton") confirmButton: any
  @Input("cancelButton") cancelButton: any
  @Input("title") title: string = '';
  @Input("panelClass") panelClass: string = '';
  @Input("showLottieCircle") showLottieCircle: boolean = false;
  @Input("lottiePath") lottiePath: string = '';
  @Input("iconBackground") iconBackground: boolean = false;
  
  constructor(@Optional() private dialogRef: NgbActiveModal) {

  }

  close() {
    this.dialogRef.close()
  }
}

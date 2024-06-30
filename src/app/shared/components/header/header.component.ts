import { Component } from '@angular/core';
import { LangSelectionPopupComponent } from '../lang-selection-popup/lang-selection-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private modalService: NgbModal) {
  }

  setLang() {
    const modalRef = this.modalService.open(LangSelectionPopupComponent, { centered: true });
  }
}

import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageEnum } from 'src/app/core/enums/genric.enum';
import { LanguageService } from 'src/app/core/services/language.service';
import { LangSelectionPopupComponent } from '../lang-selection-popup/lang-selection-popup.component';

@Component({
  selector: 'app-header-icons',
  templateUrl: './header-icons.component.html',
  styleUrls: ['./header-icons.component.scss']
})
export class HeaderIconsComponent {
  lang
  langEnum = LanguageEnum
  constructor(private modalService: NgbModal, private languageService: LanguageService) {
    this.lang = this.languageService.getSelectedLanguage();
  }
  setLang() {
    const modalRef = this.modalService.open(LangSelectionPopupComponent, { centered: true });
  }
}

import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { LanguageEnum } from 'src/app/core/enums/genric.enum';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticateService } from 'src/app/modules/auth/authenticate.service';

@Component({
  selector: 'app-lang-selection-popup',
  templateUrl: './lang-selection-popup.component.html',
  styleUrls: ['./lang-selection-popup.component.scss']
})
export class LangSelectionPopupComponent implements OnInit {
  languageEnum = LanguageEnum;
  selectedLanguage: LanguageEnum;
  constructor(private dialogRef: NgbActiveModal,
    private langService: LanguageService) {
    this.selectedLanguage = this.langService.getSelectedLanguage() as LanguageEnum;
  }

  ngOnInit(): void {
  }
  changeLang() {
    this.langService.setLanguage(this.selectedLanguage);
    this.dialogRef.close()
  }
}

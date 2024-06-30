import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { language } from '../constants/language';
import { SELECTED_LANGUAGE } from '../constants/local-storage';
import { LanguageEnum } from '../enums/genric.enum';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  languagesDir = {
    en: 'ltr',
    fr: 'ltr',
    gr: 'ltr',
    ar: 'rtl',
  };
  selectedLanguage: string = LanguageEnum.English;

  languageChanged: Subject<string> = new Subject<string>();

  constructor() {
    this.selectedLanguage = localStorage.getItem(SELECTED_LANGUAGE) || LanguageEnum.English;
    localStorage.setItem(SELECTED_LANGUAGE, this.selectedLanguage);

    this.languageChanged.subscribe((res: string) => {
      if (localStorage.getItem(SELECTED_LANGUAGE) !== res) {
        localStorage.setItem(SELECTED_LANGUAGE, res);
        location.reload();
      }
    });
  }

  getSelectedLanguage() {
    return this.selectedLanguage;
  }

  setLanguage(lang:any) {
    this.languageChanged.next(lang);
  }

  getLang(value: string, args?: any): any {
    if (language[value]) {
      let trans = language[value][this.selectedLanguage];
      if (trans && args) {
        Object.keys(args).forEach(key => {
          trans = trans.replace('{{' + key + '}}', args[key]);
        });
      }
      return trans;
    }
    return value;
  }
  getSelectedDir(): 'rtl' | 'ltr' {
    return this.selectedLanguage === LanguageEnum.Arabic ? 'rtl' : 'ltr';
  }
}

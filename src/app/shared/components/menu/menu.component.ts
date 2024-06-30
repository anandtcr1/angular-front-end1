import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Link } from 'src/app/core/models/genric.model';
import { LangSelectionPopupComponent } from '../lang-selection-popup/lang-selection-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from 'src/app/core/services/settings.service';
import { MainList } from 'src/app/core/constants/menu';
import { AuthenticateService } from 'src/app/modules/auth/authenticate.service';
import { LanguageEnum } from 'src/app/core/enums/genric.enum';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  lang
  langEnum = LanguageEnum
  constructor(
    public router: Router,
    private modalService: NgbModal,
    private settingsService: SettingsService,
    private authenticateService: AuthenticateService,
    private languageService: LanguageService
  ) {
    this.menuSubject$ = this.settingsService.menuSubject$
    this.lang = this.languageService.getSelectedLanguage();
  }

  ngOnInit(): void {
    this.getMenuItems()
  }

  checkMatchLinks(links: string[]) {
    let flag = false
    if (links && links.length)
      links.forEach((element: string) => {
        flag = flag || this.router.url.includes(element)
      });
    return flag
  }

  setLang() {
    const modalRef = this.modalService.open(LangSelectionPopupComponent, {
      centered: true,
      size: 'sm'
    });
  }
  logout(){
    this.authenticateService.logout();
  }
  checkChildren(items:Link[]){
    if(!items || items.length === 0) return false;
    let flag = false
    items.forEach(element => {
       flag = flag || this.router.url == element.link
    });

   return flag;
  }
  activateTab(link:string,children:Link[]){
    if(link == ''){
      if(children && children.length) {
        this.router.navigate([children[0].link])
      }
    } else {
      this.router.navigate([link])
    }
  }

  getMenuItems(){
    this.settingsService.getMenuItems().subscribe(items =>{}, err =>{});
  }
}

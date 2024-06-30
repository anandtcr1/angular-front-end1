import { Component, OnInit } from '@angular/core';
import { LanguageService } from './core/services/language.service';
import { MessagingNotficationService } from './core/services/notifications/messaging-notfication.service';
import { Subscription } from 'rxjs';
import { MessageService } from './core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessagePopupComponent } from './shared/components/message-popup/message-popup.component';
import { AuthenticateService } from './modules/auth/authenticate.service';
import { SettingsService } from './core/services/settings.service';
import { MainList } from './core/constants/menu';
import { Link } from './core/models/genric.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Salina';
  dir: any
  messagePopupSubscription: Subscription;

  constructor(
    private languageService: LanguageService,
    private messagingService: MessagingNotficationService,
    private messageService: MessageService,
    private authenticateService: AuthenticateService,
    private settingService: SettingsService,
    private dialog: NgbModal
  ) {
    let lang = this.languageService.getSelectedLanguage();
    this.dir = this.languageService.languagesDir;
    this.dir = this.dir[lang];
    let body = document.getElementsByTagName('body');
    let item = body[0];
    item.setAttribute('dir', this.dir);
    this.configMessagePopupSubscription()
  }

  ngOnInit(): void {
    this.authenticateService.autoSignIn();
    this.getMenuItems()
    /*this.messagingService.showPopUp.subscribe((payload: any) => {
      if (payload) {
        console.log(payload);
      }
    });
    */
  }

  configMessagePopupSubscription() {
    this.messagePopupSubscription = this.messageService.messagePopup$.subscribe(
      (data) => {
        const modalRef = this.dialog.open(MessagePopupComponent, {
          windowClass: 'position-relative',
          size: 'md'
        })
        modalRef.componentInstance.data = data
        modalRef.result.then((data: any) => {
          this.messageService.afterClosed$.next(true);
        });
      }
    );
  }

  getMenuItems() {
    this.settingService.getMenuItems().subscribe((items: any) => {
      if (items && items.length) {
        let dynamicMenu = []
        MainList.forEach((element: Link) => {
          if (element.id) {
            let item = items.filter(item => item.name == element.id)
            if (item && item.length) {
              dynamicMenu.push(element)
            }
          } else {
            let parent = new Link(element) , parentTemp = new Link(element)
            parentTemp.children = []
            
            if (parent && parent.children && parent.children.length) {
              parent.children.forEach((elementC) => {
                let item = items.filter(item => item.name == elementC.id)
                if (item && item.length) {
                  parentTemp.children.push(elementC)
                }
              });
            }
            if(parentTemp.children.length) dynamicMenu.push(parentTemp)
          }
          this.settingService.menuSubject$.next(dynamicMenu)
        });
      }
    }, (err) => { })
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MessageModel } from '../models/genric.model';
import { PopupTypeEnum } from '../enums/genric.enum';
import { LanguagePipe } from 'src/app/shared/pipes/language.pipe';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messagePopup$: Subject<MessageModel> = new Subject();
  afterClosed$: Subject<any> = new Subject();
  constructor(private langPipe:LanguagePipe) { }
  success(msg: string,autoClose?:boolean,timeOut?:number) {
    this.afterClosed$.complete();
    this.afterClosed$ = new Subject();
    const model: MessageModel = {
      msg: this.langPipe.transform(String(msg)),
      type: PopupTypeEnum.Success,
      autoClose: autoClose ? autoClose : true,
      timeOut : timeOut ? timeOut : 5000,
      iconPath : 'assets/animations/success-message-icon.json'
    };
    this.messagePopup$.next(model);
    return this.afterClosed$.asObservable();
  }
  error(msg: string, timeOut?:number) {
    this.afterClosed$.complete();
    this.afterClosed$ = new Subject();
    const model: MessageModel = {
      msg: this.langPipe.transform(String(msg)),
      type: PopupTypeEnum.Error,
      timeOut : timeOut ? timeOut : 5000,
      iconPath : 'assets/animations/error-message-icon.json'
    };
    this.messagePopup$.next(model);
    return this.afterClosed$.asObservable()
  }
  
  info(msg: string, timeOut?:number) {
    this.afterClosed$.complete();
    this.afterClosed$ = new Subject();
    const model: MessageModel = {
      msg: this.langPipe.transform(String(msg)),
      type: PopupTypeEnum.Exclamation,
      timeOut : timeOut ? timeOut : 5000,
      iconPath : 'assets/animations/info-message-icon.json'
    };
    this.messagePopup$.next(model);
    return this.afterClosed$.asObservable()
  }
}

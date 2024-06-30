import { Component } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { LanguagePipe } from 'src/app/shared/pipes/language.pipe';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss']
})
export class AdminContainerComponent {

  
    /*constructor(private messageService:MessageService,private langPipe:LanguagePipe){
    this.messageService.info('bothPasswordsAreNotMatching');
  }*/
}

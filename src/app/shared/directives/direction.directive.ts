import { Directive, HostBinding } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';

@Directive({
  selector: '[direction]'
})
export class DirectionDirective {
  @HostBinding('attr.dir') dir: string;
  constructor(private langService: LanguageService) {
    this.dir = this.langService.getSelectedDir();
  }
  ngDoCheck() {
    this.dir = this.langService.getSelectedDir();
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';

@Pipe({
    name: 'lang'
})
export class LanguagePipe implements PipeTransform {

    constructor(
        public lang: LanguageService
    ) { }

    transform(value: string, args?: any): any {
        return this.lang.getLang(value, args);
    }
}

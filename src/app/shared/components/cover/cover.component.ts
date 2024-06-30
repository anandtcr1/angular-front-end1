import { Component, Input } from '@angular/core';
import { GenderEnum } from 'src/app/core/enums/genric.enum';
import { SettingsService } from 'src/app/core/services/settings.service';
import { PersonalInfo } from 'src/app/modules/admin/models/user.model';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent {
  @Input() personalInfo:PersonalInfo
}

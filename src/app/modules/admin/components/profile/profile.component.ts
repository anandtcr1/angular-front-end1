import { Component } from '@angular/core';
import { UserActionsEnum } from 'src/app/core/enums/genric.enum';
import { UserService } from '../../services/user.service';
import { PersonalInfo } from '../../models/user.model';
import { SettingsService } from 'src/app/core/services/settings.service';
import { Gender } from 'src/app/core/models/genric.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userActionsEnum = UserActionsEnum
  personalInfo: PersonalInfo = new PersonalInfo()

  constructor(private userService: UserService, private settingService: SettingsService) {
    this.getUser()
  }

  getUser() {
    this.userService.getMyInfo().subscribe(user => { this.personalInfo = user }, err => { });
  }

  getGender(gender: number): Gender | undefined { return this.settingService.getGender(gender) }
}

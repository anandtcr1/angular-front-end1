import { Component, Input } from '@angular/core';
import { UserActionsEnum } from 'src/app/core/enums/genric.enum';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input() type:UserActionsEnum
  userActionsEnum = UserActionsEnum
}

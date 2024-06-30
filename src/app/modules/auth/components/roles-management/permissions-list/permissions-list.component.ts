import { Component } from '@angular/core';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.scss']
})
export class PermissionsListComponent {
  faPlusCircle = faPlusCircle
  faTrash = faTrash
  permissions = [
    {
      id: 1,
      name: 'Administrator',
      description: 'manage everything'
    },
    {
      id: 2,
      name: 'Administrator',
      description: 'manage everything'
    }
  ]
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { GetUserList, User } from '../../../models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ADD_ICON_Path, EDIT_ICON_Path } from 'src/app/core/constants/icon-path';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  filter: GetUserList = new GetUserList();
  users: User[] = [];
  newUsers: User[] = [];
  totalCount = 0
  lastPageIndex
  loading: boolean = false
  constructor(
    private userService: UserService,
    private editUserModal: NgbModal
  ) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.loading = true
    this.newUsers = []
    this.users = []
    this.totalCount = 0
    this.lastPageIndex = 0
    this.userService.getUsers(this.filter).subscribe(users => {
      this.loading = false
      this.newUsers = []
      this.users = users.list
      this.totalCount = Number(users.totalCount)
      this.lastPageIndex = ((this.totalCount - (this.totalCount % this.filter.pageSize)) / this.filter.pageSize) + (this.totalCount % this.filter.pageSize ? 1 : 0)
    }, err => {
      this.loading = false
    })
  }

  editUser(item) {
    const editModal = this.editUserModal.open(EditUserComponent)
    editModal.componentInstance.data = { iconPath: EDIT_ICON_Path }
    editModal.componentInstance.user = {
      id: item.id,
      displayName: item.displayName
    }
    editModal.result.then(user => {
      if (user)
        this.updateItem(user)
    })
  }

  createUser() {
    const createModal = this.editUserModal.open(CreateUserComponent)
    createModal.componentInstance.data = { iconPath: ADD_ICON_Path }
    createModal.result.then(user => {
      if (user)
        this.pushItem(user)
    })
  }

  updateItem(item: User) {
    let userIndex = this.users.findIndex(user => user.id === item.id)
    if (userIndex > -1 && userIndex < this.users.length) {
      this.users[userIndex] = item
    }
  }

  pushItem(user: User) {
    if (user && user.id && user.id != '') {
      this.newUsers.unshift(user)
    }
  }
}

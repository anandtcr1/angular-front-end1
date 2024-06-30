import { Component } from '@angular/core';
import { GetList } from 'src/app/core/models/genric.model';
import { DefinitionFile, GetDefinitionFiles } from '../../../models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefinitionFileComponent } from '../definition-file/definition-file.component';
import { ADD_ICON_Path, EDIT_ICON_Path } from 'src/app/core/constants/icon-path';
import { UserService } from '../../../services/user.service';
import { DefinitionFilesTypesEnum } from 'src/app/core/enums/genric.enum';
import { DefinitionFilesTypeList } from 'src/app/core/constants/menu';

@Component({
  selector: 'app-definition-files-list',
  templateUrl: './definition-files-list.component.html',
  styleUrls: ['./definition-files-list.component.scss']
})
export class DefinitionFilesListComponent {
  files: DefinitionFile[] = [];
  newFiles: DefinitionFile[] = [];
  filter: GetDefinitionFiles = new GetDefinitionFiles()
  lastPageIndex
  defFileType = DefinitionFilesTypesEnum.IncomeType
  definitionFilesTypeList = DefinitionFilesTypeList
  totalCount = 0

  constructor(private createModal: NgbModal, private userService: UserService) {
    this.getList()
  }
  create() {
    const createModal = this.createModal.open(DefinitionFileComponent)
    createModal.componentInstance.data = { iconPath: ADD_ICON_Path }
    createModal.componentInstance.defFileType = this.defFileType
    createModal.result.then(item => {
      if (item)
        this.pushItem(item)
    })
  }
  edit(item: DefinitionFile) {
    const editModal = this.createModal.open(DefinitionFileComponent)
    editModal.componentInstance.data = { iconPath: EDIT_ICON_Path }
    editModal.componentInstance.file = {
      id : item.id,
      arabicDescription : item.arabicDescription,
      englishDescription : item.englishDescription
    }
    editModal.result.then(item => {
      if (item)
        this.updateItem(item)
    })
  }
  getList() {
    this.userService.getDefinitionsFiles(this.filter, this.defFileType).subscribe(data => {
      this.newFiles = []
      this.files = data.list
      this.totalCount = data.totalCount
      this.lastPageIndex = ((this.totalCount - (this.totalCount % this.filter.pageSize)) / this.filter.pageSize) + (this.totalCount % this.filter.pageSize ? 1 : 0)
    }, err => { })
  }


  updateItem(item: DefinitionFile) {
    let userIndex = this.files.findIndex(user => user.id === item.id)
    if (userIndex > -1 && userIndex < this.files.length) {
      this.files[userIndex] = item
    }
  }

  pushItem(item: DefinitionFile) {
    if (item && item.id) {
      this.newFiles.unshift(item)
    }
  }
}

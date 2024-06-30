import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ADD_ICON_Path, USER_IMAGE_Path } from 'src/app/core/constants/icon-path';
import { PASSWORD_PATTERN, PHONENUMBER_PATTERN } from 'src/app/core/constants/validators';
import { ProfileService } from '../../services/profile.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { LookupAreas, LookupCities, LookupNationalities } from 'src/app/core/models/genric.model';
import { GenderList } from 'src/app/core/constants/menu';
import { UserProfileSaveAPIModel } from '../../models/user-profile.model';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from 'src/app/shared/formatter/CustomDateParserFormatter';
import { MessageService } from 'src/app/core/services/message.service';
import { LanguagePipe } from 'src/app/shared/pipes/language.pipe';
import { Location } from '@angular/common';

export class PushedFile {
  name: string;
  type: string;
}

export enum AcceptedFileTypes {
  Pdf = "pdf",
  Image = "image"
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class EditProfileComponent implements OnInit {

  constructor(private profileService: ProfileService, 
            private languageService: LanguageService, 
            private messageService: MessageService,
            private languagePipe: LanguagePipe,
            private location: Location) {

  }

  
  public selectedLanguage = this.languageService.getSelectedLanguage();
  public nationalityList: LookupNationalities[] = [];
  public cityList: LookupCities[] = [];
  public areaList: LookupAreas[] = [];
  public genderList = GenderList;
  public imageSrc = USER_IMAGE_Path;

  private profilePictureFile: File;
  private selectedFiles: File[] = [];

  createUserForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    birthDate: new FormControl(null, Validators.required),

    email: new FormControl(null, [Validators.required, Validators.email]),
    gender: new FormControl(null, Validators.required),

    mobileNumber: new FormControl(null, [Validators.required,Validators.pattern(PHONENUMBER_PATTERN),Validators.minLength(10), Validators.maxLength(10)]),

    city: new FormControl(null, Validators.required),
    area: new FormControl(null, Validators.required),
    nationality: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    alternateEmail: new FormControl(null, Validators.email),
  });

  submitted: boolean = false;

  validation:boolean = false;
  showPassword:boolean = false;
  data : any = {iconPath: ADD_ICON_Path}
  
  
  
  editMode = true;
  fileList = [];

  ngOnInit(): void {



    this.getCityList();
    this.getNationalityList();

    this.getUserProfile();
  }

  

  getNationalityList() {
    this.profileService.getNationalities().subscribe(result => {
      this.nationalityList = result;
    });
  }

  getCityList() {
    this.profileService.getCities().subscribe(result => {
      this.cityList = result;
    })
  }

  getAreaList(cityId) {
    this.profileService.getAreas(cityId).subscribe(result => {
      this.areaList = result;
    })
  }

  getUserProfile() {
    this.profileService.getProfile().subscribe(result => {
      

      // TODO : set the profile image from blob storage
      // TODO : set the AttachmentList from blob storage

      this.createUserForm.setValue({
        firstName: result.profile.firstName,
        lastName: result.profile.lastName,
        birthDate: result.profile.birthDate,
        email: result.email,
        address: result.profile.address,
        gender: result.profile.gender,
        mobileNumber: result.phoneNumber,
        alternateEmail: result.profile.alternativeEmail,
        city: result.profile.area.cityId,
        area: result.profile.areaId,
        nationality: result.profile.nationalityId
      });
      
      var dtString = result.profile.birthDate.substring(0, 10);
      let dtStringArr = dtString.split('-');



      this.createUserForm.controls['birthDate'].setValue({
        year: Number(dtStringArr[0]),
        month: Number(dtStringArr[1]) - 1,
        day: Number(dtStringArr[2])
      });

      this.getAreaList(result.profile.area.cityId);

    })
  }

  showImage(event:any) {
    if (event.target.files && event.target.files[0]) {

        this.profilePictureFile = event.target.files[0];
        var reader = new FileReader();
        reader.onload = (event:any) => {
            this.imageSrc = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }
  }

  filesDropped(files: any): void {
    if (files && files[0]) {
      for (let i = 0; i < files.length; i++) {
        this.pushFile(files[i].file)
      }
    }
    else
      this.pushFile(files.file)
  }

  pushFile(file: any) {
    let temp: PushedFile = new PushedFile()
    temp.name = file.name
    var reader = new FileReader();
    reader.readAsDataURL(file);

    if (file.type.indexOf(AcceptedFileTypes.Image) > -1) {
      temp.type = AcceptedFileTypes.Image;
    } else if(file.type.indexOf(AcceptedFileTypes.Pdf) > -1 ) {
      temp.type = AcceptedFileTypes.Pdf;
    }


    let fileTypeValues = Object.values(AcceptedFileTypes);
    if(fileTypeValues.includes(temp.type as unknown as AcceptedFileTypes)) {
      this.fileList.push(temp);
      this.selectedFiles.push(file)
    }
  }

  onFileInput(files: any): void {
    for (let i = 0; i < files.length; i++) {
      this.pushFile(files[i])
    }
  }

  save() {
    this.validation = !this.createUserForm.valid;
    if (this.createUserForm?.invalid) return;

    let birthDateValue = this.createUserForm.get("birthDate").value;
    let birthDate = new Date(birthDateValue.year, birthDateValue.month, birthDateValue.day);

    

    const userProfileSaveAPIModel: UserProfileSaveAPIModel = {
      firstName: this.createUserForm.get("firstName").value,
      lastName: this.createUserForm.get("lastName").value,
      birthDate:  birthDate.toDateString(),
      address: this.createUserForm.get("address").value,
      gender:  this.createUserForm.get("gender").value,
      alternateEmail: this.createUserForm.get("alternateEmail").value,
      area: this.createUserForm.get("area").value,
      nationalityId: this.createUserForm.get("nationality").value,
      profilePicture: this.profilePictureFile,
      attachments: this.selectedFiles,
    }

    
    this.profileService.saveProfile(userProfileSaveAPIModel).subscribe(result => {
      this.messageService.success(this.languagePipe.transform("profileSavedSuccessfully"));
    })
    
  }

  public backClicked() {
    this.location.back();
  }
  
}

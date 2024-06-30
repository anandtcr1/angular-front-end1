export class SignUp {
    password:string;
    displayName:string;
    email:string;
    phoneNumber:string;
    
    constructor(){

    }
}

export interface SignUpResponse {
    id:string,
    displayName:string,
    email:string,
    phoneNumber:string,
    twoFactorEnabled:boolean,
}

export class SignIn {
    password:string;
    email:string;

    constructor(){

    }
}

export interface SignInResponse {
    token:string,
    expiration:Date,
}

export class ForgotPasswordConfirmation {
  email:string;
  token:string;
  password:string;
  confirmPassword:string;
  constructor() {
    
  }
}

export class ForgotPassword {
  email:string;
  resetPasswordUrl:string;
  constructor() {
    
  }
}

export class User {
    constructor(public username: string, private _token: string, private _tokenExpirationDate: Date) {
    }
  
    get token() {
      if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        return '';
      }
  
      return this._token;
    }
  }
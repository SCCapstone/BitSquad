import { Injectable } from '@angular/core';
import { Account } from 'src/acoount';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  constructor() { }
  currentUser:any;
  uid: any;
  setuid(uid: any){ // method to set user uid
    this.uid = uid
  }
  getUID(){// method to get use uid
    return this.uid;
  }
  setCurrentUser(email:string){
    this.currentUser = email
  }
  getCurrentUserEmail(){
    return this.currentUser
  }
  setViaLocalStorage(){
    this.currentUser = localStorage.getItem('email');
    this.uid = localStorage.getItem('uid');
  }
}

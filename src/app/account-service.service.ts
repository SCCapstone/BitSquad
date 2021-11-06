import { Injectable } from '@angular/core';
import { Account } from 'src/acoount';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  constructor() { }
  currentUser = "deep";
  setCurrentUser(email:string){
    this.currentUser = email
  }
  getCurrentUserEmail(){
    return this.currentUser
  }
}

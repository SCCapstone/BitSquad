import { Injectable } from '@angular/core';
import { Account } from 'src/account';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { userData } from '../model/userData';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private datadoc: AngularFirestoreCollection<userData>;
  data:any; // just set the variable to type any

  constructor(private afs: AngularFirestore) { 
    //below is the way that I found viable to get the documents under a certain collection
    this.datadoc = afs.collection('userData');
    this.datadoc.valueChanges().subscribe(data=>{
      this.data = data;
    });
  }
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
    console.log(this.uid);
  }
  getAnalytics(){
    var temp:any;
    this.data.forEach((element: any) => {
      if(element.uid == this.uid) // then search for the specific documents that belongs to the current user
      temp = element
      console.log(temp)
    });
    return temp;
  }
}

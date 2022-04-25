import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { ProcessService } from './process.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  [x: string]: any;
  userData:any; // just set the variable to type any

  constructor(private afs: AngularFirestore, private processService: ProcessService) {

  }
  currentUser:any;
  uid: any;
  createUserData(){
    this.afs.collection('userData').doc(this.uid).set({
      data: {},
      total:0,
      uid: this.uid
    })
  }

  pullUserDataFromFireBase(){
    // this can be use only if the document uid = user uid
    this.afs.collection('userData').doc(this.uid).valueChanges().subscribe(data=>{
      this.userData = data
    })

  }
  setuid(uid: any){ // method to set user uid
    this.uid = uid
  }
  getUID(){// method to get use uid
    return this.uid;
  }
  // set variable currentUser
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
  getAnalytics(){ //the the essential data for analytics use
    //console.log(this.userData)
    return this.userData;

  }
  /**
   * 
   * @param timeToAdd how many second need to be added to the usage data
   */ 
  updateAnalytics(timeToAdd:number){ // when timer is up, call this function to push timer data to firebase
    var processUsage = 0
    let name: string = this.processService.getProcessName()
    var tmp = 'data.'+name

    if(Object.keys(this.userData.data).length == 0){
      //console.log("empty")
    }
    else{
    Object.entries(this.userData.data).map(([key,value])=>{
      if(key == this.processService.getProcessName()){
        processUsage = value as number
      }
    })
  }

    // this is how to update the document, this one is a little special because the userData has a map
    //console.log("pushing time: "+timeToAdd+" name: "+this.processService.getProcessName()+" to the uid: "+this.uid+" to the document: "+this.uid)
    this.afs.collection('userData').doc(this.uid).update({
      [tmp]:  processUsage+timeToAdd, // map update, notice [] which allows you to use a varibale as the path
      total: this.userData.total + timeToAdd
    })

  }


}

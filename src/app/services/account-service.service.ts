import { Injectable } from '@angular/core';
import { Account } from 'src/account';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { userData } from '../model/userData';
import { ProcessService } from './process.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
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

    // below is not useful because found a way to set the user uid to document uid 
    // but the method below is still useful if you do not know the uid of the document that you want to query
     // so I left them as comments here for reference

        //below is the way that I found viable to get documents by its field
        /*this.afs.collection('userData',ref =>ref.where('uid', '==',this.uid)).valueChanges().subscribe(data =>{
          console.log(this.uid)
          console.log(data)
          this.userData = data[0] // this actually returns a array of documents although in this case the size of array is one
        });*/

    // basically the snapshotChanges will return an array of DocumentChangeAction which are actually the metadata of your document
    // notice that afs.collection('userData', ref => ref.where('uid', '==', this.uid)) returns not a single document but an array of documents
    // in this case the it will return an array with size of 1
    // be aware that each element of the array that snapshotChanges() return is also an array which actually I did not understand
    // but I looked into the data structure and find out the following way to get the id of the document you want
    /*
    this.afs.collection('userData', ref => ref.where('uid', '==', this.uid)).snapshotChanges().forEach(a =>{
      this.docId = a[0].payload.doc.id
    })
    */
  }
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
  getAnalytics(){ //the the essential data for analytics use
    console.log(this.userData)
    return this.userData;
    
  }
  updateAnalytics(){ // when timer is up, call this function to push timer data to firebase
    var valueToPush = 0
    let name: string = this.processService.getProcessName()
    var tmp = 'data.'+name 
    
    if(Object.keys(this.userData.data).length == 0){
      console.log("empty")
    }
    else{
    Object.entries(this.userData.data).map(([key,value])=>{
      if(key == this.processService.getProcessName()){
        valueToPush = value as number
      }
    })
  }

    // this is how to update the document, this one is a little special because the userData has a map
    console.log("pushing time: "+this.processService.getTimer()+" name: "+this.processService.getProcessName()+" to the uid: "+this.uid+" to the document: "+this.uid)
    this.afs.collection('userData').doc(this.uid).update({
      [tmp]:  valueToPush+this.processService.getTimer(), // map update, notice [] which allows you to use a varibale as the path
      total: this.userData.total + this.processService.getTimer()
    })
    
  }

  createBlankLimits() {
    this.afs.collection('limits').doc(this.uid).set({
      uid: this.uid,
      weeklyLimitH: 0,
      weeklyLimitM: 0,
      
      monLimitH: 0,
      monLimitM: 0,
      
      tuesLimitH: 0,
      tuesLimitM: 0,

      wedLimitH: 0,
      wedLimitM: 0,

      thursLimitH: 0,
      thursLimitM: 0,

      friLimitH: 0,
      friLimitM: 0,

      satLimitH: 0,
      satLimitM: 0,

      sunLimitH: 0,
      sunLimitM: 0,
    })
  }
}
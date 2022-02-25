import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { from, Observable } from "rxjs";
import { AccountService } from "./account-service.service";
import { Limits } from "../model/limits";

@Injectable({
  providedIn: 'root'
})
export class LimitsService {
  
  private afsPath = '/limits';
  uid:any


  constructor(private afs: AngularFirestore, private accountService: AccountService) {
    this.uid = this.accountService.getUID();
  }

  loadLimitsByUserID(uid: any) {
    console.log("Uid passed to limits: "+ uid);
    return this.afs.collection(this.afsPath, ref => ref.where("uid", "==", uid))
       .snapshotChanges();
  }


  createBlankLimits(uid: any) {
    this.afs.collection(this.afsPath).doc(uid).set({
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

  updateLimits(valChanges: Partial<Limits>): Observable<any> { 
    
    return from(this.afs.collection(this.afsPath).doc(this.accountService.getUID()).update(valChanges));
  }

  getLimits() {
    return this.afs.collection('limits').doc(this.uid).snapshotChanges();
  }
}
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


  constructor(private afs: AngularFirestore, private accountService: AccountService) {
  }

  /**
   * Retrieves user's daily/weekly limits from firebase
   * @param uid the user's id
   * @returns array of documents that match the query that can be subscribed to
   */
  loadLimitsByUserID(uid: any) {
    return this.afs.collection(this.afsPath, ref => ref.where("uid", "==", uid))
       .snapshotChanges();
  }


  /**
   * Creates a firestore document for a new user to add weekly and daily limits
   * All limits initialized to zero
   * @param uid unique id of newly created user 
   */
  createBlankLimits(uid: any) {
    this.afs.collection(this.afsPath).doc(uid).set({
      uid: uid,
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

  /**
   * Writes updates to firebase in limits collection
   * @param valChanges Limit properties to write to firebase
   * @returns throws error if write unsuccessful
   */
  updateLimits(valChanges: Partial<Limits>): Observable<any> { 
    return from(this.afs.collection(this.afsPath).doc(this.accountService.getUID()).update(valChanges));
  }
}
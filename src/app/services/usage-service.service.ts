import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class UsageService {
  
  private afsPath = '/Usage';


  constructor(private afs: AngularFirestore) {
  }

  /**
   * Retrieves user's daily/weekly limits from firebase
   * @param userID the user's id
   * @returns array of documents that match the query that can be subscribed to
   */
   loadUsageByUserID(userID: any) {
       console.log(userID + " USER ID WAS PASSED")
    return this.afs.collection(this.afsPath, ref => ref.where("userID", "==", userID))
       .snapshotChanges();
  }

  /**
   * Creates a firestore document for a new user to add daily and weekly usage
   * All usages initialized to zero
   * @param userID the user's id
   * @param lastLogin month, day of last login
   * @param lastLoginWeek week number of last login
   */
  createBlankUsage(userID: any, lastLogin:string, lastLoginWeek:string) {
      this.afs.collection(this.afsPath).doc(userID).set({
          userID: userID,
          dailyHours: 0,
          dailyMins: 0,
          weeklyHours: 0,
          weeklyMins: 0,
          lastLogin: lastLogin,
          lastLoginWeek: lastLoginWeek
      })
  }

  /**
   * Writes updates to firebase in usage collection
   * @param userID id to write to firebase
   * @param dH dailyHours to write to firebase
   * @param dM dailyMins to write to firebase
   * @param wH weeklyHours to write to firebase
   * @param wM weeklyMins to write to firebase
   * @param lastLogin month, day to write to firebase
   * @param lastLoginWeek week number of the year to write to firebase
   */
   updateUsage(userID:any, dH:number, dM:number, wH:number, wM:number, lastLogin:string, lastLoginWeek:string) { 
    this.afs.collection(this.afsPath).doc(userID).set({
        userID: userID,
        dailyHours: dH,
        dailyMins: dM,
        weeklyHours: wH,
        weeklyMins: wM,
        lastLogin: lastLogin,
        lastLoginWeek: lastLoginWeek 


    })
  }

}
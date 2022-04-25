import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Process } from '../model/process';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  private afsPath = '/Processes';
  timer = 0; //timer data stores here
  currentProcess:any; // stores the name of the current running process
  constructor(private afs: AngularFirestore) {}

  getProcessDoc(id: any) {
    return this.afs.collection(this.afsPath).doc(id).valueChanges();
  }

  /** matches userID in firebase to user's ID stored in cache at time of login;
   *allows only processes belonging to a particular user to be displayed
   */
  getProcessList(id: any) {
    return this.afs
      .collection(this.afsPath, (ref) => ref.where('userID', '==', id))
      .snapshotChanges();
  }

  /** creates a new Firestore document with a unique id that is the same as the process id,
   * which makes it easy to find the correct document and edit or delete it
   */
  createProcess(p: Process) {
    this.afs
      .collection(this.afsPath)
      .doc(p.processID)
      .set({
        userID: p.userID,
        processID: p.processID,
        processName: p.processName,
        timeLimitH: p.timeLimitH,
        timeLimitM: p.timeLimitM,
        warning1: p.warning1,
        warning2: p.warning2,
        warning3: p.warning3
      })
      .then(() => {
        console.log('process added with id: ' + p.processID);
      })
      .catch((error) => {
        console.error('Error creating process: ', error);
      });
  }

  setTimer(time: any) {
    this.timer = time;
    console.log('setTime' + this.timer);
    this.timer
  }
  getTimer() {
    return this.timer;
  }
  getProcessName(){
    return this.currentProcess;
  }
  getUID(p: Process){
    return p.userID;
  }

  /**locates the document at given path and deletes it */
  deleteProcess(p: Process) {
    console.log('Process to delete has ID: ' + p.processID);
    return this.afs.collection(this.afsPath).doc(p.processID).delete();
  }

  updateProcess(p: Process, id: any) {
    console.log("process:"+p.processName);
    console.log("id: "+p.processID);


    return this.afs.collection(this.afsPath).doc(id).update({
      processName: p.processName,
      timeLimitH: p.timeLimitH,
      timeLimitM: p.timeLimitM,
      warning1: p.warning1,
      warning2: p.warning2,
      warning3: p.warning3
    });
  }
  setCurrentProccess(process:any){
    this.currentProcess = process
  }
}

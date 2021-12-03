import {Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import {Process} from '../model/process';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  private afsPath = '/Processes';
  timer = 0;
  constructor(private afs: AngularFirestore) {}

  getProcessDoc(id: any) {
    return this.afs.collection(this.afsPath).doc(id).valueChanges();
  }

  getProcessList() {
    return this.afs.collection(this.afsPath).snapshotChanges();
  }
  createProcess(p: Process) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(this.afsPath).add(p)
      .then(response => {
        console.log(response);
      },
      error => reject(error));
      })
    }
    setTimer(time: any){
      this.timer = time
      console.log("setTime"+this.timer)
    }
    getTimer(){
      return this.timer
    }
    deleteProcess(p: Process) {
      return this.afs.collection(this.afsPath).doc(p.id).delete();
    }

    updateProcess(p:Process, id:any) {
      return this.afs.collection(this.afsPath).doc(id).update({
        processName: p.processName,
        timeLimit: p.timeLimit,
        warnings: p.warnings
      });
    }

  }

import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account-service.service';
import { Process } from '../model/process';
import { ProcessService } from '../services/process.service';


@Component({
  selector: 'process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.scss']
})
export class ProcessTableComponent implements OnInit{
  user = "";
  Process: Process[] = [];
  columnsToDisplay: string[] = ['processName', 'timeLimit', 'warnings', 'actions'];
  limit:number = 0;

  constructor (private accountService: AccountService, private processService: ProcessService,
     ) { 

  }

  ngOnInit(): void { // a basic use of service page. each time user enter this page it will obtain user info from accountService
    
    this.user = this.accountService.getCurrentUserEmail();
    this.processService.getProcessList(localStorage.getItem('uid')).subscribe(res => {
      this.Process = res.map( e => {
        return {
        userID : e.payload.doc.id,
        ...e.payload.doc.data() as{}
      } as Process;
    })
    });
  }
  
  removeProcess (p:Process) {
    console.log("RemoveProcess called");
    if(confirm("Are you sure you want to delete "+ p.processName+ " ?")){
      this.processService.deleteProcess(p);
    }
  }

  //not needed anymore
  getHours(value:number): number {
    if (value >= 3600) {
      return Math.floor((value/3600));
    } else {
      return 0;
    }

  }
  //not needed anymore
  getMinutes(value:number): number {
    if (value >= 60) {
      return Math.floor((value % 3600 / 60));
    } else {
      return 0;
    }
  }

  getTotalSeconds(valueH:number, valueM:number): number {
    if (valueH >= 0 && valueM >= 0 ) {
      return (valueH*3600) + (valueM*60);
    } else {
      return 0;
    }

  }

  onStart(time:number, name:any): void {
    this.processService.setTimer(time) 
    this.processService.setCurrentProccess(name)
    //this.timerStart.changeTime2();
    // set timer value to the service
  }

  onDelete(p: Process) {
    console.log(p.processName + " clicked to delete");

  }

}

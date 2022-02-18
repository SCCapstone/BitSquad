import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account-service.service';
import { Process } from '../model/process';
import { ProcessService } from '../services/process.service';
import { TimerStartComponent } from '../timer-start/timer-start.component';



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

  constructor (private accountService: AccountService, private processService: ProcessService,  public timerStartComponent: TimerStartComponent, 
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

  onStart(time:number): void {
    this.processService.setTimer(time)
    //***THIS ACTUALLY STARTS TIMER***
    this.changeTime2();
    
  }

  
  onDelete(p: Process) {
    console.log(p.processName + " clicked to delete");

  }

  status ='TIME TO PLAY';
  realTime = -1;

  changeTime(val:string)
  {
    this.realTime=this.getTime(val)
  }

  changeTime2()
  {
    this.realTime = this.processService.getTimer(); // get timer from service
    //console.log(this.realTime)
    console.log("called changeTime2");
    console.log(this.realTime);
  }

  resetToZero()
  {
    this.realTime = 0;
  }
  getTime(val:string)
  {
    console.warn(val)
    return parseInt(val)
  }

  sendNotification() {
    var notification = new Notification("test", {body: "Time is up"});
    console.log("Notification attempted to send");
  }

  handleEvent1(event: { action: string; }){
    if(event.action == 'done'){
    
      if(this.status == 'ENJOY YOUR TIME')
      {
        this.sendNotification();
        //alert("EXITING NOW");
      }
      this.status = 'TIME IS UP';
    }
    else {
      this.status = 'ENJOY YOUR TIME';
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account-service.service';
import { Process } from '../model/process';
import { ProcessService } from '../Services/process.service';
import { TimerStartComponent} from '../timer-start/timer-start.component';


@Component({
  selector: 'process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.scss']
})
export class ProcessTableComponent implements OnInit{
  timer = new TimerStartComponent;
  user = "";
  Process: Process[] = [];
  columnsToDisplay: string[] = ['processName', 'timeLimit', 'warnings', 'actions'];

  limit:number = 0;

  constructor (private accountService: AccountService, private processService: ProcessService, ) { 

  }

  ngOnInit(): void { // a basic use of service page. each time user enter this page it will obtain user info from accountService
    
    this.user = this.accountService.getCurrentUserEmail();
    this.processService.getProcessList().subscribe(res => {
      this.Process = res.map( e => {
        return {
        id : e.payload.doc.id,
        ...e.payload.doc.data() as{}
      } as Process;
    })
    });
  }

  removeProcess (p:Process) {
    if(confirm("Are you sure you want to delete "+ p.processName+ " ?")){
      this.processService.deleteProcess(p);
    }
  }
  getHours(value:number): number {
    if (value >= 3600) {
      return parseInt((value/3600).toFixed(0));
    } else {
      return 0;
    }

  }
  getMinutes(value:number): number {
    let remainder:number = value % 3600;
    
    return parseInt((remainder / 60).toFixed(0));
  }

  onStart(time:number): void {
    this.timer.changeTime2(time);
  }


// <button (click)="changeTime(box2.value)">Start Session</button>

  // onSubmit() {
  //   this.processService.form.value.processList = this.processList;
  //   let data = this.processService.form.value;
  //
  //   this.processService.createProcess(data)
  //     .then(res => {
  //       console.log("success");
  //     });
  // }



}

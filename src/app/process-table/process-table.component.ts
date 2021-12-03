import { Component, OnInit } from '@angular/core';
import { PROCESSES } from 'src/db-data';
import { AccountService } from '../account-service.service';
import { Process } from '../model/process';
import { ProcessService } from '../Services/process.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.scss']
})
export class ProcessTableComponent implements OnInit {
  user = "";
  dataArray: any [] = PROCESSES;
  Process: Process[] = [];
  columnsToDisplay: string[] = ['processName', 'timeLimit', 'warnings', 'actions'];

  limit:number = 0;

  constructor(private accountService: AccountService,
              private processService: ProcessService) { }

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
    if (value >= 60) {
      return value/60;
    } else {
      return 0;
    }

  }

  getMinutes(value:number): number {
    return value % 60;
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

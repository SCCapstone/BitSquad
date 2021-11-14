import { Component, OnInit } from '@angular/core';
import { PROCESSES } from 'src/db-data';
import { AccountService } from '../account-service.service';

@Component({
  selector: 'process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.scss']
})
export class ProcessTableComponent implements OnInit {
  user = "";
  dataArray: any [] = PROCESSES;
  columnsToDisplay: string[] = ['processName', 'timeLimit', 'warnings'];
  limit:number = 0;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void { // a basic use of service page. each time user enter this page it will obtain user info from accountService
    this.user = this.accountService.getCurrentUserEmail();
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



}

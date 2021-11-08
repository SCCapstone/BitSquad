import { Component, OnInit } from '@angular/core';
import { PROCESSES } from 'src/db-data';


@Component({
  selector: 'process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.scss']
})
export class ProcessTableComponent implements OnInit {

  dataArray: any [] = PROCESSES;
  columnsToDisplay: string[] = ['processName', 'timeLimit', 'warnings'];
  limit:number = 0;

  constructor() { }

  ngOnInit(): void {
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

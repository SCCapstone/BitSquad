import { Component, OnInit } from '@angular/core';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { CountdownComponent } from 'ngx-countdown';
import { ProcessService } from '../Services/process.service';


@Component({
  selector: 'timer-start',
  templateUrl: './timer-start.component.html',
  styleUrls: ['./timer-start.component.css']
})


export class TimerStartComponent implements OnInit {


  title = 'Capstone';
  displayVal=0;
  displayTime='';
  dT = 0;
  realTime=-1;
  status ='TIME TO PLAY';

  
  changeTime(val:string)
  {
    console.warn(val)
    this.displayTime=val
    this.realTime=this.getTime(val)
    this.dT = this.realTime
  }

  changeTime2()
  {
    this.realTime = this.processService.getTimer(); // get timer from service
      console.log(this.realTime)
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

  constructor(private processService: ProcessService) { 
    this.title = 'Capstone';
    this.displayVal=0;
    this.displayTime='';
    this.dT = 0;
    this.realTime=-1;
    this.status ='TIME TO PLAY';
  }


  ngOnInit(): void {
  }

  handleEvent1(event: { action: string; }){
    if(event.action == 'done'){
    
      if(this.status == 'ENJOY YOUR TIME')
      {
        alert("EXITING NOW");
      }
      this.status = 'TIME IS UP';
    }
    else {
      this.status = 'ENJOY YOUR TIME';
    }
  }

}
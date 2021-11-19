import { Component, OnInit } from '@angular/core';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { CountdownComponent } from 'ngx-countdown';



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
  realTime=0;
  status ='TIME TO PLAY';

  getValue(val:string)
  {
    console.warn(val)
    this.displayVal=this.getVowelCount(val) 
  }
  getVowelCount(val:string)
  {
    return (val.match(/[aeiou]/gi) || []).length;
  }
  changeTime(val:string)
  {
    console.warn(val)
    this.displayTime=val
    this.realTime=this.getTime(val)
    this.dT = this.realTime
  }

  changeTime2(val:number)
  {
      this.realTime = val
  }
  getTime(val:string)
  {
    console.warn(val)
    return parseInt(val)
  }

  constructor() { }


  ngOnInit(): void {

  }

  handleEvent1(event: { action: string; }){
    if(event.action === 'notify'){
      console.log('Hi!');
      this.status = 'PLEASE PREPARE TO EXIT GAME';
    }
  }


  
  
  
}
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account-service.service';
import { Process } from '../model/process';
import { ProcessService } from '../services/process.service';
import { UserPageComponent } from '../user-page/user-page.component';
import { TimerStartComponent } from '../timer-start/timer-start.component';
import { getCurrencySymbol, getLocaleDayNames } from '@angular/common';
import { mixinColor } from '@angular/material/core';
import { baseColors } from 'ng2-charts';
import { R3TargetBinder } from '@angular/compiler';


@Component({
  selector: 'process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.scss']
})
export class ProcessTableComponent implements OnInit{
  user = "";
  Process: Process[] = [];
  replicateProcess: Process[] = [];
  columnsToDisplay: string[] = ['processName', 'timeLimit', 'warnings', 'actions'];
  limit:number = 0;
  filterKey:any;
  options = {
    greater: false,
    equal:false,
    less:false
  }
  constructor (private accountService: AccountService, private processService: ProcessService, private userPage: UserPageComponent
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
  restore(){
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
  setOption(boxName:string){
    if(boxName == 'less'){
      if(this.options.less == false)
        this.options.less = true
      else
        this.options.less = false
    } else if(boxName == 'greater'){
      if(this.options.greater == false)
        this.options.greater = true
      else
        this.options.greater = false
    } else if(boxName == 'equal'){
      if(this.options.equal == false)
        this.options.equal = true
      else
        this.options.equal = false
    } 
    console.log(this.options)
  }
  filter(key:string){
    let temp: Process[] = [];
    let keys = key.split(":");
    if(keys[0] == '') {
      return;
    }
    console.log(keys)
    if(this.options.less == false && this.options.equal == false && this.options.greater == false)
    return;
    else
    if(this.options.less == true){
      if(parseInt(keys[0])> 0) {
      this.Process.forEach(p=>{
        if(p.timeLimitH < parseInt(keys[0]))
        temp.push(p);
      })
    } else if(parseInt(keys[1])> 0){
      this.Process.forEach(p=>{
        if(p.timeLimitM < parseInt(keys[1]) && p.timeLimitH == 0)
        temp.push(p);
      })
    }
    
    }
    if(this.options.greater == true){
      if(parseInt(keys[0])> 0) {
      this.Process.forEach(p=>{
        if(p.timeLimitH > parseInt(keys[0]))
        temp.push(p);
      })
    } else if(parseInt(keys[1])> 0){
      this.Process.forEach(p=>{
        if(p.timeLimitM > parseInt(keys[1]) && p.timeLimitH == 0)
        temp.push(p);
      })
    }
    
    }
    if(this.options.equal == true){
      if(parseInt(keys[0])> 0) {
      this.Process.forEach(p=>{
        if(p.timeLimitH == parseInt(keys[0]))
        temp.push(p);
      })
    } else if(parseInt(keys[1])> 0){
      this.Process.forEach(p=>{
        if(p.timeLimitM == parseInt(keys[1]) && p.timeLimitH == 0)
        temp.push(p);
      })
    }
    
    }
    console.log(temp)
    this.Process = temp
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
    //***THIS ACTUALLY STARTS TIMER***
    this.changeTime2();
    
  }

  
  onDelete(p: Process) {
    console.log(p.processName + " clicked to delete");

  }

  status ='TIME TO PLAY';
  realTime = -1;
  mycolor = '#19E606'
  changeTime(val:string)
  {
    this.realTime=this.getTime(val)
  }

  changeTime2()
  {
    this.realTime = this.processService.getTimer(); // get timer from service
      //checks if user hasn't used more time than allowed for particular day
      if(this.cumulativeTime == this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM)) 
      {
        this.status = 'USED UP TIME ALLOWANCE FOR THE DAY';
         this.sendNotification() //"Time up for day"
      }
      //checks if user tries to start a process's timer that will run over the daily allowance
      else if(this.cumulativeTime + this.processService.getTimer() > this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM))
      {
        this.realTime = this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM) - this.cumulativeTime;
        //send notification that you only have (X) amount of valid time left and the timer has been adjusted
      }
      //otherwise set timer as normal
      else 
      {
        this.realTime = this.processService.getTimer(); // get timer from service
      }
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

  
  //variable to keep track of cumulative usage
  cumulativeTime = 0;
  cumulativeMins = 0;
  cumulativeHours = 0;

  //changes homepage appearance based on daily time limit being reached
  //sends notification
  changeDisplay() 
  {
    if(this.cumulativeTime == this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM)) 
      {
        this.mycolor = '#E60606'
        this.status = 'USED UP TIME ALLOWANCE FOR THE DAY';
        this.sendNotification() //"Time up for day"
      }
  }

  handleEvent1(event: { action: string; }){
    if(event.action == 'done'){
    
      if(this.status == 'ENJOY YOUR TIME')
      {
         //updates cumulativeTime, sends notifcation of time expiration, updates analytics
         this.cumulativeTime += this.realTime;

         this.cumulativeHours = this.getHours(this.cumulativeTime);
         this.cumulativeMins = this.getMinutes(this.cumulativeTime);
         console.log(this.cumulativeTime);
          this.sendNotification();
          //alert("EXITING NOW");
          this.accountService.updateAnalytics() // update analytics data
      
        if(this.cumulativeTime != this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM)) 
        {
          this.resetToZero();
        }
        this.changeDisplay()
      }
    }
    else {
      this.status = 'ENJOY YOUR TIME';
    }
  }

}

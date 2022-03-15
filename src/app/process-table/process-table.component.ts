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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditFormComponent} from '../edit-form/edit-form.component';





Notification.requestPermission().then(function(result) {
  console.log(result);
});

function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch(e) {
    return false;
  }

  return true;
}


function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Time is up!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Time is up!");
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}


@Component({
  selector: 'process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.scss']
})


export class ProcessTableComponent implements OnInit{
  user = "";
  userID:any;
  Process: Process[] = [];
  replicateProcess: Process[] = [];
  columnsToDisplay: string[] = ['processName', 'timeLimit', 'warnings', 'actions'];
  limit:number = 0;
  filterKey:any;
  searchKey:any;
  options = {
    greater: false,
    equal:false,
    less:false
  }
  
  
  constructor (private accountService: AccountService, private dialog: MatDialog, private processService: ProcessService, private userPage: UserPageComponent
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

  editProcess(p: Process) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      ...p   //copies data from given process
    };

    this.dialog.open(EditFormComponent, dialogConfig)
    .afterClosed()
      .subscribe(values => {

          this.processService.updateProcess(values, p.processID)
        }
        );
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
        else if(p.timeLimitH == parseInt(keys[0]) && p.timeLimitM < parseInt(keys[1]))
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
        else if(p.timeLimitH == parseInt(keys[0]) && p.timeLimitM > parseInt(keys[1]))
        temp.push(p);
      })
    } else if(parseInt(keys[1])> 0){
      this.Process.forEach(p=>{
        if(p.timeLimitM > parseInt(keys[1]) || p.timeLimitH > 0)
        temp.push(p);
      })
    }

    }
    if(this.options.equal == true){
      if(parseInt(keys[0])> 0) {
      this.Process.forEach(p=>{
        if(p.timeLimitH == parseInt(keys[0]))
        temp.push(p);
        else if(p.timeLimitH == parseInt(keys[0]) && p.timeLimitM == parseInt(keys[1]))
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

  searchProcesses(searchStr:string) {
    let results: Process[] = [];
    searchStr = searchStr.toLowerCase();

    this.Process.forEach(p=> {
      if (p.processName.toLowerCase().indexOf(searchStr) >= 0) results.push(p);
    });
    this.Process = results;
  }

  removeProcess (p:Process) {
    console.log("RemoveProcess called");
    if(confirm("Are you sure you want to delete "+ p.processName+ " ?")){
      this.processService.deleteProcess(p);
    }
  }

  getHours(value:number): number {
    if (value >= 3600) {
      return Math.floor((value/3600));
    } else {
      return 0;
    }

  }
  
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
  mycolor = '#00E676;'
  changeTime(val:string)
  {
    this.realTime=this.getTime(val)
  }
  
  changeTime2()
  {
    //this.realTime = this.processService.getTimer(); // get timer from service
      //checks if user hasn't used more time than allowed for particular day
      if(this.cumulativeTime == this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM))
      {
        this.status = 'USED UP TIME ALLOWANCE FOR THE DAY'
      }
      //checks if user tries to start a process's timer that will run over the daily allowance
      else if(this.cumulativeTime + this.processService.getTimer() > this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM))
      {
        this.realTime = this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM) - this.cumulativeTime;
        //send notification that you only have (X) amount of valid time left and the timer has been adjusted
        alert("Timer set to remaining time allowance")
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


  //variable to keep track of cumulative usage
  cumulativeTime = 0;
  cumulativeMins = 0;
  cumulativeHours = 0;

  //changes homepage appearance based on daily time limit being reached
  //sends notification
  changeDisplay(): boolean
  {
    if(this.cumulativeTime == this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM))
      {
        this.mycolor = '#E60606'
        this.status = 'USED UP TIME ALLOWANCE FOR THE DAY';
        return true;
      }
      return false;
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

       
          //this.sendNotification();  
          notifyMe();
          //alert("Process Finished");
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

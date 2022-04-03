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

<<<<<<< HEAD


Notification.requestPermission().then(function(result) {
  console.log(result);
});
=======
// request permission on page load
document.addEventListener('DOMContentLoaded', function() {
  if (!Notification) {
   alert('Desktop notifications not available in your browser. Try Chromium.');
   return;
  }

  if (Notification.permission !== 'granted')
   Notification.requestPermission();
 });
>>>>>>> branavan


 function notifyMe() {
  if (Notification.permission !== 'granted')
   Notification.requestPermission();
  else {
   var notification = new Notification('Notification title', {
    body: 'Time is up!',
   });

<<<<<<< HEAD
  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

=======
  }
 }
>>>>>>> branavan








@Component({
  selector: 'process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.scss']
})


export class ProcessTableComponent implements OnInit{
  currentProcess ="no process is running"
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
  stop = false;

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
<<<<<<< HEAD
=======


  sortAlphabetic(){

    var temp = this.Process.sort(function(a, b){
      if(a.processName[0].toLowerCase() < b.processName[0].toLowerCase()) { return -1; }
      if(a.processName[0] > b.processName[0]) { return 1; }
      return 0;
  })
  console.log(temp)
  this.Process = [];
  // you HAVE to do this step to make the above sorting applied to Process
  temp.forEach(p =>{
    this.Process.push(p)
  })

  }
>>>>>>> branavan
  searchByEnter(event: { key: string; }){ // key event so that press enter can call search function
    if(event.key == "Enter"){
      this.searchProcesses(this.searchKey);
    }

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
    this.currentProcess = name;
    //***THIS ACTUALLY STARTS TIMER***
    this.changeTime2();
    this.stop = false;
<<<<<<< HEAD
    this.status = "ENJOY YOUR TIME"
=======

>>>>>>> branavan
  }


  onDelete(p: Process) {
    console.log(p.processName + " clicked to delete");

  }

<<<<<<< HEAD
  status ='TIME TO PLAY';
  realTime = -1;
=======

  realTime = 0;
>>>>>>> branavan
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
<<<<<<< HEAD
        this.status = 'USED UP TIME ALLOWANCE FOR THE DAY'
=======

>>>>>>> branavan
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
    this.stop = true; // update stop status here
    this.currentProcess ="no process is running"
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
      else{
        this.mycolor = '#00E676;'
<<<<<<< HEAD
        this.status ='TIME TO PLAY';
=======
>>>>>>> branavan

      }
      return false;
  }


  handleEvent1(event: { action: string; }){

    console.log(event.action+" "+this.stop) // strange enough, when click cancel, the event.action actually is "done"
<<<<<<< HEAD
    if(event.action == 'done' && this.stop == false){



      if(this.status == 'ENJOY YOUR TIME')
=======
    if(event.action == 'done' && this.stop == false)
    {
      console.log(this.realTime);
      //updates cumulativeTime, sends notifcation of time expiration, updates analytics
      this.cumulativeTime += this.realTime;

      this.cumulativeHours = this.getHours(this.cumulativeTime);
      this.cumulativeMins = this.getMinutes(this.cumulativeTime);
      console.log(this.cumulativeTime);
      this.accountService.updateAnalytics() // update analytics data

      //this.sendNotification();
      notifyMe();
      this.currentProcess = "no process is running";
      this.stop = true;
      //alert("Process Finished");


      if(this.cumulativeTime != this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM))
>>>>>>> branavan
      {
        notifyMe();
         //updates cumulativeTime, sends notifcation of time expiration, updates analytics
         this.cumulativeTime += this.realTime;
         this.cumulativeHours = this.getHours(this.cumulativeTime);
         this.cumulativeMins = this.getMinutes(this.cumulativeTime);
         console.log(this.cumulativeTime);


         this.accountService.updateAnalytics() // update analytics data
         this.stop = true;
          //alert("Process Finished");


        if(this.cumulativeTime != this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM))
        {
          this.resetToZero();
        }
        this.changeDisplay()
      }

    }
<<<<<<< HEAD
    else {
     // this.status = 'ENJOY YOUR TIME';
    }
=======
    else if(event.action === 'notify')
    {
      console.log("warnings are going")
    }


>>>>>>> branavan
  }

/**
 * Creates warning column display value based on how many warnings a process has (0-3)
 * @param process current process
 * @returns string of comma separated warnings
 */
  displayWarnings(process: Process) {
    if(process.warning1 == null) {
      return "";
    } else if(process.warning2 == null) {
      return process.warning1 + " mins";
    } else if(process.warning3 == null) {
      return (process.warning1+ ", " + process.warning2 + " mins");
    } else {
      return (process.warning1 + ", " + process.warning2 + ", "
                + process.warning3 + " mins")
    }
  }
}

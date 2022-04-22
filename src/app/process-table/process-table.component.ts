import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account-service.service';
import { Process } from '../model/process';
import { ProcessService } from '../services/process.service';
import { UserPageComponent } from '../user-page/user-page.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditFormComponent} from '../edit-form/edit-form.component';
;

document.addEventListener('DOMContentLoaded', function() {
  if (!Notification) {
   alert('Desktop notifications not available in your browser. Try Chromium.');
   return;
  }

  if (Notification.permission !== 'granted')
   Notification.requestPermission();
 });

 function AdjustedTimerNotifyMe(){
  if (Notification.permission !== 'granted')
  Notification.requestPermission();
 else {
  var notification = new Notification('BitSquad Notfifier', {
   body: 'Limit is less than requested time amount: Timer set to remaining time allowance',
  });

 }
}

 function WarningnNotifyMe(){
  if (Notification.permission !== 'granted')
  Notification.requestPermission();
 else {
  var notification = new Notification('BitSquad Notfifier', {
   body: 'Time is running out soon.....',
  });

 }
}

 function notifyMe() {
  if (Notification.permission !== 'granted')
   Notification.requestPermission();
  else {
   var notification = new Notification('BitSquad Notifier', {
    body: 'Time is up!',
   });

  }
 }

@Component({
  selector: 'process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.scss']
})


export class ProcessTableComponent implements OnInit{
  [x: string]: any;
  currentProcess ="no process is running";
  processRunning = false;
  timerText = "Start a Process Timer";
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
  buttonPressed = false;

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
        if(p.timeLimitH == parseInt(keys[0]) && p.timeLimitM == parseInt(keys[1]))
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

  sortByPopularity(){
    this.userData = this.accountService.getAnalytics();
    this.total = this.userData.total
    var temp = this.Process.sort(function(a,b){
      if(a.processName[0] < b.processName[0]) { return -1; }
      if(a.processName[0] > b.processName[0]) { return 1; }
      return 0;
  })


  console.log(temp)
  this.Process = [];
  // you HAVE to do this step to make the above sorting applied to Process
  temp.forEach((p: any) =>{
    this.Process.push(p)
  })

  }
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

  searchByEnter(event: { key: string; }){ // key event so that press enter can call search function
    if(event.key == "Enter"){
      this.searchProcesses(this.searchKey);
    }

  }
  setTimerText(){
    if (this.processRunning == true){
      this.timerText = "Enjoy your Time on " + this.currentProcess + "!";
    } else {
      this.timerText = "Start a Process Timer";
    }
  }


  searchProcesses(searchStr:string) {
    let results: Process[] = [];
    searchStr = searchStr.toLowerCase();
    if(searchStr == ""){
      this.restore();
    }
    else{
    this.Process.forEach(p=> {
      if (p.processName.toLowerCase().indexOf(searchStr) >= 0) results.push(p);
    });
    this.Process = results;
    }

    
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

  onStart(time:number, name:any, p:Process): void {
    this.processService.setTimer(time)
    this.processService.setCurrentProccess(name)
    this.currentProcess = name;
    this.processRunning = true;
    this.setTimerText();
    //***THIS ACTUALLY STARTS TIMER***

    this.changeTime2();
    this.stop = false;
    this.buttonPressed = true;
    if(p.warning1 != null)
    {
      this.warnList.push(p.warning1 * 60);
    }
    if(p.warning2 != null)
    {
      this.warnList.push(p.warning2 * 60);
    }
    if(p.warning3 != null)
    {
      this.warnList.push(p.warning3 * 60);
    }

  }


  onDelete(p: Process) {
    console.log(p.processName + " clicked to delete");

  }
  warnList:number[] = [];

  realTime = 0;
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

      }
      //checks if user tries to start a process's timer that will run over the daily allowance
      else if(this.cumulativeTime + this.processService.getTimer() > this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM))
      {
        this.realTime = this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM) - this.cumulativeTime;
        //send notification that you only have (X) amount of valid time left and the timer has been adjusted
        AdjustedTimerNotifyMe();
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
    this.processRunning = false;
    this.setTimerText();

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
        this.mycolor = '#f44336'
        return true;
      }
      else{
        this.mycolor = '#00E676;'

      }
      return false;
  }


  handleEvent1(event: { action: string; }){
    console.log(event.action+" "+this.stop) // strange enough, when click cancel, the event.action actually is "done"
    if(event.action == 'done' && this.stop == false)
    {
      console.log(this.realTime);
      //updates cumulativeTime, sends notifcation of time expiration, updates analytics
      this.cumulativeTime += this.realTime;

      this.cumulativeHours = this.getHours(this.cumulativeTime);
      this.cumulativeMins = this.getMinutes(this.cumulativeTime);
      console.log(this.cumulativeTime);
      if(this.processService.getProcessName() != null) {// make sure there is a process currently been tracking
      console.log(this.processService.getProcessName())
      this.accountService.updateAnalytics() // update analytics data
      }

      if(this.buttonPressed == true)
      {
        notifyMe();
      }
      //this.sendNotification();

      this.currentProcess = "no process is running";
      this.processRunning = false;
      this.setTimerText();

      this.stop = true;
      //alert("Process Finished");


      if(this.cumulativeTime != this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM))
      {
        this.resetToZero();
      }
      this.changeDisplay()
    }
    else if(event.action === 'notify')
    {
      WarningnNotifyMe();
      console.log("warnings are going")
    }


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

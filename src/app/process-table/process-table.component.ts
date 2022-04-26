import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../services/account-service.service';
import { Process } from '../model/process';
import { ProcessService } from '../services/process.service';
import { UserPageComponent } from '../user-page/user-page.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditFormComponent} from '../edit-form/edit-form.component';
import { CountdownEvent } from 'ngx-countdown';
import { Usage } from '../model/usage';
import { UsageService } from '../services/usage-service.service';
import { RemoveDialogComponent } from '../remove-dialog/remove-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ProcessFormComponent } from '../process-form/process-form.component';


const KEY = 'time'
const DEFAULT = '0'


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

 function WarningnNotifyMe(remaining:number){
  if (Notification.permission !== 'granted')
  Notification.requestPermission();
 else {
  var notification = new Notification('BitSquad Notfifier', {
   body: 'Time is running out soon:\n' + remaining + ':00 minute(s) left' 
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


export class ProcessTableComponent implements OnInit, AfterViewInit{
  //table variables
  dataSource!: MatTableDataSource<any>;
  columnsToDisplay: string[] = ['processName', 'timeLimit', 'warnings', 'actions'];

  [x: string]: any;
  timerText = "Start a Process Timer";
  Process: Process[] = [];
  usage: Usage[] = [];
  
  limit:number = 0;
  sortByTimeLimitKey = "up";
  options = {
    greater: false,
    equal:false,
    less:false
  }
  stop = false;
  buttonPressed = false;
  
  //allows for sorting data using Angular functions
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private accountService: AccountService, private editDialog: MatDialog, private removeDialog:MatDialog, private addDialog: MatDialog, public processService: ProcessService, private userPage: UserPageComponent, private usageService: UsageService
     ) {

  }

  processRunning = false;
  realTime = 25;
  timeToAdd = 0
  cumulativeMins = 0
  cumulativeHours = 0 
  cumulativeHoursWeek = 0
  cumulativeMinsWeek = 0

  lastLogin = ""
  lastLoginWeek = ""
  currentDate:any
  startDate:any
  
  ngOnInit(): void { // a basic use of service page. each time user enter this page it will obtain user info from accountService
    this.lastLogin = new Date().getMonth() + ", " + new Date().getDate()

    /***********************************************************************
     * Code snippet to find current week of the year
     * https://www.geeksforgeeks.org/calculate-current-week-number-in-javascript/
     */
    this.currentDate = new Date();
    this.startDate = new Date(this.currentDate.getFullYear(), 0, 1);
    var days = Math.floor((this.currentDate - this.startDate) /
        (24 * 60 * 60 * 1000));
          
    var weekNumber = Math.ceil(
        (this.currentDate.getDay() + 1 + days) / 7);
    /********************************************************************* */

    this.lastLoginWeek = weekNumber.toString()

    let value:string | null = DEFAULT
    
    if(localStorage.getItem(KEY) != null) {
    value = localStorage.getItem(KEY)  
    }
    
    this.testMethod(value)
    
    this.config = {...this.config, leftTime: value }

    if(value != DEFAULT) {
      
      this.processService.setCurrentProccess(localStorage.getItem("process"))
      
      console.log("on it setting current process now to: " + localStorage.getItem("process"))
      console.log(this.processService.getProcessName() + ": IS the new name")
      console.log("CURRENT PROCESS: " + this.currentProcess)

      this.reloadWarnings()

      this.buttonPressed = true

      this.processRunning = true
      this.currentProcess = this.processService.getProcessName()
      this.setTimerText()
    }
  
    

    this.user = this.accountService.getCurrentUserEmail();
    this.processService.getProcessList(localStorage.getItem('uid')).subscribe(res => {
      this.Process = res.map( e => {
        return {
        userID : e.payload.doc.id,
        ...e.payload.doc.data() as{}
      } as Process;
    })
    });

    this.usageService.loadUsageByUserID(localStorage.getItem('uid'))
    .subscribe(res => {
      this.usage = res.map( e => {
        return {
          userID : e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Usage;
      })
      console.log(localStorage.getItem('uid') + " IS THE ID")
      console.log(this.usage)
    
      this.cumulativeHours = this.usage[0].dailyHours
      this.cumulativeMins = this.usage[0].dailyMins
      this.cumulativeHoursWeek = this.usage[0].weeklyHours
      this.cumulativeMinsWeek = this.usage[0].weeklyMins

      if(this.usage[0].lastLogin != this.lastLogin) {
        
        this.usageService.updateUsage(localStorage.getItem('uid'), 0, 0, this.cumulativeHoursWeek, this.cumulativeMinsWeek, this.lastLogin, weekNumber.toString())
      }
      if(this.usage[0].lastLoginWeek != this.lastLoginWeek) {

        this.usageService.updateUsage(localStorage.getItem('uid'), 0, 0, 0, 0, this.lastLogin, weekNumber.toString())
      }
      
    });

  }

  testMethod(time:string|null) {
    if(time == null) {
      time = DEFAULT
    }
    else {
      this.changeTime(time)
    }
  }

  testMethod2(time:string|null) {
    if(time == null) {
      this.timeToAdd = 0
    }
    else {
      this.timeToAdd = parseInt(time)
    }
  }

  reloadWarnings() {
    if(localStorage.getItem("warn1") != null) {
      let warning1 = localStorage.getItem("warn1")
      this.warnList.push(parseInt(warning1!) * 60)
    }
    if(localStorage.getItem("warn2") != null) {
      let warning2 = localStorage.getItem("warn2")
      this.warnList.push(parseInt(warning2!) * 60)
    }
    if(localStorage.getItem("warn3") != null) {
      let warning3 = localStorage.getItem("warn3")
      this.warnList.push(parseInt(warning3!) * 60)
    }
  }

  //allows sorting and filtering of dynamic data without page refresh
  ngAfterViewInit(): void {
    this.processService.getProcessList(localStorage.getItem('uid')).subscribe(res => {
      this.Process = res.map( e => {
        return {
        userID : e.payload.doc.id,
        ...e.payload.doc.data() as{}
      } as Process;
    })
    this.dataSource = new MatTableDataSource(this.Process);
    this.dataSource.sort = this.sort;
    });
  }

  /**
   * Edits a process
   * @param p process to edit
   */
  editProcess(p: Process) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      ...p   //copies data from given process
    };

    this.editDialog.open(EditFormComponent, dialogConfig)
    .afterClosed()
      .subscribe(values => {

          this.processService.updateProcess(values, p.processID)
        }
        );
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
    //console.log(temp)
    this.dataSource.data = temp;
  }

  restore(){ // call this method to set the process table to default status
    this.user = this.accountService.getCurrentUserEmail();
    this.processService.getProcessList(localStorage.getItem('uid')).subscribe(res => {
      this.Process = res.map( e => {
        return {
        userID : e.payload.doc.id,
        ...e.payload.doc.data() as{}
      } as Process;
    })
      this.dataSource.data = this.Process;
    });
  }

  sortByTimeLimit(key:string){
    
    
    if(key == "down"){
      // sort popularity from most to least
    var temp = this.Process.sort(function(a,b){
      if(a.timeLimitH < b.timeLimitH) { return -1; }
      else if(a.timeLimitH == b.timeLimitH && a.timeLimitM < b.timeLimitM) {return -1} 
      if(a.timeLimitH > b.timeLimitH) { return 1; }
      else if(a.timeLimitH == b.timeLimitH && a.timeLimitM > b.timeLimitM) {return 1} 
      return 0;
  });
    } else{
      // sort popularity from least to most
      var temp = this.Process.sort(function(a,b){
        if(a.timeLimitH > b.timeLimitH) { return -1; }
        else if(a.timeLimitH == b.timeLimitH && a.timeLimitM > b.timeLimitM) {return -1} 
        if(a.timeLimitH < b.timeLimitH) { return 1; }
        else if(a.timeLimitH == b.timeLimitH && a.timeLimitM < b.timeLimitM) {return 1} 
        return 0;
    });
    }



  console.log(temp)
  this.Process = [];
  // you HAVE to do this step to make the above sorting applied to Process
  temp.forEach((p: any) =>{
    this.Process.push(p)
  })
  this.dataSource.data = this.Process;
  }
  
  /**
   * Dynamically filters process table by name based on user input
   * @param input partial or full name of process
   */
  searchProcesses(input: string) {
    this.dataSource.filter = input.trim().toLowerCase();
  }

  /**
   * Sets message display according to what process is active or not
   */
  setTimerText(){
    if (this.processRunning == true){
      this.timerText = "Enjoy your Time on " + this.processService.getProcessName() + "!";
    } else {
      this.timerText = "Start a Process Timer";
    }
  }

  onAddProcess() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    this.addDialog.open(ProcessFormComponent, dialogConfig); 
  }
  /**
   * Injects the process associated with the row on which the trash can button is clicked to the 
   * RemoveDialogComponent, which either cancels or performs the delete
   * @param p the process to delete
   */
  removeProcess (p:Process) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = p;
    
    this.removeDialog.open(RemoveDialogComponent, dialogConfig);
  }

  /**
   * Converts seconds into hours
   * @param value seconds to convert
   * @returns total hours 
   */
  getHours(value:number): number {
    if (value >= 3600) {
      return Math.floor((value/3600));
    } else {
      return 0;
    }

  }

  /**
   * Converts seconds into mintues
   * @param value  seconds to convert
   * @returns total minutes
   */
  getMinutes(value:number): number {
    if (value >= 60) {
      return Math.floor((value % 3600 / 60));
    } else {
      return 0;
    }
  }

  /**
   * Converts a combination of hours and mins to total amount of seconds
   * @param valueH hours to convert
   * @param valueM mins to convert
   * @returns total amount of seconds
   */
  getTotalSeconds(valueH:number, valueM:number): number {
    if (valueH >= 0 && valueM >= 0 ) {
      return (valueH*3600) + (valueM*60);
    } else {
      return 0;
    }
  }

  /**
   * Sets data of process being ran upon clicking the start button
   * Calls method to begin the countdown
   * @param time the time set of a process
   * @param name name of the process
   * @param p the process object
   */
  onStart(time:number, name:string, p:Process): void {
    localStorage.setItem("process", name)
    localStorage.setItem("timeToPush", time.toString())

    this.processService.setTimer(time)
    this.processService.setCurrentProccess(name)
    
    this.processRunning = true;
    this.setTimerText();
    
    this.stop = false;
    this.buttonPressed = true;

    // adding user specified warnings to array
    if(p.warning1 != null)
    {
      this.warnList.push(p.warning1 * 60);
      localStorage.setItem("warn1", p.warning1.toString())
    }
    if(p.warning2 != null)
    {
      this.warnList.push(p.warning2 * 60);
      localStorage.setItem("warn2", p.warning2.toString())
    }
    if(p.warning3 != null)
    {
      this.warnList.push(p.warning3 * 60);
      localStorage.setItem("warn3", p.warning3.toString())
    }
    //***THIS ACTUALLY STARTS TIMER***
    this.changeTime2();
  }


  onDelete(p: Process) {
    console.log(p.processName + " clicked to delete");

  }
  // array of warning numbers in minutes
  warnList:number[] = [];

  // green
  mycolor = '#00E676;'

  /**
   * Sets the clock time variable to a number taken in as a string
   * @param val string representing a time limit in seconds
   */
  changeTime(val:string)
  {
    this.realTime=this.getTime(val)
  }

  /**
   * Begins the countdown on the timer using the requested time of the process that the user chooses
   */
  changeTime2()
  {
      // checks if user tries to start a process's timer that will run over the daily allowance
      if(this.getTotalSeconds(this.cumulativeHours, this.cumulativeMins) + this.processService.getTimer() > this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM))
      {
        this.realTime = this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM) - this.getTotalSeconds(this.cumulativeHours, this.cumulativeMins);
        localStorage.setItem("timeToPush", this.realTime.toString())

        // send notification that you only have (X) amount of valid time left and the timer has been adjusted
        AdjustedTimerNotifyMe();
      }
      else if(this.getTotalSeconds(this.cumulativeHoursWeek, this.cumulativeMinsWeek) + this.processService.getTimer() > this.getTotalSeconds(this.userPage.weeklyH, this.userPage.weeklyM)) {
        this.realTime = this.getTotalSeconds(this.userPage.weeklyH, this.userPage.weeklyM) - this.getTotalSeconds(this.cumulativeHoursWeek, this.cumulativeMinsWeek);
        localStorage.setItem("timeToPush", this.realTime.toString())

        // send notification that you only have (X) amount of valid time left and the timer has been adjusted
        AdjustedTimerNotifyMe();
      }
      // otherwise set timer as normal by getting timer from service
      else
      {
        this.realTime = this.processService.getTimer(); // get timer from service
      }
    
    console.log("called changeTime2");
    console.log(this.realTime);
  }

  /**
   * resets timer to initial states
   */
  resetToZero()
  {
    this.realTime = 0;
    this.stop = true; // update stop status here
    this.currentProcess ="no process is running"
    this.processRunning = false;
    this.setTimerText();

  }
  /**
   * Converts a string of a time limit into a number
   * @param val a time in seconds as a string
   * @returns a number representing the time
   */
  getTime(val:string)
  {
    console.warn(val)
    return parseInt(val)
  }

  /**
   * Changes green timer-card appearance to red color based on daily time or weekly limit being reached
  //sends notification
   * @returns true upon color being changed to red
   */
  changeDisplay(): boolean
  {
    if(this.getTotalSeconds(this.cumulativeHours, this.cumulativeMins) >= this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM))
    {
      this.mycolor = '#f44336'
      return true;
    }
    if(this.getTotalSeconds(this.cumulativeHoursWeek, this.cumulativeMinsWeek) >= this.getTotalSeconds(this.userPage.weeklyH, this.userPage.weeklyM))
    {
      this.mycolor = '#f44336'
      return true;
    }
    else
    {
      this.mycolor = '#00E676;'
    }
      return false;
  }

  /**
   * Handles all events/actions of the timer upon starting, stopping, and finishing
   * Stores usage data based on process that has finished
   * @param event events of the Timer (done, notify, start, restart)
   */
  handleEvent1(event: CountdownEvent){
    console.log(event.action + " is the event")

    if (event.action === 'notify') {
      // Save current value
      localStorage.setItem(KEY, `${event.left / 1000}`);
      console.log(localStorage.getItem(KEY) + " is the key")
      console.log(this.warnList[0] + " is the array")

      if(this.warnList.includes(event.left/1000)) {
        WarningnNotifyMe(this.getMinutes(event.left/1000));
        console.log("warnings are going")
      }
    }

    console.log(event.action+" "+this.stop) // strange enough, when click cancel, the event.action actually is "done"
    if(event.action == 'done' && this.stop == false)
    {
      console.log(this.realTime);
      // updates cumulative hours and mins for day and week, sends notifcation of time expiration, updates analytics
      if(this.processService.getProcessName() != null) {// make sure there is a process currently been tracking
        console.log(this.processService.getProcessName())
        //this.accountService.updateAnalytics(this.timeToAdd) // update analytics data
      }

      if(this.buttonPressed == true)
      {
        this.stop = true;

        notifyMe();
        console.log("DONE NOTIFY HERE")
        localStorage.getItem("timeToPush")
        this.testMethod2(localStorage.getItem("timeToPush"))

        this.accountService.updateAnalytics(this.timeToAdd) // update analytics data

        this.cumulativeHours += this.getHours(this.timeToAdd)
        this.cumulativeMins += this.getMinutes(this.timeToAdd)

        this.cumulativeHoursWeek += this.getHours(this.timeToAdd)
        this.cumulativeMinsWeek += this.getMinutes(this.timeToAdd)

        this.usageService.updateUsage(localStorage.getItem('uid'), this.cumulativeHours, this.cumulativeMins,
                            this.cumulativeHoursWeek, this.cumulativeMinsWeek, this.lastLogin, this.lastLoginWeek)
      }
      

      this.currentProcess = "no process is running";
      this.processRunning = false;
      this.setTimerText();

      
  
      if(this.getTotalSeconds(this.cumulativeHours, this.cumulativeMins) < this.getTotalSeconds(this.userPage.dailyH, this.userPage.dailyM))
      {
        this.resetToZero();
      }
      this.changeDisplay()
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

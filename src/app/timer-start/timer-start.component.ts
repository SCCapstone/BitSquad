import { Component, OnInit } from '@angular/core';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { CountdownComponent } from 'ngx-countdown';
import { ProcessService } from '../services/process.service';


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
  sendNotifications(){
    var text = 'HEY! Your task is now overdue.';
    var notification = new Notification('Process time is done.', {body:"Pop"});
  }
  handleEvent1(event: { action: string; }){



  if(event.action == 'done'){

      if(this.status == 'ENJOY YOUR TIME')
      {
        Notification.requestPermission().then(function(result) {
          console.log(result);

        });

      this.status = 'TIME IS UP';
     // var img = '/to-do-notifications/img/icon-128.png';

       // alert("EXITING NOW");
      this.sendNotifications();

      }



    }

    else {
      this.status = 'ENJOY YOUR TIME';
    }
  }

}

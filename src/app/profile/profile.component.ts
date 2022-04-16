import { Component, OnInit , ViewChild} from '@angular/core';
import { AccountService } from '../services/account-service.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { userData } from '../model/userData';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];
  statement = "No data yet"
  total:any;
  showing = "seconds";
  user:any;
  userData:any;
  test:any;
  uid:any;
  data:number[] = []
  labels:string[] = []
  visible = false; // this boolean variable controls the visibility of unit convert button
  constructor(private router: Router,private toolbar:MatToolbarModule, private accountService: AccountService) {

  }


  ngOnInit(): void {

    this.user = this.accountService.getCurrentUserEmail()
    this.uid= this.accountService.getUID();
    this.userData = this.accountService.getAnalytics();
    this.total = this.userData.total
    const map:Map<String,Number> = this.userData.data;

    // map operation example here
    Object.values(map).map(value =>{ // you have to do this way to keys and values from a map
      this.data.push(value)
    })
    Object.keys(map).map(key =>{ // same as above
      this.labels.push(key)
    })
    if(this.total > 0){ // switch view when there exist analytics data
      this.statement = "Total usage: " + this.total+" "+this.showing;
      this.visible = true;
    }
  }
  profile(){
    this.router.navigate(['profile'])
  }
  home(){
    this.router.navigate(['user-page'])
  }



  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'left', // change legend position here
      },
      datalabels: {
        display:false // disabled the data label
        /*
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
        */
      },
      
    }
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.labels, // labels here
    datasets: [ {
      data: this.data // data, now is the real data
    } ]
  };

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }

    convert():void{
      if(this.showing == 'seconds'){
        this.showing = 'minutes'
        this.pieChartData.datasets[0].data.forEach((val,dataIndex) =>{
          this.pieChartData.datasets[0].data[dataIndex] =+ (val / 60).toFixed(2)
        })
        this.total = (this.total / 60).toFixed(2)
      } else if(this.showing == 'minutes'){
        this.showing = 'hours'
        this.pieChartData.datasets[0].data.forEach((val,dataIndex) =>{
          this.pieChartData.datasets[0].data[dataIndex] =+ (val / 60).toFixed(2)
        })
        this.total = (this.total / 60).toFixed(2)
      } else if(this.showing == 'hours'){
        this.showing = 'seconds'
        this.pieChartData.datasets[0].data.forEach((val,dataIndex) =>{
          this.pieChartData.datasets[0].data[dataIndex] =+ (val * 3600).toFixed(2)
        })
        this.total = this.userData.total
      }
      this.statement = "Total usage: " + this.total+" "+this.showing; // update the statement
      this.chart?.update();
      this.chart?.render();
    }
    
}

import { Component, OnInit , ViewChild} from '@angular/core';
import { AccountService } from '../services/account-service.service';
import { ChartConfiguration, ChartData, ChartType, Chart} from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';;
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public pieChartType: ChartType = 'pie';
  public barChartType: ChartType = 'bar';
  public chartPlugins = [ DatalabelsPlugin ];
  statement = "No data yet"
  total:any;
  showing = "seconds";
  user:any;
  userData:any;
  test:any;
  uid:any;
  data:number[] = []
  labels:string[] = []
  timeUnit = "second";
  public barChart: Chart | undefined;
  visible = false; // this boolean variable controls the visibility of unit convert button
  constructor(private accountService: AccountService, private radioModule: MatRadioModule) {
    
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
      },
      
    }
  };
  public barChartOptions:ChartConfiguration['options']= {
    responsive:true,
    maintainAspectRatio:false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display:false // disabled the data label
      },
      
    }

  };
  public barChartData:ChartData<'pie', number[], string | string[]> = {
    labels: this.labels, // labels here
    datasets: [ {
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(0, 17, 77, 0.08)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      data: this.data // data, now is the real data
    } ]

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

    convert(unit:String):void{
      // convert time unit accordinng to the unit parameter
      switch(unit){
        case 'second': // convert minute or hour to second
          if(this.showing == 'minutes'){
            this.showing = 'seconds'
            this.pieChartData.datasets[0].data.forEach((val,dataIndex) =>{
              this.pieChartData.datasets[0].data[dataIndex] =+ (val * 60).toFixed(2)
            })
            this.total = this.userData.total // when converting any other time unit to seconds, just get the original data
          } else if(this.showing == 'hours'){
            this.showing = 'seconds'
            this.pieChartData.datasets[0].data.forEach((val,dataIndex) =>{
              this.pieChartData.datasets[0].data[dataIndex] =+ (val * 3600).toFixed(2)
            })
            this.total = this.userData.total 
          }
          break;
          case 'minute': // convert second or hour to minute
            if(this.showing == 'seconds'){
              this.showing = 'minutes'
              this.pieChartData.datasets[0].data.forEach((val,dataIndex) =>{
                this.pieChartData.datasets[0].data[dataIndex] =+ (val / 60).toFixed(2)
              }) // second to minute means /60
              this.total = (this.total / 60).toFixed(2) 
            } else if(this.showing == 'hours'){
              this.showing = 'minutes'
              this.pieChartData.datasets[0].data.forEach((val,dataIndex) =>{
                this.pieChartData.datasets[0].data[dataIndex] =+ (val * 60).toFixed(2)
              }) // hour to minute means *60
              this.total = (this.total * 60).toFixed(2)
            }
            break;
            case 'hour': // convert second or minute to hour
              if(this.showing == 'seconds'){
                this.showing = 'hours'
                this.pieChartData.datasets[0].data.forEach((val,dataIndex) =>{
                  this.pieChartData.datasets[0].data[dataIndex] =+ (val / 3600).toFixed(2)
                }) // second to hour means /3600
                this.total = (this.total / 3600).toFixed(2)
              } else if(this.showing == 'minutes'){
                this.showing = 'hours'
                this.pieChartData.datasets[0].data.forEach((val,dataIndex) =>{
                  this.pieChartData.datasets[0].data[dataIndex] =+ (val / 60).toFixed(2)
                }) // minute to hour means /60
                this.total = (this.total / 60).toFixed(2)
              } 
              break;
      }

      this.statement = "Total usage: " + this.total+" "+this.showing; // update the statement
      //update charts
      this.chart?.update();
      this.chart?.render();
      this.barChart?.update();
      this.barChart?.render();
    }
    
}

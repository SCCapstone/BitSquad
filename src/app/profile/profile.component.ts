import { Component, OnInit , ViewChild} from '@angular/core';
import { AccountService } from '../services/account-service.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { userData } from '../model/userData';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];
  total:any;
  showing = "seconds";
  user:any;
  userData:any;
  test:any;
  uid:any;
  data:number[] = []
  labels:string[] = [] 
  constructor(private accountService: AccountService) { }

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
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
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
          this.pieChartData.datasets[0].data[dataIndex] = val/60
        })
        this.total = this.total/60
      } else if(this.showing == 'minutes'){
        this.showing = 'hours'
        this.pieChartData.datasets[0].data.forEach((val,dataIndex) =>{
          this.pieChartData.datasets[0].data[dataIndex] = val/60
        })
        this.total = this.total/60
      } else if(this.showing == 'hours'){
        this.showing = 'seconds'
        this.pieChartData.datasets[0].data.forEach((val,dataIndex) =>{
          this.pieChartData.datasets[0].data[dataIndex] = val*3600
        })
        this.total = this.total*3600
      }
      console.log(this.pieChartData.datasets[0].data)
      this.chart?.update();
      this.chart?.render();
    }
}

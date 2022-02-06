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
  user:any;
  userData:any;
  test:any; 
  constructor(private accountService: AccountService) { }
  uid:any;
  data:number[] = []
  labels:string[] = []
  ngOnInit(): void {
    this.user = this.accountService.getCurrentUserEmail()

    this.uid= this.accountService.getUID();
    this.userData = this.accountService.getAnalytics();
    console.log(this.userData.total)
    const map:Map<String,Number> = this.userData.data;
    Object.values(map).map(value =>{ // you have to do this way to get keys and values from a map
      console.log(value)
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
}

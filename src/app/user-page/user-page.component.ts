import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { LimitsFormComponent } from '../limits-form/limits-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AccountService } from '../services/account-service.service';
import { Limits } from '../model/limits';
import { LimitsService } from '../services/limits.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})

export class UserPageComponent implements OnInit {
  limits: Limits[] = [];
  weeklyUsage:number = 0;
  dailyH:number = 0;
  dailyM:number = 0;
  weeklyH:number = 0;
  weeklyM: number = 0;
  limitType = '';
  user = '';

  constructor(private router: Router, private dialog: MatDialog,
    public accountService: AccountService, private limitsService: LimitsService) {

  }
  
  ngOnInit(): void {
    

    this.accountService.pullUserDataFromFireBase()
    this.user = this.accountService.getCurrentUserEmail();

    /**Maps values to Limits model, only one document should be found,
     * retrievable by using limits[0] */
    this.limitsService.loadLimitsByUserID(this.accountService.getUID())
      .subscribe(res => {

        this.limits = res.map(e => {
          return {
            uid: e.payload.doc.id,
            ...e.payload.doc.data() as{}
          } as Limits;
        })
        const today = new Date().getDay();
        
        this.dailyH = this.setHourLimitForToday(today, this.limits[0]);
        this.dailyM = this.setMinuteLimitForToday(today, this.limits[0]);
        this.weeklyH = this.limits[0].weeklyLimitH;
        this.weeklyM = this.limits[0].weeklyLimitM;
        
        //today is sunday and user has not logged in today
        if(today == 0 && localStorage.getItem('lastLogin') != "0") {
          //reset weekly
          this.accountService.resetWeeklyLimit();
        }
        else if(today != 0) {
          //set local weekly usage variable from firebase
          this.weeklyUsage = this.limits[0].weeklyLimitH*3600 + this.limits[0].weeklyLimitM*60;
        }
        

      });

  }
  
  /**
   * Logs the user out, empties local storage, routes to splash page
   */
  logOut(){
    const auth = getAuth();
    signOut(auth)
    .then(()=>{
      // clean local storage and route back to main page
      localStorage.clear();
      this.router.navigate(['main']);
    })
    .catch((error) =>{
      console.log(error)
    });
    window.location.reload(); // need to reload the webpage to reset everything
  }

  /**
   * Configures and opens a dialog box with the daily/weekly limits form (limits-form.ts)
   * Updates firebase when closed, if needed
   * @param limits the first (and only) document found during retrieval of user's limits
   */
  editLimits(limits: Limits) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      ...limits   //copies data from given limit, which is limits[0] in HTML
    };

    this.dialog.open(LimitsFormComponent, dialogConfig)
    .afterClosed()
      .subscribe(values => {
          this.limitsService.updateLimits(values)
        }
        );

  }

  /**
   * sets the daily hour variable depending on the day of the week
   * @param day the current day, 0 for Sunday, 1 for Monday
   * @param limits data from firebase for user's limits
   */
  setHourLimitForToday(day: number, limits: Limits) {

    switch (day) {
      case 0:
        return limits.sunLimitH;
      case 1:
        return limits.monLimitH;
      case 2:
        return limits.tuesLimitH;
      case 3:
        return limits.wedLimitH;
      case 4:
        return limits.thursLimitH;
      case 5:
        return limits.friLimitH;
      case 6:
        return limits.satLimitH;
      default:
        return 0;
    }
  }

  /**
   * sets the daily minute variable depending on the day of the week
   * @param day the current day, 0 for Sunday, 1 for Monday
   * @param limits data from firebase for user's limits
   */
   setMinuteLimitForToday(day: number, limits: Limits) {

    switch (day) {
      case 0:
        return limits.sunLimitM;
      case 1:
        return limits.monLimitM;
      case 2:
        return limits.tuesLimitM;
      case 3:
        return limits.wedLimitM;
      case 4:
        return limits.thursLimitM;
      case 5:
        return limits.friLimitM;
      case 6:
        return limits.satLimitM;
      default:
        return 0;
    }
  }

}

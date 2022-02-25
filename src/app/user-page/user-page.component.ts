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

  constructor(private router: Router, private dialog: MatDialog, public accountService: AccountService, private limitsService: LimitsService) {

  }

  ngOnInit(): void {
    this.accountService.pullUserDataFromFireBase()
    
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
      });
  }

  onAddProcess() {
    this.router.navigate(['process-form']);
  }
  profile(){
    this.router.navigate(['profile'])
  }
  logOut(){
    console.log("called logout")
    const auth = getAuth();
    signOut(auth).then(()=>{
      // clean local storage and route back to main page
      localStorage.clear();
      this.router.navigate(['main']);
    }).catch((error) =>{
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
    dialogConfig.autoFocus = true;
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
}


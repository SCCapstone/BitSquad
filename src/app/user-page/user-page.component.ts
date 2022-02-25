import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { LimitsFormComponent } from '../limits-form/limits-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AccountService } from '../services/account-service.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, public accountService: AccountService) { 
  }

  ngOnInit(): void {
    this.accountService.pullUserDataFromFireBase()
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

  openLimitDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
     
    }
    this.dialog.open(LimitsFormComponent, dialogConfig);

  }

 
}

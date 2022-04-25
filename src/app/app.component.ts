import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit{
  constructor(public router: Router, private analyticsDialog: MatDialog){}
  title = "bitsquad"
  ngOnInit(): void {
    console.log("navigated to main")
    this.router.navigate(['main'])
  }

profile(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = false;
  dialogConfig.closeOnNavigation = true;
  dialogConfig.disableClose = true;
  dialogConfig.width = "300%";
  dialogConfig.height = "max-content"
  this.analyticsDialog.open(ProfileComponent, dialogConfig)
}
home(){
  this.router.navigate(['user-page'])
}

about() {
  this.router.navigate(['about']);
}

signIn() {
  this.router.navigate(['sign-in'])
}

register() {
  this.router.navigate(['register'])
}

main() {
  this.router.navigate(['main']);
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



}

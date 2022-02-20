import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { AccountService } from '../services/account-service.service';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(private router: Router, private accountService: AccountService) {}

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
      this.accountService.clearUserData()
      console.log(this.accountService.userData)
      this.router.navigate(['main']);
    }).catch((error) =>{
      console.log(error)
    });
    window.location.reload(); // need to reload the webpage to reset everything
  }
}

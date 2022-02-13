import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account-service.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private acctService: AccountService){}

  ngOnInit(): void {
    if(localStorage.getItem('email') != null&&localStorage.getItem('uid')!=null) { // if this is true means that currently a user is logged in and she/he refreshes the page
      this.acctService.setViaLocalStorage(); // then set currentUser variable from localstorage
      this.acctService.pullUserDataFromFireBase();
      this.router.navigate(['user-page']) // and jump to the user page
      console.log(localStorage.getItem('email'));
    }
  }

  toSignIn(){
    this.router.navigate(['sign-in']) // this line redirect to sign in page
    //argument of function above must exists in Route in app-routing-module.ts
  }
  toRegPage(){
    this.router.navigate(['register'])// redirect to sign in page
  }

}

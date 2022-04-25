import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account-service.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private acctService: AccountService){

  }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    if(localStorage.getItem('email') != null&&localStorage.getItem('uid')!=null) { // if this is true means that currently a user is logged in and she/he refreshes the page
      this.acctService.setViaLocalStorage(); // then set currentUser variable from localstorage
      this.router.navigate(['user-page']) // and jump to the user page
    }
  }

  /**
   * Routes to sign-in page
   */
  toSignIn(){
    this.router.navigate(['sign-in'])
  }

  /**
   * Routes to registration page
   */
  toRegPage(){
    this.router.navigate(['register'])
  }

}

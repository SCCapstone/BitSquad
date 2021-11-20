import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {
  }

  toSignIn(){
    this.router.navigate(['sign-in']) // this line redirect to sign in page
    //argument of function above must exists in Route in app-routing-module.ts
  }
  toRegPage(){
    this.router.navigate(['register'])// redirect to sign in page
  }
}

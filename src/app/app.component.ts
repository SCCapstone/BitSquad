import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
<<<<<<< HEAD
export class AppComponent {
  title = 'research';

  
=======

export class AppComponent implements OnInit{
  constructor(private router: Router){}
  title = "bitsquad"
  ngOnInit(): void {
    console.log("navigated to main")
    this.router.navigate(['main'])
  }
>>>>>>> origin/crab
}

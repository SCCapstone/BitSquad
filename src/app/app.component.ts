import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private router: Router){}

  title = "bitsquad"
  ngOnInit(): void {
    console.log("navigated to main")
    this.router.navigate(['main'])
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'process-form',
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.scss']
})
export class ProcessFormComponent implements OnInit {
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onSetLimit() {
    this.router.navigate(['user-page']);
  }
}

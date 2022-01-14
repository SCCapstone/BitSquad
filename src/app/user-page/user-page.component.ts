import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  onAddProcess() {
    this.router.navigate(['process-form']);
  }
  profile(){
    this.router.navigate(['profile']);
  }
  logOut(){
    console.log("called logout")
    const auth = getAuth();
    signOut(auth).then(()=>{
      // clean local storage and route back to main page
      localStorage.setItem('email',"")
      localStorage.setItem('uid','')
      this.router.navigate(['main']);
      console.log("logged out")
    }).catch((error) =>{
      console.log(error)
    });
  }
}

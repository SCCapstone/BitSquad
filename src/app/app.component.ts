import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit{
  constructor(public router: Router){}
  title = "bitsquad"
  ngOnInit(): void {
    console.log("navigated to main")
    this.router.navigate(['main'])
  }

profile(){
  this.router.navigate(['profile'])
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

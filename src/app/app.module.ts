import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { initializeApp } from "firebase/app";
import {getAnalytics} from 'firebase/analytics';
<<<<<<< HEAD
import { ManualUserHomeComponent } from './manual-user-home/manual-user-home.component';
=======
>>>>>>> origin/crab
import { ProcessTableComponent } from './process-table/process-table.component';
import { TimerStartComponent} from './timer-start/timer-start.component';
import {MatTableModule} from '@angular/material/table';
import { CountdownModule } from 'ngx-countdown';
<<<<<<< HEAD
=======
import { UserPageComponent } from './user-page/user-page.component';
>>>>>>> origin/crab

const firebaseConfig = {
  apiKey: "AIzaSyBIKj9T8JeG5_gCO1kuBCwpbT2tTIo1I6c",
  authDomain: "bitsquad-5f2bf.firebaseapp.com",
  projectId: "bitsquad-5f2bf",
  storageBucket: "bitsquad-5f2bf.appspot.com",
  messagingSenderId: "153813992768",
  appId: "1:153813992768:web:390c61924ad7480e9466a5",
  measurementId: "G-J0W9J7H77Y"
};
const app = initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RegisterComponent,
<<<<<<< HEAD
    ManualUserHomeComponent,
    ProcessTableComponent,
    TimerStartComponent,
=======
    ProcessTableComponent,
    TimerStartComponent,
    UserPageComponent
>>>>>>> origin/crab
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    CountdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
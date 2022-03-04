import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { initializeApp } from "firebase/app";
import { getAnalytics } from 'firebase/analytics';
import { ProcessTableComponent } from './process-table/process-table.component';
import { TimerStartComponent } from './timer-start/timer-start.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatSortHeader } from '@angular/material/sort';
import { NgChartsModule } from 'ng2-charts';

import { environment } from "../environments/environment";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CountdownModule } from 'ngx-countdown';
import { UserPageComponent } from './user-page/user-page.component';
import { ProcessFormComponent } from './process-form/process-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';

const firebaseConfig = {
  apiKey: 'AIzaSyBIKj9T8JeG5_gCO1kuBCwpbT2tTIo1I6c',
  authDomain: 'bitsquad-5f2bf.firebaseapp.com',
  projectId: 'bitsquad-5f2bf',
  storageBucket: 'bitsquad-5f2bf.appspot.com',
  messagingSenderId: '153813992768',
};

const app = initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RegisterComponent,
    ProcessTableComponent,
    ProcessFormComponent,
    TimerStartComponent,
    UserPageComponent,
    ProfileComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    CountdownModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    BrowserAnimationsModule,
    NgChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

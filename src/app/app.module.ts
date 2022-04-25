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
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { NgChartsModule } from 'ng2-charts';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from "../environments/environment";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { YouTubePlayerModule } from '@angular/youtube-player';
// import { VideoComponent } from './video.component';
import {MatGridListModule} from '@angular/material/grid-list';

import { CountdownModule } from 'ngx-countdown';
import { UserPageComponent } from './user-page/user-page.component';
import { ProcessFormComponent } from './process-form/process-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { LimitsFormComponent } from './limits-form/limits-form.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditFormComponent } from './edit-form/edit-form.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';


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
    UserPageComponent,
    ProfileComponent,
    LimitsFormComponent,
    EditFormComponent,
    
    
    AboutComponent,
    MainComponent,
    RemoveDialogComponent,



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
    MatDialogModule,
    MatToolbarModule,
    MatSelectModule,
    MatTooltipModule,
    MatTabsModule,
    MatSortModule,
    CountdownModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    BrowserAnimationsModule,
    NgChartsModule,
    Ng2SearchPipeModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatRadioModule,
    YouTubePlayerModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

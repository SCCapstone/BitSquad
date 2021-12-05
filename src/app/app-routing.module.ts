// to enable routing, import here
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { ProcessTableComponent } from './process-table/process-table.component';
import { MainComponent } from './main/main.component';
import { importType } from '@angular/compiler/src/output/output_ast';
import { TimerStartComponent } from './timer-start/timer-start.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ProcessFormComponent } from './process-form/process-form.component';
// to enable routing, add route here
const routes: Routes = [
  {path: 'sign-in', component:SignInComponent},
  {path:'register', component: RegisterComponent},
  {path:'process-table',component:ProcessTableComponent},
  {path: 'main',component:MainComponent},
  {path: 'user-page', component:UserPageComponent},
  {path: 'timer-start', component:TimerStartComponent},
  {path: 'process-form', component:ProcessFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


//basically you set routes here and using this.router.navigate(['someroute']) in other .ts file
//you cannot route from app.component.html(at least I cannot because you have to write <router-outlet> in there), so I move everything there to a
//new page called main and set an automatic redirect on app.component.ts
//you can find some comments on main.component.ts to show how you routing in a function
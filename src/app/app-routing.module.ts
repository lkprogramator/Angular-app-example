import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AuthGuard } from './login-auth/guards/auth.guard';
import { LoginComponent } from './login-auth/components/login/login.component';
import {EmployeeViewComponent} from './pages/employee-view/employee-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: '**', pathMatch: 'full', redirectTo: 'login'},
  { path: 'employees/', component: EmployeeViewComponent, canActivate: [AuthGuard] }
];

/*
{path: '', pathMatch: 'full', redirectTo: 'employees/'},
  {path: '**', pathMatch: 'full', redirectTo: 'employees/'},
  {path: 'employees/', component: EmployeeViewComponent}
 */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [EmployeeViewComponent];
}

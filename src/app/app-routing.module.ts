import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AuthGuard } from './login-auth/guards/auth-guard';
import { LoginComponent } from './login-auth/components/login/login.component';
import {EmployeeViewComponent} from './pages/employee-view/employee-view.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeeViewComponent, canActivate: [AuthGuard] },
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [EmployeeViewComponent];
}

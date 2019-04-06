import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {EmployeeViewComponent} from './pages/employee-view/employee-view.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'employees/'},
  {path: '**', pathMatch: 'full', redirectTo: 'employees/'},
  {path: 'employees/', component: EmployeeViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [EmployeeViewComponent];
}

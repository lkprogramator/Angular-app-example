import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {LoginConfig} from './model/login-config';
import {ToastrNotificationModule} from '../toastr-notification/toastr-notification.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, ToastrNotificationModule
  ],
  exports: [
    LoginComponent
  ],
  entryComponents: [],
  providers: [LoginConfig]
})
export class LoginAuthModule {
}

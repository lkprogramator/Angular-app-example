import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BsDatepickerModule, BsDatepickerConfig} from 'ngx-bootstrap';
import {APP_INITIALIZER} from '@angular/core';
import {AppConfig} from './services/app-config.service';
import {LoggerModule} from './logger/logger.module';
import {LogConfig} from './logger/model/log-config';
import {CommonComponentsModule} from './common-components/common-components.module';
import {ToastrNotificationModule} from './toastr-notification/toastr-notification.module';

import {LoginAuthModule} from './login-auth/login-auth.module';
import {ErrorInterceptor} from './login-auth/interceptors/error-interceptor.service';
import {JwtInterceptor} from './login-auth/interceptors/jwt-interceptor.service';
import {LoginConfig} from './login-auth/model/login-config';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EmployeeListComponent} from './components/employee-list/employee-list.component';
import {EmployeeViewComponent} from './pages/employee-view/employee-view.component';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

export function getDatepickerConfig(): BsDatepickerConfig {

  const toDate = new Date();
  const fromDate = new Date();
  const employeeAgeTo = ((AppConfig.settings.date.employeeAgeTo) ? AppConfig.settings.date.employeeAgeTo : 70);
  const employeeAgeForm = ((AppConfig.settings.date.employeeAgeFrom) ? AppConfig.settings.date.employeeAgeFrom : 15);
  const dateFormat = ((AppConfig.settings.date.dateFormat) ? AppConfig.settings.date.dateFormat : 'DD.MM.YYYY');

  toDate.setFullYear(toDate.getFullYear() - employeeAgeTo);
  fromDate.setFullYear(fromDate.getFullYear() - employeeAgeForm);

  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: dateFormat,
    maxDate: fromDate,
    minDate: toDate,
    containerClass: 'theme-green'
  });
}
/*
// LoginConfig is not waiting for APP_INITIALIZER to resolve promise,replaced by use of values

export function getLoginConfig(): LoginConfig {
  console.log('config getLoginConfig', AppConfig.settings.login);
  return Object.assign(new LoginConfig(), {
    apiUrl: AppConfig.settings.login.apiUrl,
    loginPage: AppConfig.settings.login.loginPage,
    afterLogin: AppConfig.settings.login.afterLogin,
    localStorageKey: AppConfig.settings.login.localStorageKey
  });
}
*/
export function getLoginConfig(): LoginConfig {

  if (!AppConfig.settings) {
    console.log('LoginConfig AppConfig.settings not ready');
  }

  return Object.assign(new LoginConfig(), {
    apiUrl: 'http://localhost:3004/login',
    loginPage: '/login',
    afterLogin: '/employees',
    localStorageKey: 'currentUser'
  });
}

export function getLogConfig(): LogConfig {
  console.log('config getLogConfig', AppConfig.settings.logger);
  return Object.assign(new LogConfig(), {
    logger: AppConfig.settings.logger.logger,
    logWithDate: AppConfig.settings.logger.logWithDate,
    toConsole: AppConfig.settings.logger.toConsole,
    toServer: AppConfig.settings.logger.toServer
  });
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoggerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    CommonComponentsModule,
    ToastrNotificationModule,
    LoginAuthModule
  ],
  providers: [
    HttpClient,
    AppConfig,
    {provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppConfig], multi: true},
    NgbModule,
    {provide: BsDatepickerConfig, useFactory: getDatepickerConfig, deps: [AppConfig]},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: LoginConfig, useFactory: getLoginConfig, deps: [AppConfig]},
    {provide: LogConfig, useFactory: getLogConfig, deps: [AppConfig]}
],
  bootstrap: [AppComponent]
})
export class AppModule {
}

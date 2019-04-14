import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BsDatepickerModule, BsDatepickerConfig} from 'ngx-bootstrap';
import {APP_INITIALIZER} from '@angular/core';
import {AppConfig} from './services/app-config.service';
import {LoggerModule} from './logger/logger.module';
import {LogConfig} from './logger/model/log-config';
import {CommonComponentsModule} from './common-components/common-components.module';
import {ToastrNotificationModule} from './toastr-notification/toastr-notification.module';

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
  const employeeAgeForm = ((AppConfig.settings.date.employeeAgeForm) ? AppConfig.settings.date.employeeAgeForm : 15);
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

export function getLogConfig(): LogConfig {
  return Object.assign(new LogConfig(), {
    logger: AppConfig.settings.logging.logger,
    logWithDate: AppConfig.settings.logging.logWithDate,
    toConsole: AppConfig.settings.logging.toConsole,
    toServer: AppConfig.settings.logging.toServer
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
    ToastrNotificationModule
  ],
  providers: [
    HttpClient,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    }, NgbModule,
    {provide: BsDatepickerConfig, useFactory: getDatepickerConfig}, {provide: LogConfig, useFactory: getLogConfig }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

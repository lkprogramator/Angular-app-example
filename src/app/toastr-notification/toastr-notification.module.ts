import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

import {ToastrNotificationComponent} from './components/toastr-notification/toastr-notification.component';
import {ToastrNotificationService} from './services/toastr-notification.service';

@NgModule({
  declarations: [ToastrNotificationComponent],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [ToastrNotificationComponent],
  entryComponents: [ToastrNotificationComponent],
  providers: [ToastrNotificationService]
})
export class ToastrNotificationModule {
}

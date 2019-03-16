import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import {APP_INITIALIZER} from '@angular/core';
import {AppConfig} from './services/app-config.service';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

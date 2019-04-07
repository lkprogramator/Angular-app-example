import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {CommonComponentsModule} from './common-components/common-components.module';
import {ToastrNotificationModule} from './toastr-notification/toastr-notification.module';
import {LoginAuthModule} from './login-auth/login-auth.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, CommonComponentsModule, ToastrNotificationModule, LoginAuthModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});

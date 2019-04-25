import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import {LoginConfig} from '../../model/login-config';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const fakeLoginConfig = {
    apiUrl: 'https://example.com/login',
    loginPage: '/login',
    afterLogin: '/home',
    localStorageKey: 'currentUser'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent],
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule ],
      providers: [{provide: LoginConfig, useValue: fakeLoginConfig}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
  Username field
 */
  it('Username field validity', () => {
    const username = component.loginForm.controls['username'];
    expect(username.valid).toBeFalsy();
  });

  it('Username field validation not email', () => {
    component.loginForm.controls['username'].setValue('z');
    component.submitted = true;
    const username = component.loginForm.controls['username'];

    expect(username.valid).toBeFalsy();
  });

  it('Username field validation correct email', () => {
    component.loginForm.controls['username'].setValue('test@example.com');
    component.submitted = true;
    const username = component.loginForm.controls['username'];
    expect(username.valid).toBeTruthy();
  });

  it('Username field validation inputting numbers failed', () => {
    component.loginForm.controls['username'].setValue('666');
    component.submitted = true;
    const username = component.loginForm.controls['username'];
    expect(username.valid).toBeFalsy();
  });

  /*
  Password field
*/
  it('Password field validity', () => {
    const password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
  });

  it('Password field validation wrong length', () => {
    component.loginForm.controls['password'].setValue('z');
    component.submitted = true;
    const password = component.loginForm.controls['password'];

    expect(password.valid).toBeFalsy();
  });

  it('Password field validation correct', () => {
    component.loginForm.controls['password'].setValue('superSecretPassword');
    component.submitted = true;
    const password = component.loginForm.controls['password'];
    expect(password.valid).toBeTruthy();
  });

  /*
   Login form
   */
  it('Login Form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('Fill form to be valid', async(() => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password');
    expect(component.loginForm.valid).toBeTruthy();

  }));

  it('Fill form to be invalid', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue('test0example.nocom');
    component.loginForm.controls['password'].setValue(' ');
    expect(component.loginForm.valid).toBeFalsy();
  });

});

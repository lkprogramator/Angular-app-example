import {TestBed, tick, fakeAsync} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppConfig} from '../../services/app-config.service';
import {LoginConfig} from '../model/login-config';

describe('AuthenticationService', () => {

  let httpMock: HttpTestingController;
  let service: AuthenticationService;

  const fakeAppConfigSettings = {
    'api': {
      'url': 'http://localhost:3004',
      'employees': '/employees',
      'employeesParams': '?_sort=surname&_order=asc',
      'positions': '/positions'
    },
    'ibillboardApi': {
      'url': 'http://ibillboard.com/api',
      'positions': '/positions'
    },
    'logger': {
      'logger': true,
      'toConsole': true,
      'toApi': false
    },
    'date': {
      'dateFormat': 'dd.mm.yyyy',
      'employeeAgeTo': 70,
      'employeeAgeFrom': 15
    },
    'login': {
      'apiUrl': 'https://example.com/login',
      'loginPage': '/login',
      'afterLogin': '/home',
      'localStorageKey': 'currentUser'
    }
  };

  beforeEach(() => {

    AppConfig.settings = fakeAppConfigSettings;

    const fakeLoginConfig = {
      apiUrl: AppConfig.settings.login.apiUrl,
      loginPage: AppConfig.settings.login.loginPage,
      afterLogin: AppConfig.settings.login.afterLogin,
      localStorageKey: AppConfig.settings.login.localStorageKey
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: LoginConfig, useValue: fakeLoginConfig}]
    });

    service = TestBed.get(AuthenticationService);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform login correctly', fakeAsync(() => {

    const loginUrl = AppConfig.settings.login.apiUrl;
    const email = 'test@example.com';
    const password = 'testpassword';
    const token = 'eyJlbWFpbCI6Im9saXZpZXJAbWF.pbC5jb20iLCJpYXQiOjE1NTUzMzI2NjYsImV4cCI.6MTU1NTMzic3ViIjoiMTAwMCJ9';

    const responseObject = {
      'accessToken': token
    };
    const expectedResult = {
      'email': email,
      'password': password
    };

    service.login(email, password).subscribe(
      (receivedResponse: any) => {
        expect(receivedResponse).toEqual(responseObject);
      },
      (error: any) => {
      }
    );

    const requestWrapper = httpMock.expectOne(loginUrl);

    tick();

    expect(requestWrapper.request.method).toEqual('POST');
    expect(requestWrapper.request.body).toEqual(expectedResult);

    requestWrapper.flush(responseObject);
    httpMock.verify();
  }));

});

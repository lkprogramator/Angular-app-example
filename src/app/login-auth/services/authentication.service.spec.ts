import { TestBed, tick } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppConfig} from '../../services/app-config.service';

describe('AuthenticationService', () => {

 let httpMock: HttpTestingController;
  let service: AuthenticationService;

  const fakeAppConfigSettings = {
    'api': {
      'url': 'http://localhost:3004',
      'employees': '/employees',
      'employeesParams': '?_sort=surname&_order=asc',
      'logger': '/logger'
    },
    'ibillboardApi': {
      'url': 'http://ibillboard.com/api',
      'positions': '/positions'
    },
    'logging': {
      'logger': true,
      'toConsole': true,
      'toApi': false
    },
    'date': {
      'dateFormat': 'dd.mm.yyyy',
      'employeeAgeTo': 70,
      'employeeAgeForm': 15
    }
  };


  beforeEach(() => {

    AppConfig.settings = fakeAppConfigSettings;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });

    service = TestBed.get(AuthenticationService);
    httpMock = TestBed.get(HttpTestingController);
  });



  it('should be created', () => {
    // const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('should perform login correctly', (done) => {
   //  const service: AuthenticationService = TestBed.get(AuthenticationService);

    // Set up
    const url = 'https://example.com/login';
    const responseObject = {
      success: true,
      message: 'login was successful'
    };
    let response = null;
    // End Setup

    service.login('test@example.com', 'testpassword').subscribe(
      (receivedResponse: any) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = httpMock.expectOne({url: 'https://example.com/login'});
    requestWrapper.flush(responseObject);

    tick();

    expect(requestWrapper.request.method).toEqual('POST');
    expect(response.body).toEqual(responseObject);
    expect(response.status).toBe(200);
    done();
  });


});

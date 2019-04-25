import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {AppConfig} from './app-config.service';

import {IbillboardService} from './ibillboard.service';
import {LogConfig} from '../logger/model/log-config';

describe('IbillboardService', () => {

  let service: IbillboardService;
  let backend: HttpTestingController;

  const fakeAppConfigSettings = {
    'api': {
      'url': 'http://localhost:3004',
      'employees': '/employees',
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
      'apiUrl': 'https://example.com:3000/login',
      'loginPage': '/login',
      'afterLogin': '/home',
      'localStorageKey': 'currentUser'
    }
  };

  beforeEach(() => {
    AppConfig.settings = fakeAppConfigSettings;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IbillboardService, LogConfig]
    });

    service = TestBed.get(IbillboardService);
    backend = TestBed.get(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a collection of employees positions', () => {
    const positionsResponse = {
      'positions': ['web master', 'full-stack developer', 'front-end developer', 'sw admin', 'help desk', 'scrum master', 'product manager']
    };

    let response;
    spyOn(service, 'getPositions').and.returnValue(of(positionsResponse));

    service.getPositions().subscribe(res => {
      response = res;
    });

    expect(response).toEqual(positionsResponse);
  });

});

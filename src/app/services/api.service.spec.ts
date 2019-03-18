import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppConfig} from './app-config.service';

import { ApiService } from './api.service';

describe('ApiService', () => {

  let service: ApiService;
  let httpMock: HttpTestingController;

  const fakeAppConfigSettings = {
    'api': {
      'url': 'http://localhost:3004',
      'employees': '/employees',
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
    }};

  beforeEach(() => {

    AppConfig.settings = fakeAppConfigSettings;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

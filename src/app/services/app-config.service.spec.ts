import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {AppConfig} from './app-config.service';

describe('AppConfigService', () => {
  let service: AppConfig;
  let backend: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppConfig]
    });

    service = TestBed.get(AppConfig);
    backend = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load config json', (done) => {

    service.load();

    backend.expectOne(`assets/config/config.dev.json`);
    backend.verify();
    done();
  });

});

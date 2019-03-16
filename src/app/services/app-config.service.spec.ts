import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppConfig } from './app-config.service';

describe('AppConfigService', () => {
  let service: AppConfig;
  let backend: HttpTestingController;

  // beforeAll
  beforeAll(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppConfig]
    });

   // usersService = TestBed.get(AppConfig);
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
     // expect(AppConfig.settings).toEqual(userResponse);
      done();
    });


  it('tests that async / await works', async () => {

    function resolveAfter2Seconds(x) {

      return new Promise(resolve => {

        setTimeout(() => {

          resolve(x);

        }, 2000);

      });

    }

    async function add1(x) {

      const a = resolveAfter2Seconds(20);

      const b = resolveAfter2Seconds(30);

      return x + await a + await b;

    }

    const v = await add1(10);

    expect(v).toBe(60);

  });

});

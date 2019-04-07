import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { JwtInterceptor } from './jwt-interceptor.service';

describe('JwtInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: JwtInterceptor = TestBed.get(JwtInterceptor);
    expect(service).toBeTruthy();
  });
});

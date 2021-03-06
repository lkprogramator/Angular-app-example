import {TestBed} from '@angular/core/testing';
import {LoginConfig} from '../model/login-config';
import {ErrorInterceptor} from './error-interceptor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ErrorInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [LoginConfig]
  }));

  it('should be created', () => {
    const service: ErrorInterceptor = TestBed.get(ErrorInterceptor);
    expect(service).toBeTruthy();
  });
});

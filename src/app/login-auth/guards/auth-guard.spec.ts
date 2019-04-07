import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth-guard';

describe('Auth.GuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: AuthGuard = TestBed.get(AuthGuard);
    expect(service).toBeTruthy();
  });
});

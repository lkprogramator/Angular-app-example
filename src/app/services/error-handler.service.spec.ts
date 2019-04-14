import {TestBed} from '@angular/core/testing';

import {ErrorHandlerService} from './error-handler.service';
import {LogConfig} from '../logger/model/log-config';

describe('ErrorHandlerService', () => {

  let service: ErrorHandlerService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [],
      providers: [ErrorHandlerService, LogConfig]
    });

    service = TestBed.get(ErrorHandlerService);

  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  it('should handle Error', (done) => {

    const err = {'message': 'test error message'};
    const errResult = {point1: 'one', point2: 'two'};

    const result = service.handleError('test_handler_operation', errResult);

    result(err).subscribe(data => {
      expect(data).toEqual(errResult);
      done();
    });

    expect(result).toEqual(jasmine.any(Function));
  });

});

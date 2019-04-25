import {TestBed} from '@angular/core/testing';

import {LogService} from './log.service';
import {LogConfig} from '../model/log-config';

describe('LogService', () => {

  let service: LogService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [],
      providers: [LogService, LogConfig]
    });

    service = TestBed.get(LogService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log message', () => {
    spyOn(window.console, 'log');
    service.info('Test info() method');

    expect(window.console.log).toHaveBeenCalled();
  });
});

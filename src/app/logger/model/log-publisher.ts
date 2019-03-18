import {LogEntry} from './log-entry';
import {Observable} from 'rxjs';

export abstract class LogPublisher {
  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}

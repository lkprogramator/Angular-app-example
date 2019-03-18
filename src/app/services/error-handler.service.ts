import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { LogService } from '../logger/services/log.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private logger: LogService) { }

  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.logger.error(`${operation} failed: ${error.message}`, error);

      return of(result as T);
    };
  }

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AppConfig} from './app-config.service';
import {ErrorHandlerService} from './error-handler.service';
import {LogService} from '../logger/services/log.service';

@Injectable({
  providedIn: 'root'
})
export class IbillboardService {

  apiUrl = AppConfig.settings.ibillboardApi.url;
  positionsUrl = AppConfig.settings.ibillboardApi.positions;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService, private logger: LogService) {
  }

  getPositions(): Observable<IiBillboardPositions> {
    return this.http.get<IiBillboardPositions>(this.apiUrl + this.positionsUrl)
      .pipe(
        tap(_ => this.logger.info('fetched positions')),
        catchError(this.errorHandler.handleError<IiBillboardPositions>('getPositions', {'positions': []}))
      );
  }

}

export interface IiBillboardPositions {
  positions: string[];
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppConfig } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class IbillboardService {

  apiUrl = AppConfig.settings.ibillboardApi.url;
  positionsUrl = AppConfig.settings.ibillboardApi.positions;

  constructor(private http: HttpClient) { }

  getPositions (): Observable<IiBillboardPositions> {
    return this.http.get<IiBillboardPositions>(this.apiUrl + this.positionsUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<IiBillboardPositions>('getPositions', {'positions': []}))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
   // this.messageService.add(`HeroService: ${message}`);
    console.log('LOG message: ', message);
  }

}

export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}

export interface IiBillboardPositions {
    positions: string[];
}

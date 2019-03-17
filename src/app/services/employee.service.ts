import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Employee } from '../model/employee';
import { AppConfig } from './app-config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeesUrl = AppConfig.settings.api.url + AppConfig.settings.api.employees;

  constructor(private http: HttpClient) { }

  getAllEmployees (): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        tap(_ => this.log('fetched employees')),
        catchError(this.handleError<Employee[]>('getPositions', []))
      );
  }

  addEmployee (newEmployee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, newEmployee, httpOptions).pipe(
      tap((employee: Employee) => console.log(`added employee w/ id=${employee.id}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  updateEmployee (employee): Observable<any> {
    const url = `${this.employeesUrl}/${employee.id}`;
    return this.http.put(url, employee, httpOptions).pipe(
      tap(_ => console.log(`updated employee id=${employee.id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  deleteEmployee (id): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<Employee>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted employee id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
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

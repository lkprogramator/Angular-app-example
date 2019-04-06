import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {Employee} from '../model/employee';
import {AppConfig} from './app-config.service';
import {ErrorHandlerService} from './error-handler.service';
import {LogService} from '../logger/services/log.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeesUrl = AppConfig.settings.api.url + AppConfig.settings.api.employees;
  employeesUrlparams = AppConfig.settings.api.employeesParams;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService, private logger: LogService) {
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl + this.employeesUrlparams)
      .pipe(
        tap(_ => this.logger.info('fetched employees')),
        catchError(this.errorHandler.handleError<Employee[]>('getPositions', []))
      );
  }

  addEmployee(newEmployee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, newEmployee, httpOptions).pipe(
      tap((employee: Employee) => this.logger.info(`added employee w/ id=${employee.id}`)),
      catchError(this.errorHandler.handleError<Employee>('addEmployee'))
    );
  }

  updateEmployee(employee): Observable<any> {
    const url = `${this.employeesUrl}/${employee.id}`;
    return this.http.put(url, employee, httpOptions).pipe(
      tap(_ => this.logger.info(`updated employee id=${employee.id}`)),
      catchError(this.errorHandler.handleError<any>('updateEmployee'))
    );
  }

  deleteEmployee(id): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<Employee>(url, httpOptions).pipe(
      tap(_ => this.logger.info(`deleted employee id=${id}`)),
      catchError(this.errorHandler.handleError<Employee>('deleteEmployee'))
    );
  }

}

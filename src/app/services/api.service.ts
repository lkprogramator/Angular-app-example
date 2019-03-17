import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

}

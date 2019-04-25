import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {LoginConfig} from '../model/login-config';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public localStorageKey = this.loginConfig.localStorageKey;

  constructor(private http: HttpClient, private loginConfig: LoginConfig) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.localStorageKey)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

   login(username: string, password: string) {

    return this.http.post<any>(this.loginConfig.apiUrl, {'email': username, 'password': password})
      .pipe(
        tap((response) => {
            if (response && response.accessToken) {
              const user: User = new User();
              user.username = username;
              user.password = password;
              user.accessToken = response.accessToken;

              localStorage.setItem(this.localStorageKey, JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
            }

          }
        )
      );

  }

  logout() {
    localStorage.removeItem(this.localStorageKey);
    this.currentUserSubject.next(null);
  }
}

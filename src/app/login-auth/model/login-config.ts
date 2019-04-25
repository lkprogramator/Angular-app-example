export class LoginConfig {
  apiUrl: string;
  loginPage: string = '/login';
  afterLogin: string = '/home';
  localStorageKey: string = 'currentUser';
}

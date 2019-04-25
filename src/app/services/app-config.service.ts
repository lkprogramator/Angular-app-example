import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {

  static settings: IAppConfig;

  constructor(private http: HttpClient) {
  }

  load() {
    const jsonFile = `assets/config/config.${environment.name}.json`;

    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise()
        .then((response: IAppConfig) => {
        AppConfig.settings = <IAppConfig>response;
        resolve();
      }).catch((response: any) => {
        reject(`Could not load file'${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }

}

export interface IAppConfig {
  api: {
    url: string;
    employees: string;
    employeesParams?: string;
    positions: string;
  };
  ibillboardApi: {
    url: string;
    positions: string;
  };
  logger: {
    logger: boolean;
    logWithDate?: boolean;
    toConsole: boolean;
    toServer?: boolean;
    serverLoggingUrl?: string;
  };
  date: {
    dateFormat: string;
    employeeAgeFrom: number;
    employeeAgeTo: number;
  };
  login: {
    apiUrl: string;
    loginPage: string;
    afterLogin: string;
    localStorageKey: string;
  };
}

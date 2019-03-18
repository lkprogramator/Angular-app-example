import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {EmployeeService} from './employee.service';
import {Employee} from '../model/employee';
import {AppConfig} from './app-config.service';

describe('EmployeeService', () => {

  let service: EmployeeService;
  let httpMock: HttpTestingController;

  const fakeAppConfigSettings = {
    'api': {
      'url': 'http://localhost:3004',
      'employees': '/employees',
      'logger': '/logger'
    },
    'ibillboardApi': {
      'url': 'http://ibillboard.com/api',
      'positions': '/positions'
    },
    'logging': {
      'logger': true,
      'toConsole': true,
      'toApi': false
    }
  };

  beforeEach(() => {

    AppConfig.settings = fakeAppConfigSettings;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });

    service = TestBed.get(EmployeeService);
    httpMock = TestBed.get(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all employees', () => {
    const employeesResponse = [
      {
        id: '1',
        name: 'Jane',
        surname: 'Doe',
        position: 'Designer',
        dateOfBirth: '12.5.1994'
      },
      {
        id: '2',
        name: 'Bob',
        surname: 'Jonson',
        position: 'Developer',
        dateOfBirth: '23.8.1989'
      }
    ];

    let response;

    service.getAllEmployees().subscribe(employees => {
      response = employees;
      expect(response).toEqual(employeesResponse);
    });

    const req = httpMock.expectOne(service.employeesUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(employeesResponse);
    httpMock.verify();
  });

  it('should add new employee', () => {
    const employeesResponse = {
      id: '3',
      name: 'Tom',
      surname: 'Jerry',
      position: 'Designer',
      dateOfBirth: '12.5.1992'
    };

    const newEmployee: Employee = {
      id: null,
      name: 'Tom',
      surname: 'Jerry',
      position: 'Designer',
      dateOfBirth: '12.5.1992'
    };

    let response;

    service.addEmployee(newEmployee).subscribe(employees => {
      response = employees;
      console.log('add E response: ', response);
      expect(response).toEqual(employeesResponse);
    });

    const req = httpMock.expectOne(service.employeesUrl);
    expect(req.request.method).toEqual('POST');

    req.flush(employeesResponse);
    httpMock.verify();
  });

  it('should add new employee', () => {
    const employeesResponse = {
      id: '3',
      name: 'Tom',
      surname: 'Jerry',
      position: 'Designer',
      dateOfBirth: '12.5.1992'
    };

    const newEmployee = {
      name: 'Johny',
      surname: 'Jerry',
      position: 'Designer',
      dateOfBirth: '12.5.1992'
    };

    let response;

    service.addEmployee(newEmployee).subscribe(employees => {
      response = employees;
      console.log('add E response: ', response);
      expect(response).toEqual(employeesResponse);
    });

    const req = httpMock.expectOne(service.employeesUrl);
    expect(req.request.method).toEqual('POST');

    req.flush(employeesResponse);
    httpMock.verify();
  });

  it('should update employee', () => {

    const employee = {
      id: '3',
      name: 'Johny',
      surname: 'Henke',
      position: 'Designer',
      dateOfBirth: '12.5.1992'
    };


    let response;

    service.updateEmployee(employee).subscribe(updatedEmployee => {
      response = updatedEmployee;
      console.log('update E response: ', response);
      expect(response).toEqual(employee);
    });

    const req = httpMock.expectOne(service.employeesUrl + '/' + employee.id);
    expect(req.request.method).toEqual('PUT');

    req.flush(employee);
    httpMock.verify();
  });

  it('should delete employee', () => {

    const employee = {
      id: '3',
      name: 'Johny',
      surname: 'Henke',
      position: 'Designer',
      dateOfBirth: '12.5.1992'
    };

    let response;

    service.deleteEmployee(3).subscribe(deletedEmployee => {
      response = deletedEmployee;
      console.log('update E response: ', response);
      expect(response).toEqual(employee);
    });

    const req = httpMock.expectOne(service.employeesUrl + '/' + employee.id);
    expect(req.request.method).toEqual('DELETE');

    req.flush(employee);
    httpMock.verify();
  });


});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, ReactiveFormsModule, FormsModule, FormArray} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {ConfirmationDialogService} from '../../common-components/services/confirmation-dialog.service';

import {EmployeeListComponent} from './employee-list.component';

import {AppConfig} from '../../services/app-config.service';
import {EmployeeService} from '../../services/employee.service';
import {IbillboardService} from '../../services/ibillboard.service';
import {Employee} from '../../model/employee';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let employeeService: EmployeeService;
  let ibillboardService: IbillboardService;
  let confirmationDialogService: ConfirmationDialogService;
  let formBuilder: FormBuilder;

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
    },
    'date': {
      'dateFormat': 'dd.mm.yyyy',
      'employeeAgeTo': 70,
      'employeeAgeForm': 15
    }
  };

  beforeEach(async(() => {
    AppConfig.settings = fakeAppConfigSettings;
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      imports: [NgbModule.forRoot(), BsDatepickerModule.forRoot(), ReactiveFormsModule, FormsModule,
        HttpClientTestingModule, RouterTestingModule, CommonComponentsModule],
      providers: [FormBuilder, NgbModule, EmployeeService, IbillboardService, ConfirmationDialogService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    employeeService = TestBed.get(EmployeeService);
    ibillboardService = TestBed.get(IbillboardService);
    confirmationDialogService = TestBed.get(ConfirmationDialogService);
    formBuilder = TestBed.get(FormBuilder);

    // component.ngOnInit();

  }));

  afterEach(() => {
    component.employeeList = [];
    component.newEmployeeForm.reset();
    const control = <FormArray>component.employeesForm.get('employees');
    control.controls = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
    New Employee Form
   */
  // TODO https://codecraft.tv/courses/angular/unit-testing/model-driven-forms/
  it('new Employee Form invalid when empty', () => {
    expect(component.newEmployeeForm.valid).toBeFalsy();
  });

  it('Name field validity', () => {
    const name = component.newEmployeeForm.controls['name'];
    expect(name.valid).toBeFalsy();
  });

  it('Name field validation minLenght failed', () => {
    component.newEmployeeForm.controls['name'].setValue('z');
    const name = component.newEmployeeForm.controls['name'];

    expect(name.valid).toBeFalsy();
  });

  it('Name field validation minLenght pass', () => {
    component.newEmployeeForm.controls['name'].setValue('Sky');
    const name = component.newEmployeeForm.controls['name'];
    expect(name.valid).toBeTruthy();
  });

  it('Name field validation inputting numbers failed', () => {
    component.newEmployeeForm.controls['name'].setValue('666');
    const name = component.newEmployeeForm.controls['name'];
    expect(name.valid).toBeFalsy();
  });


// TODO https://codecraft.tv/courses/angular/unit-testing/model-driven-forms/#_field_errors
  it('Fill form to be valid', async(() => {
    expect(component.newEmployeeForm.valid).toBeFalsy();
    component.newEmployeeForm.controls['name'].setValue('Jack');
    component.newEmployeeForm.controls['surname'].setValue('The ripper');
    component.newEmployeeForm.controls['position'].setValue('boss');
    // component.newEmployeeForm.controls['dateOfBirth'].setValue(new  Date('Saturday, August 1, 1998 12:00:00 AM'));
    // component.newEmployeeForm.controls['dateOfBirth'].setValue({year: 1992, month: 10, day: 10});
    component.newEmployeeForm.controls['dateOfBirth'].setValue('2002-03-30T15:42:23.420Z');
    /*
        const inputDebugEl = fixture.debugElement.query(By.css('#newEmployeeBirthDate'));
        inputDebugEl.triggerEventHandler('input', {target: {value: '29-8-2001'}});
    */
    /*
        fixture.whenStable().then(() => {
          const inputDebugEl = fixture.debugElement.query(By.css('#newEmployeeBirthDate'));
          console.log('form inputDebugEl', JSON.stringify(inputDebugEl));
          inputDebugEl.triggerEventHandler('input', {target: {value: '29-8-2001'}});

        });
    */

    console.log('form valid name', component.newEmployeeForm.controls['name'].valid);
    console.log('form valid surname', component.newEmployeeForm.controls['surname'].valid);
    console.log('form valid position', component.newEmployeeForm.controls['position'].valid);
    console.log('form valid dateOfBirth', component.newEmployeeForm.controls['dateOfBirth'].valid);
    console.log('form valid dateOfBirth D ', component.newEmployeeForm.controls['dateOfBirth'].value);
    console.log('form valid dateOfBirth E ', component.newEmployeeForm.controls['dateOfBirth'].errors);

    expect(component.newEmployeeForm.valid).toBeTruthy();

  }));

  it('Fill form to be invalid', () => {
    expect(component.newEmployeeForm.valid).toBeFalsy();
    component.newEmployeeForm.controls['name'].setValue('Jack');
    component.newEmployeeForm.controls['surname'].setValue('');
    component.newEmployeeForm.controls['position'].setValue('boss');
    expect(component.newEmployeeForm.valid).toBeFalsy();

    // TODO https://codecraft.tv/courses/angular/unit-testing/model-driven-forms/#_field_errors
    // TODO https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/datepicker/datepicker-input.spec.ts
  });

  /*
    Employee list Form
   */
  it('should load and display Employees', () => {

    const fakeEmployeeList: Employee[] = [
      {
        id: 799,
        name: 'Joe',
        surname: 'Gibbons',
        position: 'boss',
        dateOfBirth: new Date('2002-03-30T15:42:23.420Z')
      }, {
        id: 689,
        name: 'Billy',
        surname: 'The Kid',
        position: 'help desk',
        dateOfBirth: new Date('2002-03-30T15:42:23.420Z')
      }, {
        id: 777,
        name: 'Nick',
        surname: 'Nobody',
        position: 'help desk',
        dateOfBirth: new Date('2002-03-30T15:42:23.420Z')
      }];

    spyOn(employeeService, 'getAllEmployees').and.returnValue(of(fakeEmployeeList));

    component.loadEmployees();

    expect(component.employeeList).toEqual(fakeEmployeeList);
    expect(component.employeesForm.controls['employees'].value).toEqual(fakeEmployeeList);

    // TODO https://codecraft.tv/courses/angular/unit-testing/model-driven-forms/#_field_errors
    // TODO https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/datepicker/datepicker-input.spec.ts
  });

  it('should load Employees positions', () => {

    const employeePositionsResponse = {
      positions: ['boss', 'full-stack developer', 'front-end developer', 'sw admin', 'help desk', 'scrum master', 'product manager']
    };

    spyOn(ibillboardService, 'getPositions').and.returnValue(of(employeePositionsResponse));

    component.loadEmployeePositions();

    expect(component.employeePositions).toEqual(employeePositionsResponse.positions);

  });

  it('should save changes in Employee', () => {

    const fakeEmployee: Employee = {
      id: 799,
      name: 'Joe',
      surname: 'Gibbons',
      position: 'boss',
      dateOfBirth: new Date('2002-03-30T15:42:23.420Z')
    };

    const employeeToEdit = formBuilder.group(
      {
        id: [{value: fakeEmployee.id, disabled: true}],
        name: [{value: fakeEmployee.name, disabled: true}],
        surname: [{value: fakeEmployee.surname, disabled: true}],
        position: [{value: fakeEmployee.position, disabled: true}],
        dateOfBirth: [{value: fakeEmployee.dateOfBirth, disabled: true}]
      }
    );

    const control = <FormArray>component.employeesForm.get('employees');
    control.push(employeeToEdit);

    spyOn(employeeService, 'updateEmployee').and.returnValue(of(fakeEmployee));

    component.editEmployee(0);

    expect(component.employeesForm.get('employees.0').value).toEqual(fakeEmployee);

  });

  it('should delete the Employee', async () => {

    const fakeEmployee: Employee = {
      id: 799,
      name: 'Joe',
      surname: 'Gibbons',
      position: 'boss',
      dateOfBirth: new Date('2002-03-30T15:42:23.420Z')
    };

    const employeeToDelete = formBuilder.group(
      {
        id: [{value: fakeEmployee.id, disabled: true}],
        name: [{value: fakeEmployee.name, disabled: true}],
        surname: [{value: fakeEmployee.surname, disabled: true}],
        position: [{value: fakeEmployee.position, disabled: true}],
        dateOfBirth: [{value: fakeEmployee.dateOfBirth, disabled: true}]
      }
    );

    const control = <FormArray>component.employeesForm.get('employees');
    control.push(employeeToDelete);

    spyOn(employeeService, 'deleteEmployee').and.returnValue(of(fakeEmployee));
    spyOn(confirmationDialogService, 'confirm').and.returnValue(Promise.resolve(true));

    await component.deleteEmployee(0);

    fixture.detectChanges();

    const resultFormArray = <FormArray>component.employeesForm.get('employees');

    expect(resultFormArray.length).toEqual(0);

  });


  it('should add new Employee', () => {

    const newEmployee: Employee = {
      id: 799,
      name: 'Joe',
      surname: 'Gibbons',
      position: 'boss',
      dateOfBirth: new Date('2002-03-30T15:42:23.420Z')
    };

    component.newEmployeeForm.controls['name'].setValue(newEmployee.name);
    component.newEmployeeForm.controls['surname'].setValue(newEmployee.surname);
    component.newEmployeeForm.controls['position'].setValue(newEmployee.position);
    component.newEmployeeForm.controls['dateOfBirth'].setValue('2002-03-30T15:42:23.420Z');
    //  new Date('2002-03-30T15:42:23.420Z')

    console.log('form control.valid', component.newEmployeeForm.valid);

    console.log('form valid name', component.newEmployeeForm.controls['name'].valid);
    console.log('form valid surname', component.newEmployeeForm.controls['surname'].valid);
    console.log('form valid position', component.newEmployeeForm.controls['position'].valid);
    console.log('form valid dateOfBirth', component.newEmployeeForm.controls['dateOfBirth'].valid);
    console.log('form valid dateOfBirth D ', component.newEmployeeForm.controls['dateOfBirth'].value);
    console.log('form valid dateOfBirth E ', component.newEmployeeForm.controls['dateOfBirth'].errors);

    spyOn(employeeService, 'addEmployee').and.returnValue(of(newEmployee));

    component.addNewEmployee();

    const control = <FormArray>component.employeesForm.get('employees');
    // control.push(employeeToEdit);
    console.log('form edit control.length', control.length);
    console.log('form edit control raw', control.value);
    // console.log('form edit control raw 0', control.get('0'));

    const resultFormArray = <FormArray>component.employeesForm.get('employees');
    console.log('form edit control raw 0', resultFormArray.get('0').value);

    expect(component.employeesForm.get('employees.0').value).toEqual(newEmployee);

  });


});

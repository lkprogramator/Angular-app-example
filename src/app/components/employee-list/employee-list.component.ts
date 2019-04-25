import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';
import {Employee} from '../../model/employee';
import {AppConfig} from '../../services/app-config.service';
import {EmployeeService} from '../../services/employee.service';
import {IbillboardService} from '../../services/ibillboard.service';
import {ConfirmationDialogService} from '../../common-components/services/confirmation-dialog.service';
import {LogService} from '../../logger/services/log.service';
import {ToastrNotificationService} from '../../toastr-notification/services/toastr-notification.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  dateFormat = AppConfig.settings.date.dateFormat;

  employeeList: Employee[] = [];

  employeesForm = new FormGroup({
    employees: new FormArray([])
  });

  newEmployeeForm = this.formBuilder.group(
    {
      name: [null, [Validators.required, Validators.pattern('^[a-zA-Z\\s]{3,}$')]],
      surname: [null, [Validators.required, Validators.pattern('^[a-zA-Z\\s]{3,}$')]],
      position: ['---'],
      dateOfBirth: [null, [Validators.required]]
    }
  );

  employeePositions = ['full-stack developer', 'front-end developer', 'sw admin', 'help desk', 'scrum master', 'product manager'];

  showNewEmployeeForm = false;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,
              private ibillboardService: IbillboardService, private confirmationDialogService: ConfirmationDialogService,
              private logger: LogService, private notificationservice: ToastrNotificationService) {
  }

  ngOnInit() {
    this.loadEmployeePositions();
    this.loadEmployees();
  }

  loadEmployeePositions() {
    const positionsObservable = this.ibillboardService.getPositions();
    positionsObservable.subscribe(
      (response: {}) => {
        if (response['positions'] && response['positions'].length > 0) {
          this.employeePositions = response['positions'];
        }
      },
      error => {
        this.logger.error('Fetched employee positions error', error);
        this.notificationservice.warn('Employee positions are currently not available, you can fill them later.');
      },
      () => this.logger.info('fetched employees positions complete')
    );
  }

  loadEmployees() {
    const employeesObservable = this.employeeService.getAllEmployees();
    employeesObservable.subscribe(
      (employeesData: Employee[]) => {
        this.employeeList = employeesData;
        this.createEmployeesForm();
      },
      error => {
        this.logger.error('Fetched all employees error', error);
        this.notificationservice.error('The list of Employees is currently not available, try refresh the page.');
      },
      () => {
        this.logger.info('fetched all employees is complete');
      }
    );
  }

  createEmployeesForm() {
    const control = <FormArray>this.employeesForm.get('employees');

    this.employeeList.forEach(x => {
      control.push(this.patchValues(x));
    });
  }

  patchValues(empl) {

    return this.formBuilder.group(
      {
        id: [{value: empl.id, disabled: true}, Validators.required],
        name: [{value: empl.name, disabled: true}, [Validators.required, Validators.pattern('^[a-zA-Z\\s]{3,}$')]],
        surname: [{value: empl.surname, disabled: true}, [Validators.required, Validators.pattern('^[a-zA-Z\\s]{3,}$')]],
        position: [{value: empl.position, disabled: true}],
        dateOfBirth: [{value: new Date(empl.dateOfBirth), disabled: true}, [Validators.required]]
      }
    );
  }

  get allEmployeesFromForm() {
    return this.employeesForm.get('employees') as FormArray;
  }

  get newEmployeeFormControls() {
    return this.newEmployeeForm.controls;
  }


  addNewEmployee() {

    if (this.newEmployeeForm.invalid) {
      return;
    }

    const newEmployee = this.newEmployeeForm.value as Employee;

    const employeeObservable = this.employeeService.addEmployee(newEmployee);
    employeeObservable.subscribe(
      (employeeData: Employee) => {
        this.logger.info('Adding new Employee', employeeData);

        const control = <FormArray>this.employeesForm.get('employees');
        control.push(this.patchValues(employeeData));
        this.employeeList.push(employeeData);

        this.notificationservice.success('New Employee was added');
      },
      error => {
        this.logger.error('Adding new Employee error', error);
        this.notificationservice.error('Adding of new employee failed. Please try again.');
      },
      () => this.logger.info('Adding new Employee is completed')
    );

    this.newEmployeeForm.reset();
  }

  editEmployee(index: any) {

    const editedEmployee = this.employeesForm.get('employees.' + index);

    if (editedEmployee.invalid) {
      return;
    }

    const employeeObservable = this.employeeService.updateEmployee(editedEmployee.value);
    employeeObservable.subscribe(
      (employeeData: Employee) => {
        this.logger.info('Employee was Edited : ', employeeData);
        this.notificationservice.success('Changes to the Employee has been saved');
        this.employeeList[index] = employeeData;
      },
      error => {
        this.logger.error('Edit Employee error', error);
        this.notificationservice.error('Attempt to edit Employee failed');
      },
      () => this.logger.info('Edit Employee is complete')
    );

    this.allowEdit(index, {target: {checked: false}});

  }

  allowEdit(index, e) {
    if (e.target.checked) {
      this.employeesForm.get('employees.' + index).enable({emitEvent: false});
    } else {
      this.employeesForm.get('employees.' + index).disable({emitEvent: false});
      if (this.employeesForm.get('employees.' + index).dirty) {
        this.restoreEmployeeValues(index);
      }
    }
  }

  restoreEmployeeValues(index) {
    const oldEmployee = this.patchValues(this.employeeList[index]);
    const employees = <FormArray>this.employeesForm.get('employees');
    employees.insert(index, oldEmployee);
    employees.removeAt(index + 1);
  }

  deleteEmployee(index: any) {

    const control = this.employeesForm.get('employees') as FormArray;
    const employee = control.at(index).value as Employee;

    this.confirmationDialogService.confirm('Please confirm...',
      'Do you really want to delete ' + employee.name + ' ' + employee.surname + ' from Employees ?')
      .then((confirmed) => {

          if (confirmed) {
            this.logger.info('User confirmed deleting of Employee');
            const employeeObservable = this.employeeService.deleteEmployee(employee.id);
            employeeObservable.subscribe(
              (employeeData: Employee) => {
                this.logger.info('Deleted Employee', employeeData);
                this.notificationservice.success('Employee was deleted');

                control.removeAt(index);

                this.employeeList.splice(index, 1);

              },
              error => {
                this.logger.error('Delete Employee error', error);
                this.notificationservice.error('Attempt to delete Employee failed');
              },
              () => this.logger.info('Deleting of Employee is completed')
            );
          }

        }
      )
      .catch(() => {
        this.logger.info('User dismissed the dialog');
      });

  }

}

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {EmployeeListComponent} from '../../components/employee-list/employee-list.component';
import {EmployeeViewComponent} from './employee-view.component';

describe('EmployeeViewComponent', () => {
  let component: EmployeeViewComponent;
  let fixture: ComponentFixture<EmployeeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeViewComponent, EmployeeListComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

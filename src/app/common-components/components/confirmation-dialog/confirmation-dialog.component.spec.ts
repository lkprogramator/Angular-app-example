import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationDialogComponent} from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent, TestHostComponent],
      imports: [],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
  });


  it('should create', () => {
    let component: ConfirmationDialogComponent;
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should show confirmation Dialog', () => {
    testHostComponent.confirmationDialogComponent.title = 'test title';
    testHostComponent.confirmationDialogComponent.message = 'test message';
    testHostComponent.confirmationDialogComponent.btnOkText = 'OK';
    testHostComponent.confirmationDialogComponent.btnCancelText = 'Cancel';
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('div.modal-body').innerText).toEqual('test message');
  });


  @Component({
    selector: `app-host-component`,
    template: `<app-confirmation-dialog></app-confirmation-dialog>`
  })
  class TestHostComponent {
    @ViewChild(ConfirmationDialogComponent)
    public confirmationDialogComponent: ConfirmationDialogComponent;
  }

});

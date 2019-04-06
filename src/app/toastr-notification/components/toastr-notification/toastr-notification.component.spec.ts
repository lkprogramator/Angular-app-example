import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

import {ToastrNotificationService} from '../../services/toastr-notification.service';
import {ToastrNotificationComponent} from './toastr-notification.component';

import { Notification, NotificationType } from '../../model/notification';


describe('ToastrNotificationComponent', () => {
  let component: ToastrNotificationComponent;
  let fixture: ComponentFixture<ToastrNotificationComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToastrNotificationComponent],
      imports: [RouterTestingModule],
      providers: [ToastrNotificationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastrNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list message', () => {

    const service: ToastrNotificationService = TestBed.get(ToastrNotificationService);

    const note: Notification = new Notification();
    note.message = 'Test toast';
    note.type = NotificationType.Info;

    spyOn(service, 'getAlert').and.returnValue(of(note));
     component.ngOnInit();

    expect(component.notifications.length).toEqual(1);
    expect(component.notifications[0]).toEqual(note);
  });

});

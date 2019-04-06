import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ToastrNotificationService } from './toastr-notification.service';

describe('ToastrNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule]
  }));

  it('should be created', () => {
    const service: ToastrNotificationService = TestBed.get(ToastrNotificationService);
    expect(service).toBeTruthy();
  });

  it('should create notification', () => {
    const service: ToastrNotificationService = TestBed.get(ToastrNotificationService);

    const nextSpy = spyOn(service.subject, 'next');

    service.info('test message toast');

    expect(nextSpy).toHaveBeenCalled();
  });
});

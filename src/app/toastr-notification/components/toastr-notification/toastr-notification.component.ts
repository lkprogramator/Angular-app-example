import { Component, OnInit } from '@angular/core';

import { Notification, NotificationType } from '../../model/notification';
import { ToastrNotificationService } from '../../services/toastr-notification.service';

@Component({
  selector: 'app-toastr-notification',
  templateUrl: './toastr-notification.component.html',
  styleUrls: ['./toastr-notification.component.css']
})

export class ToastrNotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(public notificationService: ToastrNotificationService) { }

  ngOnInit() {
    this.notificationService.getAlert().subscribe((alert: Notification) => {
      this.notifications = [];
      if (!alert) {
        this.notifications = [];
        return;
      }
      this.notifications.push(alert);
      setTimeout(() => {
        this.notifications = this.notifications.filter(x => x !== alert);
      }, 20000);
    });
  }

  removeNotification(notification: Notification) {
    this.notifications = this.notifications.filter(x => x !== notification);
  }

}


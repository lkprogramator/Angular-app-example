export class Notification {
  type: NotificationType;
  message: string;
}

export enum NotificationType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning'
}

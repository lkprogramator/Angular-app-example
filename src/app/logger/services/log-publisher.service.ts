import { Injectable } from '@angular/core';

import { LogPublisher } from '../model/log-publisher';
import { LogConsole } from '../model/log-console';

@Injectable({
  providedIn: 'root'
})
export class LogPublisherService {
  constructor() {
    this.buildPublishers();
  }

  publishers: LogPublisher[] = [];

  buildPublishers(): void {
    this.publishers.push(new LogConsole());
  }
}

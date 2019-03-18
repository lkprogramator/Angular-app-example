import {LogLevel} from './log-level.enum';

export class LogEntry {

  skeleton = {
    timestamp: null,
    type: '',
    message: ''
  };

  message = '';
  level: LogLevel = LogLevel.Debug;
  extraInfo: any[] = [];
  logWithDate = true;

  buildLogString(): string {

    const messageSkeleton  = {};

    if (this.logWithDate) {
      messageSkeleton['timestamp'] = new Date();
    }

    messageSkeleton['type'] =  LogLevel[this.level];
    messageSkeleton['message'] = this.message;

    if (this.extraInfo.length) {
      messageSkeleton['Extra Info:'] = this.extraInfo;
    }

    return JSON.stringify(messageSkeleton);
  }
}

import {Injectable} from '@angular/core';
import {LogPublisher} from '../model/log-publisher';
import {LogLevel} from '../model/log-level.enum';
import {LogEntry} from '../model/log-entry';
import {LogPublisherService} from './log-publisher.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private publishersService: LogPublisherService) {
    this.publishers = this.publishersService.publishers;
  }

  publishers: LogPublisher[];
  level: LogLevel = LogLevel.All;
  logWithDate = true;

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  clear(): void {
    for (const logger of this.publishers) {
      logger.clear()
        .subscribe(response => console.log(response));
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let ret = false;

    if (!environment.production || (level >= this.level && level !== LogLevel.Off) || this.level === LogLevel.All ) {
      ret = true;
    }

    return ret;
  }

  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {

      const entry: LogEntry = new LogEntry();

      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;

      for (const logger of this.publishers) {
        logger.log(entry)
          .subscribe(response => console.log(response));
      }
    }
  }
}

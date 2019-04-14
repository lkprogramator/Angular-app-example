import { LogConsole } from './log-console';
import {LogEntry} from './log-entry';
import {LogLevel} from './log-level.enum';

describe('LogConsole', () => {
  it('should create an instance', () => {
    expect(new LogConsole()).toBeTruthy();
  });

  it('should log message', () => {
    spyOn(window.console, 'log');

    const entry: LogEntry = new LogEntry();
    entry.message = 'Test of log console message';
    entry.level = LogLevel.Info;
    entry.logWithDate = true;

   const logConsole = new LogConsole();

    logConsole.log(entry);

    expect(window.console.log).toHaveBeenCalled();
  });
});

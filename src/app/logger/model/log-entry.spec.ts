import { LogEntry } from './log-entry';

describe('LogEntry', () => {

  it('should create an instance', () => {
    expect(new LogEntry()).toBeTruthy();
  });

  it('should build Log message', () => {

    const expectedResult = '{"type":"Debug","message":"Test Log Message"}';
    const logEntry = new LogEntry();
    logEntry.message = 'Test Log Message';
    logEntry.logWithDate = false;

    const result = logEntry.buildLogString();

    expect(result).toEqual(expectedResult);
  });


  it('should build Log message with params', () => {
    const expectedResult = '{"type":"Debug","message":"Test Log Message","Extra Info:":["aaa","sss"]}';
    const logEntry = new LogEntry();

    logEntry.logWithDate = false;
    logEntry.message = 'Test Log Message';
    logEntry.extraInfo = ['aaa', 'sss'];

    const result = logEntry.buildLogString();

    expect(result).toEqual(expectedResult);
  });

  it('should build Log message with object', () => {
    const expectedResult = '{"type":"Debug","message":"Test Log Message","Extra Info:":["aaa",{"test":"object"}]}';
    const logEntry = new LogEntry();

    logEntry.logWithDate = false;
    logEntry.message = 'Test Log Message';
    logEntry.extraInfo = ['aaa', {'test': 'object'}];

    const result = logEntry.buildLogString();

    expect(result).toEqual(expectedResult);
  });


});

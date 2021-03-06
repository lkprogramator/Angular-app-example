
## Logger Service

Practical Log service.

"currently Logs into console only." 

### Usage
  0) register logger module in **app.module.ts**  
    * `import { LogService } from './logger/services/log.service'`  
    * `imports: [ ... LoggerModule,... ],`
  1) In service / component  
    * `import { LogService } from './logger/services/log.service'`  
    * `constructor(private logger: LogService)`
  2) Log the values of all types (string, boolean, number, json, object)

#### Examples:

    this.logger.level = this.logger.level == LogLevel.All ? LogLevel.Off : LogLevel.All;

    this.logger.logWithDate = !this.logger.logWithDate;

    this.logger.clear();

    this.logger.log("Test log() method");

    this.logger.debug("Test debug() method");

    this.logger.info("Test info() method");

    this.logger.warn("Test warn() method");

    this.logger.error("Test error() method");

    this.logger.fatal("Test fatal() method");

    this.logger.log("Message and string test", "Paul", "Smith");

    this.logger.log("Message and boolean test", true, false);

    this.logger.log("Message and number test", 1, 2, 3, 4, 5);

    this.logger.log("Message and All Types test", "another string", 1, 2, true, false, values, product);

### TODOS
* Add publisher for sending loged messages to Api.
* Add more tests

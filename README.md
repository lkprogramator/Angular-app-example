# AngularAppExample

Simple Angular example APP

## Features

 * CRUD operation for list of employees
 * Logger service
 * Toastr-notification of events
 * Call 2 apis to get data
 * Configuration is loaded from file when app starts

## Dependency

* nodejs install

## To Use

* Set api url in `src/assets/config/config.*.json`
  * alternatively use demo api from `api` folder

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## TODOS

 * At least two waves of Refactoring
 * Move Employee components and services into its own module
 * Move ErrorHandlerService into common-components module
 * Add config class to submodules
    * pass its instance with data from config file as module config
 * Add more tests

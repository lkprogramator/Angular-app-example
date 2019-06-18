# AngularAppExample

Simple Angular example APP

## Features

 * CRUD operation for list of employees
 * Logger service
 * Login with JWT access token
 * Toastr-notification of events
 * Configuration is loaded from file when app starts

## Dependency

* nodejs install

## To Use

* Set api url in `src/assets/config/config.*.json`

### Demo api
  * demo api is located in `api` folder
    * unzip and follow Readme.md

### Login

**`Email`** and **`password`** are required, of course.

If demo api from `api` folder is used, email and password from example should work.

```http
POST /login
{
  "email": "testUser@mail.com",
  "password": "testUser666"
}
```

The response contains the JWT access token (expiration time of 1 hour) :

```http
200 OK
{
  "accessToken": "xxx.xxx.xxx"
}
```

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## TODOS

 * At least two waves of Refactoring
 * Move Employee components and services into its own module
 * Move ErrorHandlerService into common-components module
 * Add more tests
 * Add registration

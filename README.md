# RpxExui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## VPN make sure is running

## Node Proxy Server  
Run `npm run start:node`

## Frontend 
Run `npm run start:ng` for a dev server in separate terminal. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Integration Documentation

https://tools.hmcts.net/confluence/display/EUI/EXUI+Low+Level+Design

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Logger errors and warnings

Extended version of script below:

(https://robferguson.org/blog/2017/09/09/a-simple-logging-service-for-angular-4/)

## Styling

### styles.scss

Entrance to Styling the Manage Cases application.

We @import the ccd-case-ui-toolkit app.scss first, postceding this we are able to write
CSS here which takes precendence over the CSS from the ccd-case-ui-toolkit.

### app.scss

The app.scss global file has been directly lifted from ccd-case-ui-toolkit's app.scss file.

This file itself therefore should not be changed as if CCD creates a new component it would automatically be styled by this CSS in this file.
@see ccd-case-ui-toolkit /app.scss

ccd-case-ui-toolkit uses  i. The deprecated 'govuk_frontend_toolkit' 2. In some cases their own custom styling and 3. Bootstrap for styling.

If we take control of the CCD components we will need to make a decision whether or not to move to the new 'govuk_frontend' or the HMCTS styling library.

### angular.json

Note that we do not see the import of node_modules/govuk_frontend_toolkit/stylesheets within the app.scss. This happens within
@see angular.json includePaths

END

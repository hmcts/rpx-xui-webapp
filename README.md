# RpxExui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

#Creating libraries in NG
[Angular Documentation](https://angular.io/guide/creating-libraries)

#Command lines
ng g lib exui-case-search
ng g c case-layout --project
```$xslt
CREATE projects/exui-case-search/karma.conf.js (1016 bytes)
CREATE projects/exui-case-search/ng-package.json (165 bytes)
CREATE projects/exui-case-search/package.json (146 bytes)
CREATE projects/exui-case-search/README.md (1065 bytes)
CREATE projects/exui-case-search/tsconfig.lib.json (726 bytes)
CREATE projects/exui-case-search/tsconfig.spec.json (246 bytes)
CREATE projects/exui-case-search/tslint.json (247 bytes)
CREATE projects/exui-case-search/src/test.ts (700 bytes)
CREATE projects/exui-case-search/src/public-api.ts (195 bytes)
CREATE projects/exui-case-search/src/lib/exui-case-search.module.ts (266 bytes)
CREATE projects/exui-case-search/src/lib/exui-case-search.component.spec.ts (686 bytes)
CREATE projects/exui-case-search/src/lib/exui-case-search.component.ts (284 bytes)
CREATE projects/exui-case-search/src/lib/exui-case-search.service.spec.ts (375 bytes)
CREATE projects/exui-case-search/src/lib/exui-case-search.service.ts (143 bytes)
UPDATE angular.json (4991 bytes)
UPDATE package.json (1436 bytes)
UPDATE tsconfig.json (597 bytes)

```
ng g c exui-case-layout --project=exui-case-search

```$xslt
CREATE projects/exui-case-search/src/lib/exui-case-layout/exui-case-layout.component.html (35 bytes)
CREATE projects/exui-case-search/src/lib/exui-case-layout/exui-case-layout.component.spec.ts (686 bytes)
CREATE projects/exui-case-search/src/lib/exui-case-layout/exui-case-layout.component.ts (307 bytes)
CREATE projects/exui-case-search/src/lib/exui-case-layout/exui-case-layout.component.css (0 bytes)

```
ng g c /containers/exui-organisation-layout --project=exui-organisation
```$xslt
CREATE projects/exui-organisation/src/lib/containers/exui-organisation-layout/exui-organisation-layout.component.html (43 bytes)
CREATE projects/exui-organisation/src/lib/containers/exui-organisation-layout/exui-organisation-layout.component.spec.ts (742 bytes)
CREATE projects/exui-organisation/src/lib/containers/exui-organisation-layout/exui-organisation-layout.component.ts (339 bytes)
CREATE projects/exui-organisation/src/lib/containers/exui-organisation-layout/exui-organisation-layout.component.css (0 bytes)
UPDATE projects/exui-organisation/src/lib/exui-organisation.module.ts (432 bytes)

```


#Adding Ngrx Setup Ngrx Schematics tooling
```
ng add @ngrx/store
ng add @ngrx/effects
```
`npm install @ngrx/schematics --save-dev`
`npm install @ngrx/store @ngrx/effects @ngrx/store-devtools @ngrx/router-store --save`

```$xslt

```
ng build exui-case-search
ng test exui-case-search
ng lint exui-case-search

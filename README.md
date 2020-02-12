# RpxExui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## VPN make sure is running

## Node Proxy Server  
Run `npm run start:node`

## Issues and Solutions

Property 'cookies' does not exist on type 'EnhancedRequest' - you will need to make
sure @types/express-session is added ie.
`yarn add @types/express-session`

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

To get more help on the Angular CLI use `ng help` or go and check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Logger errors and warnings

Extended version of script below:

(https://robferguson.org/blog/2017/09/09/a-simple-logging-service-for-angular-4/)


# Branches, Enviroment and Deployment methods used

```javascript
 |---------------------------------------|
 | Branch | Environment | Deployment via |
 |---------------------------------------|
 | local  | development | -              |
 | PR     | preview     | Jenkins        |
 | Master | aat         | Jenkins        |
 | Master | aat         | Flux           |
 | Master | ithc        | Flux           |
 | Master | production  | Flux           |
 |---------------------------------------|
```

# Setting up Secrets locally (Required)

You need to setup secrets locally before you run the project. Why? - When you push this application
up through AKS deployed through Flux to AAT, ITHC and Prod, the application will take in the secrets on these environments.

The developer needs to set these up locally, so that the developer can see any issues early in
the development process, and not when the application is placed up onto the higher AKS environments.

To setup the secrets locally do the following:

Note that Mac OS Catalina introduced a new feature that overlaps and reinforces the filesystem,
therefore you will not be able to make changes in the root directory of your file system, hence there are different
ways to setup secrets, Pre Catalina and Post Catalina, note that the Post Catalina way should work 
for all operating system, but I have yet to try this.

####MAC OS - Pre Catalina

1. Create a Mount point on your local machine<br/>
Create the folder: `/mnt/secrets/rpx`
2. In this folder we create a file per secret.
ie.
We create the file postgresql-admin-pw (no extension).
Within the file we have one line of characters which is the secret.

####MAC OS - Post Catalina

1. Create a Mount point on your local machine within the Volumes folder<br/>
Create the folder: `/Volumes/mnt/secrets/rpx`
2. In this folder we create a file per secret.
ie.
We create the file postgresql-admin-pw (no extension).
Within the file we have one line of characters which is the secret.
3. If you want to test the secrets locally override the default mountPoint with the following additional option added to .addTo
ie. 
`propertiesVolume.addTo(secretsConfig, { mountPoint: '/Volumes/mnt/secrets/' });`

Note that this is connected into the application via the following pieces of code:
```javascript
  keyVaults:
    rpx:
      secrets:
        - postgresql-admin-pw
        - appinsights-instrumentationkey-tc
```

which in turn uses `propertiesVolume.addTo()`

# How Application Configuration (Node Config) Works

The application picks up the configuration from the /config .json files.

The references within *.json ie. production.json are set by the /charts/xui-terms-and-conditions/values.yaml file ie.
POSTGRES_SERVER_PORT is set by POSTGRES_SERVER_PORT within values.yaml. <br><br>HOWEVER if there is a
values.*.template.yaml file it will override the values within the values.yaml file, BUT this only happens on the JENKINS
pipelines, where values.*.template.yaml are available to the build pipeline.

AKS uses a .json file in /config and the values.yaml from within charts/xui-terms-and-conditions ONLY.
 
AKS does not use values.aat.template.yaml and values.previews.template.yaml

DO NOT create a new .json file within /config as this increases the complexity of configuration. 

Node config selects the file within /config based on `NODE_ENV` which is always production on all environments,
due to Reform standards, this should not change on different environments, it should always be `NODE_ENV=production`

Note that I'm currently leveraging `NODE_CONFIG_ENV` which passes in the environment as we have a database password on
the preview environment that cannot be stored within any of our configuration files, as this is an open repo,
and the same password is being used on AAT.

In other projects we will not need to leverage `NODE_CONFIG_ENV`.

Note about secrets ie. 

```javascript
  keyVaults:
    rpx:
      secrets:
        - postgresql-admin-pw
        - appinsights-instrumentationkey-tc
 ```   
are set within the values.yaml and there should be NO REFERENCE to them within any /config/*.json file.

The application pulls out the secrets directly using `propertiesVolume.addTo()`

END

// This file can be replaced during build by using the 'fileReplacements' array.
// 'ng build --prod' replaces 'environment.ts' with 'environment.prod.ts'.
// The list of file replacements can be found in 'angular.json'.
// isDebugMode - 'OFF' 'DEBUG' 'WARN 'ERROR'

export const environment = {
  production: false,
  loggingLevel: 'DEBUG',
  cookies: {
    token: '__auth__',
    userId: '__userid__',
    roles: 'roles',
  },
  googleAnalyticsKey: 'UA-124734893-2'
};
/**
 * Do not add configuration to this file if possible
 * Instead add it to config.json file that gets loaded through APP_INITIALIZER;
 * and consume it through the configuration.service.ts
 */

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as 'zone.run', 'zoneDelegate.invokeTask'.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

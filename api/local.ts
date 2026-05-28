/**
 * Local.ts used to run the application locally.
 */
// App Insights must patch console before application imports initialise node-lib loggers.
import { appInsights } from './lib/appInsights';
import { createApp } from './application';
import { applicationConfiguration } from './configuration/appConfig';
import errorHandler from './lib/error.handler';

/**
 * Show the developer the application configuration when they are developing locally.
 */
createApp().then((app) => {
  console.log(applicationConfiguration());

  app.use(appInsights);
  app.use(errorHandler);

  app.listen(3001, () => console.log('Dev server listening on port 3001!'));
});

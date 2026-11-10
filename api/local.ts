/**
 * Local.ts used to run the application locally.
 */
import { createApp } from './application';
import { applicationConfiguration } from './configuration/appConfig';
import errorHandler from './lib/error.handler';

/**
 * Show the developer the application configuration when they are developing locally.
 */
createApp().then((app) => {
  console.log(applicationConfiguration());

  app.use(errorHandler);

  app.listen(3001, (error) => {
    if (error) {
      throw error;
    }
    console.log('Dev server listening on port 3001!');
  });
});

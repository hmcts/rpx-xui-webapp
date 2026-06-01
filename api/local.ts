/**
 * Local.ts used to run the application locally.
 */
import { createApp } from './application';
import { applicationConfiguration } from './configuration/appConfig';
import { appInsights } from './lib/appInsights';
import errorHandler from './lib/error.handler';
import { attachSocketProxy } from './socket-proxy';

/**
 * Show the developer the application configuration when they are developing locally.
 */
createApp().then((app) => {
  console.log(applicationConfiguration());

  app.use(appInsights);
  app.use(errorHandler);

  const server = app.listen(3001, () => console.log('Dev server listening on port 3001!'));
  attachSocketProxy(server);
});

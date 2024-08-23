/**
 * Server.ts
 *
 * Server.ts is used to run the application as it moves through the Jenkins pipelines, and on the Preview
 * and higher environments.
 */
import 'source-map-support/register';
import { app } from './application';

import * as ejs from 'ejs';
import * as express from 'express';
import * as path from 'path';
import { appInsights } from './lib/appInsights';
import errorHandler from './lib/error.handler';
import { removeCacheHeaders } from './lib/middleware/removeCacheHeaders';

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.set('view engine', 'html');
app.set('views', __dirname);

app.use([removeCacheHeaders, express.static(path.join(__dirname, '..', 'assets'), { index: false, cacheControl: false })]);
app.use([removeCacheHeaders, express.static(path.join(__dirname, '..'), { index: false, cacheControl: false })]);

app.use('/*', (req, res) => {
  res.set('Cache-Control', 'no-store, s-maxage=0, max-age=0, must-revalidate, proxy-revalidate');
  res.render('../index', {
    providers: [
      { provide: 'REQUEST', useValue: req },
      { provide: 'RESPONSE', useValue: res }
    ],
    req,
    res
  });
});

app.use(appInsights);
app.use(errorHandler);
app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port 3000!');
});

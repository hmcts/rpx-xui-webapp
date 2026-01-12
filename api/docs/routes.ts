import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import axios from 'axios';
import { RequestHandler } from 'express';
import openApiSpec from './spec';

const router = express.Router({ mergeParams: true });
const swaggerDocument = openApiSpec as swaggerUi.JsonObject;

router.get('/openapi.json', (req, res) => {
  res.type('application/json').send(swaggerDocument);
});

const upstreamSpecs: Record<string, string> = {
  'am-role-assignment-service': 'https://hmcts.github.io/cnp-api-docs/specs/am-role-assignment-service.json',
  'am-judicial-booking-service': 'https://hmcts.github.io/cnp-api-docs/specs/am-judicial-booking-service.json',
  'future-hearings-hmi-api': 'https://hmcts.github.io/cnp-api-docs/specs/future-hearings-hmi-api.json',
  'rd-location-ref-api': 'https://hmcts.github.io/cnp-api-docs/specs/rd-location-ref-api.json',
  'rd-judicial-api': 'https://hmcts.github.io/cnp-api-docs/specs/rd-judicial-api.json',
  'rd-caseworker-ref-api': 'https://hmcts.github.io/cnp-api-docs/specs/rd-caseworker-ref-api.json'
};

router.get('/upstream/:id.json', async (req, res) => {
  const id = req.params.id;
  const url = upstreamSpecs[id];
  if (!url) {
    return res.status(404).send({ error: 'Unknown upstream spec id' });
  }
  try {
    const response = await axios.get(url, { responseType: 'json' });
    res.type('application/json').send(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).send({ error: 'Failed to fetch upstream spec', detail: url });
  }
});

const swaggerServe = swaggerUi.serve as unknown as RequestHandler[];
const swaggerSetup = swaggerUi.setup(null, {
  customSiteTitle: 'XUI API docs',
  explorer: true,
  swaggerOptions: {
    docExpansion: 'list',
    urls: [
      { url: '/api/docs/openapi.json', name: 'XUI Gateway (local endpoints)' },
      { url: '/api/docs/upstream/am-role-assignment-service.json', name: 'AM Role Assignment Service' },
      { url: '/api/docs/upstream/am-judicial-booking-service.json', name: 'AM Judicial Booking Service' },
      { url: '/api/docs/upstream/future-hearings-hmi-api.json', name: 'Hearing Management (HMI)' },
      { url: '/api/docs/upstream/rd-location-ref-api.json', name: 'RD Location Ref API' },
      { url: '/api/docs/upstream/rd-judicial-api.json', name: 'RD Judicial API' },
      { url: '/api/docs/upstream/rd-caseworker-ref-api.json', name: 'RD Caseworker Ref API' }
    ]
  }
}) as unknown as RequestHandler;

router.use('/', ...swaggerServe, swaggerSetup);

export default router;

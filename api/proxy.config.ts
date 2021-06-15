import * as bodyParser from 'body-parser';
import { Express } from 'express';

import { checkCachedJurisdictions, getJurisdictions } from './amendedJurisdictions';
import { getConfigValue, proxiedReferences } from './configuration';
import { applyProxy } from './lib/middleware/proxy';
import { handleElasticSearchResponse, modifyRequest } from './searchCases';

export const initProxy = (app: Express) => {
  applyProxy(app, {
    rewrite: true,
    rewriteUrl: '/socket.io',
    source: '/socket.io',
    target: getConfigValue(proxiedReferences.SERVICES_CCD_ACTIVITY_API_PATH)
  });

  applyProxy(app, {
    rewrite: true,
    skipAuth: true,
    source: '/activity',
    target: getConfigValue(proxiedReferences.SERVICES_CCD_ACTIVITY_API_PATH)
  });

  applyProxy(app, {
    rewrite: false,
    source: '/documents',
    target: getConfigValue(proxiedReferences.SERVICES_DOCUMENTS_API_PATH),
  });

  applyProxy(app, {
    rewrite: false,
    source: '/hearing-recordings',
    target: getConfigValue(proxiedReferences.SERVICES_EM_HRS_API_PATH),
  });

  applyProxy(app, {
    filter: [
      '!/data/internal/searchCases',
    ],
    rewrite: false,
    source: [
      '/print',
      '/data',
    ],
    target: getConfigValue(proxiedReferences.SERVICES_CCD_COMPONENT_API_PATH),
  });

  applyProxy(app, {
    middlewares: [bodyParser.json()],
    onReq: modifyRequest,
    onRes: handleElasticSearchResponse,
    rewrite: false,
    source: '/data/internal/searchCases',
    target: getConfigValue(proxiedReferences.SERVICES_CCD_COMPONENT_API_PATH),
  });

  applyProxy(app, {
    rewrite: true,
    rewriteUrl: '/addresses',
    source: '/api/addresses',
    target: getConfigValue(proxiedReferences.SERVICES_CCD_COMPONENT_API_PATH),
  });

  applyProxy(app, {
    onReq: checkCachedJurisdictions,
    onRes: getJurisdictions,
    rewrite: false,
    source: '/aggregated',
    target: getConfigValue(proxiedReferences.SERVICES_CCD_COMPONENT_API_PATH),
  });

  applyProxy(app, {
    rewrite: false,
    source: '/icp',
    target: getConfigValue(proxiedReferences.SERVICES_ICP_API_URL),
    ws: true,
  });

  applyProxy(app, {
    rewrite: true,
    rewriteUrl: '/api',
    source: '/em-anno',
    target: getConfigValue(proxiedReferences.SERVICES_EM_ANNO_API_URL),
  });

  applyProxy(app, {
    rewrite: false,
    source: [
      '/api/markups',
      '/api/redaction',
    ],
    target: getConfigValue(proxiedReferences.SERVICES_MARKUP_API_URL),
  });

  applyProxy(app, {
    rewrite: true,
    rewriteUrl: '',
    source: '/payments',
    target: getConfigValue(proxiedReferences.SERVICES_PAYMENTS_URL),
  });

  /**
   * Commenting this out as it's completely bypassing the API this way,
   * which is not we want right now. If that's to be the long-term
   * solution, we'll need to move the logic around adding actions out
   * of the node layer.
   */
  // applyProxy(app, {
  //   rewrite: true,
  //   rewriteUrl: '',
  //   source: '/workallocation',
  //   target: 'http://localhost:8080',
  // });
};

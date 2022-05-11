import * as bodyParser from 'body-parser';
import { Express } from 'express';
import * as amendedJurisdictions from './amendedJurisdictions';
import { getConfigValue } from './configuration';
import {
  SERVICES_CCD_COMPONENT_API_PATH,
  SERVICES_DOCUMENTS_API_PATH,
  SERVICES_DOCUMENTS_API_PATH_V2,
  SERVICES_EM_ANNO_API_URL,
  SERVICES_EM_DOCASSEMBLY_API_URL,
  SERVICES_EM_HRS_API_PATH,
  SERVICES_ICP_API_URL,
  SERVICES_MARKUP_API_URL,
  SERVICES_PAYMENTS_URL,
  SERVICES_REFUNDS_API_URL,
  SERVICES_LOCATION_REF_API_URL
} from './configuration/references';
import { applyProxy } from './lib/middleware/proxy';
import * as searchCases from './searchCases';

export const initProxy = (app: Express) => {
  applyProxy(app, {
    rewrite: true,
    rewriteUrl: '/activity',
    source: [
      '/activity',
    ],
    target: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH),
  });

  applyProxy(app, {
    rewrite: false,
    source: '/documents',
    target: getConfigValue(SERVICES_DOCUMENTS_API_PATH),
  });

  applyProxy(app, {
    rewrite: false,
    source: '/hearing-recordings',
    target: getConfigValue(SERVICES_EM_HRS_API_PATH),
  });

  applyProxy(app, {
    rewrite: true,
    rewriteUrl: '/cases/documents',
    source: '/documentsv2',
    target: getConfigValue(SERVICES_DOCUMENTS_API_PATH_V2),
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
    target: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH),
  });

  applyProxy(app, {
    middlewares: [bodyParser.json()],
    onReq: searchCases.modifyRequest,
    onRes: searchCases.handleElasticSearchResponse,
    rewrite: false,
    source: '/data/internal/searchCases',
    target: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH),
  });

  applyProxy(app, {
    rewrite: true,
    rewriteUrl: '/addresses',
    source: '/api/addresses',
    target: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH),
  });

  applyProxy(app, {
    onReq: amendedJurisdictions.checkCachedJurisdictions,
    onRes: amendedJurisdictions.getJurisdictions,
    rewrite: false,
    source: '/aggregated',
    target: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH),
  });

  applyProxy(app, {
    rewrite: false,
    source: '/icp',
    target: getConfigValue(SERVICES_ICP_API_URL),
    ws: true,
  });

  applyProxy(app, {
    rewrite: true,
    rewriteUrl: '/api',
    source: '/em-anno',
    target: getConfigValue(SERVICES_EM_ANNO_API_URL),
  });

  applyProxy(app, {
    rewrite: true,
    rewriteUrl: '/api',
    source: '/doc-assembly',
    target: getConfigValue(SERVICES_EM_DOCASSEMBLY_API_URL),
  });

  applyProxy(app, {
    rewrite: false,
    source: [
      '/api/markups',
      '/api/redaction',
    ],
    target: getConfigValue(SERVICES_MARKUP_API_URL),
  });

  applyProxy(app, {
    rewrite: true,
    rewriteUrl: '',
    source: '/payments',
    target: getConfigValue(SERVICES_PAYMENTS_URL),
  });

  applyProxy(app, {
      rewrite: true,
      rewriteUrl: '/refund',
      source: '/api/refund',
      target: getConfigValue(SERVICES_REFUNDS_API_URL),
  });
  applyProxy(app, {
      rewrite: false,
      source: '/refdata/location',
      target: getConfigValue(SERVICES_LOCATION_REF_API_URL),
  });
}

#!/usr/bin/env node

import http from 'node:http';
import { URL } from 'node:url';

const port = Number(process.env.XUI_SRT_STUB_PORT || 8091);

const serviceFamilies = [
  { ccd_service_name: 'IA', service_short_description: 'Immigration and Asylum', service_code: 'BFA1' },
  { ccd_service_name: 'CIVIL', service_short_description: 'Civil', service_code: 'AAA6' },
  { ccd_service_name: 'PRIVATELAW', service_short_description: 'Private Law', service_code: 'ABA5' },
  { ccd_service_name: 'PUBLICLAW', service_short_description: 'Public Law', service_code: 'ABA3' },
  { ccd_service_name: 'EMPLOYMENT', service_short_description: 'Employment', service_code: 'BHA1' },
  { ccd_service_name: 'ST_CIC', service_short_description: 'Criminal Injuries Compensation', service_code: 'BBA2' },
  { ccd_service_name: 'SSCS', service_short_description: 'Social Security and Child Support', service_code: 'BBA3' },
  { ccd_service_name: 'DIVORCE', service_short_description: 'Divorce', service_code: 'ABA1' },
  { ccd_service_name: 'FR', service_short_description: 'Financial Remedy', service_code: 'ABA2' },
  { ccd_service_name: 'PROBATE', service_short_description: 'Probate', service_code: 'ABA6' },
  { ccd_service_name: 'CMC', service_short_description: 'Civil Money Claims', service_code: 'AAA7' },
  { ccd_service_name: 'HRS', service_short_description: 'Hearing Recordings', service_code: 'HRS1' },
];

const emptyTaskList = {
  tasks: [],
  total_records: 0,
  search_parameters: [],
};

const openIdConfiguration = {
  issuer: 'http://localhost:5556/o',
  authorization_endpoint: 'http://localhost:5000/o/authorize',
  token_endpoint: 'http://localhost:5000/o/token',
  userinfo_endpoint: 'http://localhost:5000/o/userinfo',
  jwks_uri: 'http://localhost:5000/o/jwks',
  end_session_endpoint: 'http://localhost:5000/o/endSession',
  response_types_supported: [
    'code token id_token',
    'code',
    'code id_token',
    'device_code',
    'id_token',
    'code token',
    'token',
    'token id_token',
  ],
  grant_types_supported: ['authorization_code', 'implicit'],
  scopes_supported: ['openid', 'profile', 'roles'],
  token_endpoint_auth_methods_supported: [
    'client_secret_post',
    'private_key_jwt',
    'self_signed_tls_client_auth',
    'tls_client_auth',
    'none',
    'client_secret_basic',
  ],
  subject_types_supported: ['public'],
  id_token_signing_alg_values_supported: ['HS256', 'RS256'],
  claims_supported: [],
};

const responseFor = (method, pathname) => {
  if (pathname === '/health' || pathname === '/health/liveness' || pathname === '/health/readiness') {
    return { status: 200, body: { status: 'UP' } };
  }

  if (method === 'GET' && pathname === '/o/.well-known/openid-configuration') {
    return { status: 200, body: openIdConfiguration };
  }

  if (method === 'GET' && pathname === '/refdata/location/orgServices') {
    return { status: 200, body: serviceFamilies };
  }

  if (method === 'GET' && pathname.startsWith('/refdata/location')) {
    return { status: 200, body: [] };
  }

  if (method === 'GET' && pathname.startsWith('/refdata/commondata/lov/categories')) {
    return { status: 200, body: { list_of_values: [] } };
  }

  if (method === 'GET' && pathname.startsWith('/refdata/commondata')) {
    return { status: 200, body: [] };
  }

  if (method === 'GET' && pathname.startsWith('/refdata/case-worker')) {
    return { status: 200, body: [] };
  }

  if (method === 'GET' && pathname.startsWith('/refdata/judicial')) {
    return { status: 200, body: [] };
  }

  if (method === 'POST' && pathname.startsWith('/task')) {
    return { status: 200, body: emptyTaskList };
  }

  if (method === 'GET' && pathname.startsWith('/task')) {
    return { status: 200, body: emptyTaskList };
  }

  if (method === 'POST' && pathname.startsWith('/am/role-assignments')) {
    return { status: 200, body: { roleAssignmentResponse: [] } };
  }

  if (method === 'GET' && pathname.startsWith('/am/role-assignments')) {
    return { status: 200, body: { roleAssignmentResponse: [] } };
  }

  if (method === 'GET' && pathname.startsWith('/hearing')) {
    return { status: 200, body: {} };
  }

  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    return { status: 200, body: {} };
  }

  return { status: 200, body: [] };
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  const result = responseFor(request.method || 'GET', url.pathname);

  response.writeHead(result.status, {
    'access-control-allow-origin': '*',
    'access-control-allow-headers': '*',
    'access-control-allow-methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'content-type': 'application/json',
  });

  if (request.method === 'OPTIONS') {
    response.end();
    return;
  }

  response.end(JSON.stringify(result.body));
});

server.listen(port, () => {
  console.log(`local SRT synthetic services listening on http://localhost:${port}`);
});

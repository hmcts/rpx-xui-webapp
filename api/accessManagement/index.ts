import { NextFunction, Response } from 'express';

/**
 * Manually creating Elastic search query
 */
export function removeAcceptHeader(proxyReq, req) {
    //proxyReq.removeHeader('accept');
}

export async function getAuthHeaders(req, res, next: NextFunction): Promise<Response> {
  return res.status(418)
  .send({'Request Header - Authorization': req.headers.Authorization, 
         'Request Header - Service Authorization': req.headers.ServiceAuthorization});
}

export async function specificAccessRequest(req, res, next: NextFunction): Promise<Response> {
  return res.status(418)
  .send({'Request Header - Authorization': req.headers.Authorization, 
         'Request Header - Service Authorization': req.headers.ServiceAuthorization});
}

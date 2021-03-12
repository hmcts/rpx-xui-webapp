import * as log4jui from '../lib/log4jui';

const logger = log4jui.getLogger('proxy');

export async function activityTrackerProxyRequest(proxyReq, req): Promise<void> {
  logger.info('ActivityTrackerRequest => ',
    `id:${req.user.userinfo.id} forename:${req.user.userinfo.forename} surname:${req.user.userinfo.surname}`
  );
  proxyReq.end();
}

export async function activityTrackerProxyResponse(proxyReq, req, res, json): Promise<any> {
  logger.info('ActivityTrackerResponse => ',
    `id: ${req.user.userinfo.id} forename:${req.user.userinfo.forename} surname:${req.user.userinfo.surname}`
  );
  return json;
}

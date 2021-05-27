import * as log4jui from '../lib/log4jui';

const logger = log4jui.getLogger('proxy');

export async function activityTrackerProxyRequest(proxyReq, req): Promise<void> {
  if (req.user && req.user.userinfo) {
    logger.info('ActivityTrackerRequest => ',
      `id:${req.user.userinfo.id} forename:${req.user.userinfo.forename} surname:${req.user.userinfo.surname}`
    );
  }
}

export async function activityTrackerProxyResponse(proxyReq, req, res, json): Promise<any> {
  if (req.user && req.user.userinfo) {
    logger.info('ActivityTrackerResponse => ',
      `id: ${req.user.userinfo.id} forename:${req.user.userinfo.forename} surname:${req.user.userinfo.surname}`
    );
  }
  return json;
}

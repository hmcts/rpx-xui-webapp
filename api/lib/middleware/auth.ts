import { xuiNode } from '@hmcts/rpx-xui-node-lib';
import { RequestHandler } from 'express';

// Cast to align the node-lib handler (typed with Express v4) with the local Express typings.
const authInterceptor: RequestHandler = xuiNode.authenticate as unknown as RequestHandler;

export default authInterceptor;

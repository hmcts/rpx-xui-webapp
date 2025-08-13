import { createApp } from '../application';
import * as log4jui from '../lib/log4jui';
import { JUILogger } from '../lib/models';

const logger: JUILogger = log4jui.getLogger('RedisHealth');

export const redisHealth = async (): Promise<boolean> => {
  const app = await createApp();

  // Safely check if Redis client exists
  const redisClient = app?.locals?.redisClient;

  return new Promise<boolean>((resolve) => {
    try {
      redisClient.ping((err, pong) => {
        if (err || (pong !== 'PONG')) {
          logger.error(err || 'redis server is not responsive');
          return resolve(false);
        }
        return resolve(true);
      });
    } catch (e) {
      resolve(false);
    }
  });
};

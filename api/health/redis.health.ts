import { createApp } from '../application';
import * as log4jui from '../lib/log4jui';
import { JUILogger } from '../lib/models';

const logger: JUILogger = log4jui.getLogger('RedisHealth');

export const redisHealth = async (): Promise<boolean> => {
  const app = await createApp();

  // Safely check if Redis client exists
  const redisClient = app?.locals?.redisClient;

  try {
    const pong = await redisClient.ping();
    if (pong !== 'PONG') {
      logger.error('redis server is not responsive');
      return false;
    }
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
};

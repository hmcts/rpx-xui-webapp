import * as cacheManager from 'cache-manager';
import MemoryStore from 'cache-manager-memory-store';
import * as redisStore from 'cache-manager-redis-store';
import { showFeature } from '../../configuration';
import { FEATURE_REDIS_ENABLED } from '../../configuration/references';

const redisConfig = { store: redisStore, host: 'localhost', port: 6379, db: 0, ttl: 600 }
const isRedisEnabled = showFeature(FEATURE_REDIS_ENABLED)
export const applicationCache = isRedisEnabled ? cacheManager.caching(redisConfig) : cacheManager.caching(MemoryStore);
console.log('applicationCache', applicationCache.store)

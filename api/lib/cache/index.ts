import * as cacheManager from 'cache-manager';
import MemoryStore from 'cache-manager-memory-store';
import * as redisStore from 'cache-manager-redis-store';
import { getConfigValue, showFeature } from '../../configuration';
import { FEATURE_REDIS_ENABLED, REDIS_CLOUD_URL } from '../../configuration/references';

export function getApplicationCache(): cacheManager.Cache {
    console.log('Redis Connection string', getConfigValue(REDIS_CLOUD_URL))
    const redisConfig = { store: redisStore, config: getConfigValue(REDIS_CLOUD_URL), ttl: 600 }
    const isRedisEnabled = showFeature(FEATURE_REDIS_ENABLED)
    const applicationCache = isRedisEnabled ? cacheManager.caching(redisConfig) : cacheManager.caching(MemoryStore);
    console.log('applicationCache', applicationCache.store);
    return applicationCache;
}

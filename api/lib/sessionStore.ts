import * as connectRedis from 'connect-redis'
import * as session from 'express-session'
import * as redis from 'redis'
import * as sessionFileStore from 'session-file-store'
import {app} from '../application'
import {getConfigValue, showFeature} from '../configuration'
import {
  FEATURE_REDIS_ENABLED,
  NOW,
  REDIS_CLOUD_URL,
  REDIS_KEY_PREFIX,
  REDIS_TTL
} from '../configuration/references'

const RedisStore = connectRedis(session)
const FileStore = sessionFileStore(session)

let store = null

export const getRedisStore = () => {
    console.log('using RedisStore')

    const tlsOptions = {
      prefix: getConfigValue(REDIS_KEY_PREFIX),
    }

    app.locals.redisClient = redis.createClient(
      getConfigValue(REDIS_CLOUD_URL),
      tlsOptions
    )

    app.locals.redisClient.on('ready', () => {
        console.log('redis client connected successfully')
    })

    app.locals.redisClient.on('error', console.error)

    return new RedisStore({
        client: app.locals.redisClient,
        ttl: getConfigValue(REDIS_TTL),
    })
}

export const getFileStore = () => {
    console.log('using FileStore')
    return new FileStore({
        path: getConfigValue(NOW) ? '/tmp/sessions' : '.sessions',
    })
}

export const getStore = () => {
    if (!store) {
        if (showFeature(FEATURE_REDIS_ENABLED)) {
            store = getRedisStore()
        } else {
            store = getFileStore()
        }
    }
    return store
}

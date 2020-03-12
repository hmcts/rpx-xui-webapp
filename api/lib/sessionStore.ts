import * as connectRedis from 'connect-redis'
import * as session from 'express-session'
import * as redis from 'redis'
import * as sessionFileStore from 'session-file-store'
import {getConfigValue, showFeature} from '../configuration'
import {FEATURE_REDIS_ENABLED, NOW, REDIS} from '../configuration/references'

const RedisStore = connectRedis(session)
const FileStore = sessionFileStore(session)

let store = null

export const getRedisStore = () => {
    console.log('using RedisStore')

    const redisClient = redis.createClient({
        url: getConfigValue(REDIS)
    })

    redisClient.on('ready', () => {
        console.log('redis client connected successfully')
    })

    redisClient.on('error', console.error)

    return new RedisStore({
        client: redisClient,
        ttl: 86400,
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

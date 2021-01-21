// import {app} from '../application'
// import * as log4jui from '../lib/log4jui'
// import {JUILogger} from '../lib/models'
//
// const logger: JUILogger = log4jui.getLogger('RedisHealth')
//
// export const redisHealth = (): Promise<boolean> => {
//     return new Promise<boolean>( resolve => {
//         try {
//             app.locals.redisClient.ping((err, pong) => {
//                 if (err || (pong !== 'PONG')) {
//                     logger.error(err || 'redis server is not responsive')
//                     return resolve(false)
//                 }
//                 return resolve(true)
//             })
//         } catch (e) {
//             resolve(false)
//         }
//     })
// }

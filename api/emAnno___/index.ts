import * as express from 'express'
import { config } from '../config'
import { http } from '../lib/http'

const url = config.services.em_anno_api

/**
 * retrieve annotations from em-anno by the documentId
 * @param req
 * @param res
 */
export async function handleGet(req: express.Request, res: express.Response) {
    const documentId = req.query.documentId
    const annotationSet = await http.get(`${url}/api/annotation-sets/filter?documentId=${documentId}`)
    if (document) {
        res.status(200).send(annotationSet)
    } else {
        res.status(500).send(`Error getting document ${documentId}`)
    }
}

// import { Request, Response, Router } from 'express'
// import { config } from '../config'
// import { http } from '../lib/http'
// import * as log4jui from '../lib/log4jui'
// import { asyncReturnOrError } from '../lib/util'

// const url = config.services.em_anno_api

// const logger = log4jui.getLogger('annotations')

// export async function getAnnotionSet(uuid: string) {
//     console.log('@@')
//     const request = await http.get(`${url}/api/annotation-sets/filter?documentId=${uuid}`)
//     return request.data
// }

// export async function createAnnotationSet(body: string) {
//     const request = await http.post(`${url}/api/annotation-sets/`, body)
//     return request.data
// }
// export async function addAnnotation(body: string) {
//     const request = await http.post(`${url}/api/annotations`, body)
//     return request.data
// }

// export async function deleteAnnotation(uuid: string) {
//     const request = await http.delete(`${url}/api/annotations/${uuid}`)
//     // request.data is empty on success, need to return our own data
//     return {
//         status: request.status,
//         statusText: request.headers['x-emannotationapp-alert'],
//     }
// }

// export async function handlePost(req: Request, res: Response): Promise<void> {
//     {
//         // Called when get annotation-sets returns 404
//         const response = await asyncReturnOrError(createAnnotationSet(req.body), ' Error creating annotations', res, logger)

//         if (response) {
//             res.status(200).send(response)
//         }
//     }
// }

// export async function handleGet(req: Request, res: Response): Promise<void> {
//     const uuid = req.params.uuid
//     const response = await asyncReturnOrError(getAnnotionSet(uuid), ' Error getting annotations', res, logger)

//     if (response) {
//         res.status(200).send(response)
//     }
// }

// export async function handleDelete(req: Request, res: Response): Promise<void> {
//     const uuid = req.params.uuid
//     const response = await asyncReturnOrError(deleteAnnotation(uuid), ' Error deleting annotations', res, logger)

//     if (response) {
//         res.status(200).send(response)
//     }
// }

// export async function handleAdd(req: Request, res: Response): Promise<void> {
//     const response = await asyncReturnOrError(addAnnotation(req.body), ' Error Adding annotations', res, logger)

//     if (response) {
//         res.status(200).send(response)
//     }
// }

// export default async app => {
//     const router = Router({ mergeParams: true })
//     app.use('/em-anno', router)

//     router.post('/annotation-sets', await handlePost)
//     router.get('/annotation-sets/filter', await handleGet)
//     router.delete('/annotations/:uuid', await handleDelete)
//     router.post('/annotations', await handleAdd)
// }

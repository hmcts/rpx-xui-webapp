import * as bodyParser from 'body-parser'
import {Express} from 'express'
import * as amendedJurisdictions from './amendedJurisdictions'
import {getConfigValue} from './configuration'
import {
    SERVICES_CCD_COMPONENT_API_PATH,
    SERVICES_DOCUMENTS_API_PATH, SERVICES_EM_ANNO_API_URL,
    SERVICES_ICP_API_URL, SERVICES_MARKUP_API_URL, SERVICES_PAYMENTS_URL
} from './configuration/references'
import {applyProxy} from './lib/middleware/proxy'
import * as searchCases from './searchCases'

export const initProxy = (app: Express) => {
    applyProxy(app, {
        rewrite: false,
        source: '/documents',
        target: getConfigValue(SERVICES_DOCUMENTS_API_PATH),
    })

    applyProxy(app, {
        filter: [
            '!/data/internal/searchCases',
        ],
        rewrite: false,
        source: [
            '/print',
            '/data',
        ],
        target: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH),
    })

    applyProxy(app, {
        middlewares: [bodyParser.json()],
        onReq: searchCases.modifyRequest,
        onRes: searchCases.handleElasticSearchResponse,
        rewrite: false,
        source: '/data/internal/searchCases',
        target: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH),
    })

    applyProxy(app, {
        rewrite: true,
        rewriteUrl: '/addresses',
        source: '/api/addresses',
        target: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH),
    })

    applyProxy(app, {
        onReq: amendedJurisdictions.checkCachedJurisdictions,
        onRes: amendedJurisdictions.getJurisdictions,
        rewrite: false,
        source: '/aggregated',
        target: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH),
    })

    applyProxy(app, {
        rewrite: false,
        source: '/icp',
        target: getConfigValue(SERVICES_ICP_API_URL),
        ws: true,
    })

    applyProxy(app, {
        rewrite: true,
        rewriteUrl: '/api',
        source: '/em-anno',
        target: getConfigValue(SERVICES_EM_ANNO_API_URL),
    })

    applyProxy(app, {
        rewrite: false,
        source: [
            '/api/markups',
            '/api/redaction',
        ],
        target: getConfigValue(SERVICES_MARKUP_API_URL),
    })

    applyProxy(app, {
        rewrite: true,
        rewriteUrl: '',
        source: '/payments',
        target: getConfigValue(SERVICES_PAYMENTS_URL),
    })

    /**
     * Commenting this out as it's completely bypassing the API this way,
     * which is not we want right now. If that's to be the long-term
     * solution, we'll need to move the logic around adding actions out
     * of the node layer.
     */
    // applyProxy(app, {
    //     rewrite: true,
    //     rewriteUrl: '',
    //     source: '/workallocation',
    //     target: 'http://localhost:8080',
    // })
}

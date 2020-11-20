import {Express} from 'express'
import * as amendedJurisdictions from './amendedJurisdictions'
import {getConfigValue} from './configuration'
import {
    SERVICES_CCD_COMPONENT_API_PATH,
    SERVICES_DOCUMENTS_API_PATH, SERVICES_EM_ANNO_API_URL,
    SERVICES_ICP_API_URL, SERVICES_MARKUP_API_URL, SERVICES_PAYMENTS_URL
} from './configuration/references'
import {applyProxy} from './lib/middleware/proxy'

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
            '/api/addresses',
        ],
        target: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH),
    })

    applyProxy(app, {
        onRes: amendedJurisdictions.getJurisdictions,
        rewrite: false,
        source: '/aggregated',
        target: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH),
    })

    applyProxy(app, {
        rewrite: false,
        source: '/icp',
        target: getConfigValue(SERVICES_ICP_API_URL),
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
        rewriteUrl: '/',
        source: '/payments',
        target: getConfigValue(SERVICES_PAYMENTS_URL),
    })

    applyProxy(app, {
        rewrite: false,
        source: '/workallocation',
        target: 'http://localhost:8080',
    })
}

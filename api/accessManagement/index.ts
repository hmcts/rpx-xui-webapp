/**
 * Manually creating Elastic search query
 */
export function removeAcceptHeader(proxyReq, req) {
    proxyReq.removeHeader('accept');
}

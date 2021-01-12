
export const removeCacheHeaders = (req, res, next) => {
    // remove helmet headers that prevent caching here
    res.removeHeader('Cache-Control')
    res.removeHeader('Pragma')
    res.removeHeader('Expires')
    res.removeHeader('Surrogate-Control')
    next()
}



function isRequestMatch(method, url, response) {
    return response.request.method === method && response.request.path === url
}

module.exports = { isRequestMatch }
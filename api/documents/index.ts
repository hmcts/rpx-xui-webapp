// Time configuration
const INITIAL_TIMEOUT_PERIOD = 5000; // 5 seconds
const MAX_TIMEOUT_PERIOD = 180000; // 180 seconds

// Handle requests being sent to the target server
export function handleRequest(req, res, proxyRes) {
  const defaultTimeoutPeriod = INITIAL_TIMEOUT_PERIOD;

  res.session.isRequestRateLimited = false;

  // Try to retrieve the next timeout period from the session
  const nextTimeout = res.session.nextTimeout;

  // If there is no timeout period in the session, set it to the default
  const timeoutPeriod = nextTimeout || defaultTimeoutPeriod;

  // Check if the last document upload was completed within the timeout period
  const lastUploadTime = res.session.lastUploadTime || 0;
  const elapsedTime = Date.now() - lastUploadTime;

  if (elapsedTime < timeoutPeriod) {
    res.session.isRequestRateLimited = true;
    proxyRes.status(429).send({ message: 'Too many requests' });

    return false;
  }

  return true;
}

// Handle responses being sent back to the client
export function handleResponse(req, res, proxyRes, json) {
  // Current time stored as the last time a document upload was completed
  res.session.lastUploadTime = Date.now();

  // Double the timeout period up to the maximum, if rate-limited
  if (res.session.isRequestRateLimited) {
    const nextTimeout = (res.session.nextTimeout || INITIAL_TIMEOUT_PERIOD) * 2;
    res.session.nextTimeout = Math.min(nextTimeout, MAX_TIMEOUT_PERIOD);
  } else {
    delete res.session.nextTimeout;
  }

  return json;
}


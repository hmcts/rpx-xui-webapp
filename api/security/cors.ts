import * as cors from 'cors';

const list = (process.env.CORS_ALLOWED_ORIGINS || '').split(',').filter(Boolean);

export const isOriginAllowed = (origin: string | undefined | null, allowedOrigins: string[]): boolean => {
  if (!origin) {
    return true;
  }
  return allowedOrigins.includes(origin);
};

const opts: cors.CorsOptions = {
  origin: (origin, cb) => {
    if (!origin) {
      return cb(null, true);
    }
    cb(null, isOriginAllowed(origin, list));
  },
  credentials: true,
};

export const corsMw = cors.default(opts);

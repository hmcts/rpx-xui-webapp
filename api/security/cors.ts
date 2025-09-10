import * as cors from 'cors';

const list =
  (process.env.CORS_ALLOWED_ORIGINS || '').split(',').filter(Boolean);

const opts: cors.CorsOptions = {
  origin: (origin, cb) => {
    if (!origin) {
      return cb(null, true);
    }
    const ok = list.some((o) =>
      // allow exact match or sub‑domains
      origin === o || origin.endsWith(`.${o.replace(/^https?:\/\//, '')}`)
    );
    cb(null, ok);
  },
  credentials: true
};

export const corsMw = cors(opts);

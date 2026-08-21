/* global module */

const poolRegistry = [
  {
    name: 'STAFF_ADMIN',
    usernamePattern: /^STAFF_ADMIN_(\d+)_USERNAME$/,
    userIdentifier: (match) => `STAFF_ADMIN-${match[1]}`,
    enabledBy: 'STAFF_ADMIN_POOL_ENABLED',
    tags: ['integration', 'staff-admin'],
    role: 'caseworker',
    organisation: 'staff-admin',
    jurisdictions: ['*'],
    concurrencyMode: 'reusable',
  },
  {
    name: 'BOOKING_UI_FT_ON',
    usernamePattern: /^BOOKING_UI_FT_ON_(\d+)_USERNAME$/,
    userIdentifier: (match) => `BOOKING_UI_FT_ON-${match[1]}`,
    tags: ['integration', 'booking'],
    role: 'booking-user',
    organisation: 'booking',
    jurisdictions: ['*'],
    concurrencyMode: 'reusable',
  },
  {
    name: 'HEARING_MANAGER_CR84_ON',
    usernamePattern: /^HEARING_MANAGER_CR84_ON_(\d+)_USERNAME$/,
    userIdentifier: (match) => `HEARING_MANAGER_CR84_ON-${match[1]}`,
    tags: ['integration', 'hearings', 'cr84-on'],
    role: 'hearing-manager',
    organisation: 'hearings',
    jurisdictions: ['*'],
    concurrencyMode: 'reusable',
  },
  {
    name: 'HEARING_MANAGER_CR84_OFF',
    usernamePattern: /^HEARING_MANAGER_CR84_OFF_(\d+)_USERNAME$/,
    userIdentifier: (match) => `HEARING_MANAGER_CR84_OFF-${match[1]}`,
    tags: ['integration', 'hearings', 'cr84-off'],
    role: 'hearing-manager',
    organisation: 'hearings',
    jurisdictions: ['*'],
    concurrencyMode: 'reusable',
  },
  {
    name: 'PRL_SOLICITOR',
    usernamePattern: /^PRL_SOLICITOR(\d*)_USERNAME$/,
    userIdentifier: (match) => `PRL_SOLICITOR${match[1]}`,
    tags: ['e2e', 'prl', 'solicitor'],
    role: 'solicitor',
    organisation: 'private-law-professional',
    jurisdictions: ['PRIVATELAW'],
    concurrencyMode: 'exclusive',
  },
  {
    name: 'WA_SOLICITOR',
    usernamePattern: /^WA_SOLICITOR_USERNAME$/,
    userIdentifier: () => 'WA_SOLICITOR',
    tags: ['e2e', 'wa', 'solicitor'],
    role: 'solicitor',
    organisation: 'work-allocation-legacy',
    jurisdictions: [],
    concurrencyMode: 'exclusive',
  },
];

function normaliseEmail(value) {
  return value.trim().toLowerCase();
}

function isEnabled(pool, env) {
  return !pool.enabledBy || env[pool.enabledBy] === 'true';
}

function isCompatible(identity, requirements = {}) {
  const requiredTags = requirements.tags ?? [];
  if (requiredTags.some((tag) => !identity.tags.includes(tag))) return false;
  if (requirements.pool && identity.pool !== requirements.pool) return false;
  if (requirements.role && identity.role !== requirements.role) return false;
  if (requirements.organisation && identity.organisation !== requirements.organisation) return false;
  if (
    requirements.jurisdiction &&
    !identity.jurisdictions.includes('*') &&
    !identity.jurisdictions.includes(requirements.jurisdiction)
  )
    return false;
  if (requirements.concurrencyMode && identity.concurrencyMode !== requirements.concurrencyMode) return false;
  return true;
}

function resolveConfiguredPoolIdentities(env = process.env, requirements = {}) {
  const seenEmails = new Set();
  const identities = [];
  for (const pool of poolRegistry) {
    if (!isEnabled(pool, env)) continue;
    for (const key of Object.keys(env).sort()) {
      const match = key.match(pool.usernamePattern);
      const passwordKey = key.replace(/_USERNAME$/, '_PASSWORD');
      const email = env[key]?.trim();
      if (!match || !email || !env[passwordKey]) continue;
      const normalisedEmail = normaliseEmail(email);
      if (seenEmails.has(normalisedEmail)) continue;
      const identity = {
        pool: pool.name,
        userIdentifier: pool.userIdentifier(match),
        email: normalisedEmail,
        tags: pool.tags,
        role: pool.role,
        organisation: pool.organisation,
        jurisdictions: pool.jurisdictions,
        concurrencyMode: pool.concurrencyMode,
      };
      seenEmails.add(normalisedEmail);
      if (isCompatible(identity, requirements)) identities.push(identity);
    }
  }
  return identities;
}

function resolveConfiguredSessionPoolCapacities(env = process.env, requirements = {}) {
  return resolveConfiguredPoolIdentities(env, requirements).reduce((capacities, identity) => {
    capacities[identity.pool] = (capacities[identity.pool] ?? 0) + 1;
    return capacities;
  }, {});
}

module.exports = { poolRegistry, resolveConfiguredPoolIdentities, resolveConfiguredSessionPoolCapacities };

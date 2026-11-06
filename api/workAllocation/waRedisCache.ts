import { randomUUID } from 'crypto';

import { getRedisClient, RedisClient } from '../redis/redisClient';
import { CachedCaseworker } from './interfaces/common';
import { StaffUserDetails } from './interfaces/staffUserDetails';

const CACHE_TTL_SECONDS = 720;
const LOCK_TTL_SECONDS = 90;

const CACHED_USERS_KEY = 'wa:cachedUsers';
const CACHED_USERS_WITH_ROLES_KEY = 'wa:cachedUsersWithFullRoles';
const CACHED_USERS_LOCK_KEY = `${CACHED_USERS_KEY}:lock`;
const CACHED_USERS_WITH_ROLES_LOCK_KEY = `${CACHED_USERS_WITH_ROLES_KEY}:lock`;

export type RedisLock = { status: 'acquired'; key: string; value: string } | { status: 'held' } | { status: 'unavailable' };

export type AcquiredRedisLock = Extract<RedisLock, { status: 'acquired' }>;

// get the redis client if it exists and is ready
function getClientIfExists(): RedisClient | null {
  const client = getRedisClient();

  if (!client?.isReady) {
    return null;
  }

  return client;
}

// helper functions to get/set json data in redis with TTL
async function getJson<T>(key: string): Promise<T | null> {
  const client = getClientIfExists();
  if (!client) {
    return null;
  }
  // Note that there can be prefix attached to key but this will still work
  const value = await client.get(key);

  return typeof value === 'string' ? (JSON.parse(value) as T) : null;
}

async function setJson<T>(key: string, value: T, ttlSeconds = CACHE_TTL_SECONDS): Promise<void> {
  const client = getClientIfExists();
  if (!client) {
    return;
  }

  // Redis 'EX' option sets the expiry time in seconds.
  await client.set(key, JSON.stringify(value), {
    expiration: {
      type: 'EX',
      value: ttlSeconds,
    },
  });
}

async function deleteKey(key: string): Promise<void> {
  const client = getClientIfExists();
  if (!client) {
    return;
  }

  await client.del(key);
}

// acquire a lock for the given key, with a TTL to prevent deadlocks
async function acquireLock(key: string, ttlSeconds = LOCK_TTL_SECONDS): Promise<RedisLock> {
  const client = getClientIfExists();
  if (!client) {
    return { status: 'unavailable' };
  }

  const value = randomUUID();

  const result = await client.set(key, value, {
    expiration: {
      type: 'EX',
      value: ttlSeconds,
    },
    condition: 'NX',
  });

  return result === 'OK' ? { status: 'acquired', key, value } : { status: 'held' };
}

// release the lock if it is still held
export async function releaseLock(lock: AcquiredRedisLock): Promise<void> {
  const client = getClientIfExists();
  if (!client) {
    return;
  }

  // use a Lua script to ensure we only delete the key if the value matches
  const releaseScript = `if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    end
    return 0`;

  await client.eval(releaseScript, {
    keys: [lock.key],
    arguments: [lock.value],
  });
}

export async function getCachedUsers(): Promise<StaffUserDetails[] | null> {
  return getJson<StaffUserDetails[]>(CACHED_USERS_KEY);
}

export async function setCachedUsers(users: StaffUserDetails[]): Promise<void> {
  await setJson(CACHED_USERS_KEY, users);
}

export async function clearCachedUsers(): Promise<void> {
  await deleteKey(CACHED_USERS_KEY);
}

export async function getCachedUsersWithRoles(): Promise<CachedCaseworker[] | null> {
  return getJson<CachedCaseworker[]>(CACHED_USERS_WITH_ROLES_KEY);
}

export async function setCachedUsersWithRoles(users: CachedCaseworker[]): Promise<void> {
  await setJson(CACHED_USERS_WITH_ROLES_KEY, users);
}

export async function clearCachedUsersWithRoles(): Promise<void> {
  await deleteKey(CACHED_USERS_WITH_ROLES_KEY);
}

export async function acquireCachedUsersLock(): Promise<RedisLock> {
  return acquireLock(CACHED_USERS_LOCK_KEY);
}

export async function acquireCachedUsersWithRolesLock(): Promise<RedisLock> {
  return acquireLock(CACHED_USERS_WITH_ROLES_LOCK_KEY);
}

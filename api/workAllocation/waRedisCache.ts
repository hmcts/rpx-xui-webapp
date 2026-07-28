import * as redis from 'redis';
import { randomUUID } from 'crypto';

import { getRedisClient } from '../redis/redisClient';
import { CachedCaseworker } from './interfaces/common';
import { StaffUserDetails } from './interfaces/staffUserDetails';

const CACHE_TTL_SECONDS = 720;
const LOCK_TTL_SECONDS = 90;

const CACHED_USERS_KEY = 'wa:cachedUsers';
const CACHED_USERS_WITH_ROLES_KEY = 'wa:cachedUsersWithRoles';
const CACHED_USERS_LOCK_KEY = `${CACHED_USERS_KEY}:lock`;
const CACHED_USERS_WITH_ROLES_LOCK_KEY = `${CACHED_USERS_WITH_ROLES_KEY}:lock`;

export type RedisLock = { status: 'acquired'; key: string; value: string } | { status: 'held' } | { status: 'unavailable' };

export type AcquiredRedisLock = Extract<RedisLock, { status: 'acquired' }>;

// get the redis client if it exists and is connected
function getClientIfExists(): redis.RedisClient | null {
  const client = getRedisClient();

  if (!client?.connected) {
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
  const value = await new Promise<string | null>((resolve, reject) => {
    client.get(key, (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });

  return value ? (JSON.parse(value) as T) : null;
}

async function setJson<T>(key: string, value: T, ttlSeconds = CACHE_TTL_SECONDS): Promise<void> {
  const client = getClientIfExists();
  if (!client) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    // Note: Redis 'set' command with 'EX' option sets the expiry time in seconds
    // Redis should automatically remove the key after the TTL expires
    client.set(key, JSON.stringify(value), 'EX', ttlSeconds, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

async function deleteKey(key: string): Promise<void> {
  const client = getClientIfExists();
  if (!client) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    client.del(key, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

// acquire a lock for the given key, with a TTL to prevent deadlocks
async function acquireLock(key: string, ttlSeconds = LOCK_TTL_SECONDS): Promise<RedisLock> {
  const client = getClientIfExists();
  if (!client) {
    return { status: 'unavailable' };
  }

  const value = randomUUID();

  return new Promise<RedisLock>((resolve, reject) => {
    client.set(key, value, 'EX', ttlSeconds, 'NX', (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(result === 'OK' ? { status: 'acquired', key, value } : { status: 'held' });
    });
  });
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

  await new Promise<void>((resolve, reject) => {
    client.eval(releaseScript, 1, lock.key, lock.value, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
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

import { Faker, en, en_GB } from '@faker-js/faker';

import type { DeepPartial, UkAddress } from './types';

export function createPayloadFaker(seed?: number): Faker {
  const payloadFaker = new Faker({
    locale: [en_GB, en],
  });

  if (typeof seed === 'number' && Number.isFinite(seed)) {
    payloadFaker.seed(seed);
  }

  return payloadFaker;
}

export function formatCcdDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

export function buildUkAddress(payloadFaker: Faker): UkAddress {
  return {
    AddressLine1: payloadFaker.location.streetAddress(),
    AddressLine2: '',
    AddressLine3: '',
    PostTown: payloadFaker.location.city(),
    County: '',
    Country: 'United Kingdom',
    PostCode: payloadFaker.location.zipCode('??# #??').toUpperCase(),
  };
}

export function buildCcdListItem<TValue>(payloadFaker: Faker, value: TValue, id?: string): { id: string; value: TValue } {
  return {
    id: id ?? payloadFaker.string.uuid(),
    value,
  };
}

export function buildAcasCertificateNumber(payloadFaker: Faker, receiptDate: Date): string {
  const year = String(receiptDate.getUTCFullYear()).slice(-2);
  return `R${payloadFaker.string.numeric(6)}/${year}/${payloadFaker.string.numeric(2)}`;
}

export function buildPhoneNumber(payloadFaker: Faker): string {
  return `07700 900 ${payloadFaker.string.numeric(3)}`;
}

export function mergePayloadValues<TValue extends Record<string, unknown>>(
  base: TValue,
  overrides?: DeepPartial<TValue>
): TValue {
  if (!overrides) {
    return base;
  }

  assertOverridesAgainstBase(base, overrides as Record<string, unknown>, []);

  return mergeObjects(base, overrides) as TValue;
}

function assertOverridesAgainstBase(base: Record<string, unknown>, overrides: Record<string, unknown>, path: string[]): void {
  for (const [key, overrideValue] of Object.entries(overrides)) {
    if (!(key in base)) {
      const fullPath = [...path, key].join('.');
      throw new Error(
        `Unknown override field '${fullPath}' for case payload template. ` +
          `Expected one of: ${Object.keys(base)
            .sort((a, b) => a.localeCompare(b))
            .join(', ')}`
      );
    }
    const baseValue = base[key];
    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      assertOverridesAgainstBase(baseValue, overrideValue, [...path, key]);
    }
  }
}

function mergeObjects(base: unknown, overrides: unknown): unknown {
  if (Array.isArray(overrides)) {
    return overrides;
  }

  if (!isPlainObject(base) || !isPlainObject(overrides)) {
    return overrides ?? base;
  }

  const merged: Record<string, unknown> = { ...base };
  for (const [key, overrideValue] of Object.entries(overrides)) {
    const baseValue = merged[key];
    if (typeof overrideValue === 'undefined') {
      continue;
    }
    merged[key] = mergeObjects(baseValue, overrideValue);
  }

  return merged;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function compactAddressLabel(name: string, address: UkAddress): string {
  return [name, address.AddressLine1, address.PostTown, address.PostCode, address.Country].filter(Boolean).join(', ');
}

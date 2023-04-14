import { PostUserAcceptTandCResponse } from '../interfaces/userAcceptTandCResponse';

export function some(array, predicate) {
  for (const item in array) {
    if (array[item]) {
      const result = predicate(array[item]);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

export function dotNotation(nestled: string): string {
  // eslint-disable-next-line no-useless-escape
  return nestled.replace(/[\[\]]/g, '.');
}

export function valueOrNull(object: any, nestled: string) {
  const value = exists(object, nestled, true);
  return value ? value : null;
}

export function exists(object: any, nestled: string, returnValue: boolean = false) {
  const dotArray: string[] = dotNotation(nestled).split('.');
  if (object) {
    if (dotArray.length && dotArray[0] !== '') {
      const current = dotArray[0];
      dotArray.shift();
      if (object[current]) {
        return exists(object[current], dotArray.join('.'), returnValue);
      }

      return false;
    }

    return returnValue ? object : true;
  }

  return false;
}

export function shorten(str: string, maxLen: number): string {
  return str.length > maxLen ? `${str.substring(0, maxLen)}...` : str;
}

export function isObject(o): boolean {
  return o !== null && typeof o === 'object' && Array.isArray(o) === false;
}

export function isUserTandCPostSuccessful(postResponse: PostUserAcceptTandCResponse, userId: string): any {
  return postResponse.userId === userId;
}

export function fieldNameMapper(fieldName: string, mapping: object): string {
  return mapping[fieldName] ? mapping[fieldName] : fieldName;
}

export function reflect(promise: Promise<any>): Promise<any> {
  return promise.then(
    (value) => ({ value, status: 'fulfilled' }),
    (error) => ({ error, status: 'rejected' })
  );
}

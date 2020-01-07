/**
 * Checks if nested properties exists on an object.
 *
 * Ref: https://stackoverflow.com/questions/2631001/test-for-existence-of-nested-javascript-object-key
 *
 * @see unit tests
 * @param object
 * @returns {boolean}
 */
export function propsExist(object, nestedProps) {

  for (const nestedProperty of nestedProps) {
    if (!object || !object.hasOwnProperty(nestedProperty)) {
      return false
    }
    object = object[nestedProperty]
  }

  return true
}

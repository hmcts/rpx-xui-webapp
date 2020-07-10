import { PostUserAcceptTandCResponse } from '../interfaces/userAcceptTandCResponse'

export function some(array, predicate) {
    for (const item in array) {
        if (array[item]) {
            const result = predicate(array[item])
            if (result) {
                return result
            }
        }
    }
    return null
}

export function dotNotation(nestled: string) {
    return nestled.replace(/[\[\]]/g, '.')
}

export function valueOrNull(object: any, nestled: string) {
    const value = exists(object, nestled, true)
    return value ? value : null
}

export function exists(object: any, nestled: string, returnValue = false) {
    const dotArray = dotNotation(nestled).split('.')
    if (object) {
        if (dotArray.length && dotArray[0] !== '') {
            const current = dotArray[0]
            dotArray.shift()
            if (object[current]) {
                return exists(object[current], dotArray.join('.'), returnValue)
            } else {
                return false
            }
        } else {
            return returnValue ? object : true
        }
    } else {
        return false
    }
}

export function shorten(str: string, maxLen: number): string {
    return str.length > maxLen ? `${str.substring(0, maxLen)}...` : str
}

export function isObject(o) {
    return o !== null && typeof o === 'object' && Array.isArray(o) === false
}

export function isUserTandCPostSuccessful(postResponse: PostUserAcceptTandCResponse, userId: string): any {
    return postResponse.userId === userId
}

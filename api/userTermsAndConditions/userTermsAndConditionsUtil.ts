export function postUserTermsAndConditionsUrl(baseUrl: string, idamClient: string): string {
    return `${baseUrl}/api/v1/termsAndConditions/managecases/users/${idamClient}/1`
}
export function getUserTermsAndConditionsUrl(baseUrl: string, userId: string, idamClient: string): string {
    return `${baseUrl}/api/v1/termsAndConditions/managecases/users/${userId}/${idamClient}/1`
}

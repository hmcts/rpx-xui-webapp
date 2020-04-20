export function preparePaymentsUrl(baseUrl: string, path: string): string {
    return baseUrl + path.replace('/payments/', '/')
}

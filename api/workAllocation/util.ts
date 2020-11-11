
export function prepareGetTaskUrl(url: string, taskId: string): string {
    return `${url}/task/${taskId}`
}

export function preparePostTaskUrl(url: string) {
  return `${url}/task`
}

export function preparePostTaskUnClaimUrl(url: string, taskId: string) {
  return `${url}/task/${taskId}/unclaim`
}


export function prepareGetTaskUrl(url: string, taskId: string): string {
    return `${url}/task/${taskId}`
}

export function preparePostTaskUrl(url: string) {
  return `${url}/task`
}

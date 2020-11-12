
export function prepareGetTaskUrl(url: string, taskId: string): string {
    return `${url}/task/${taskId}`
}

export function preparePostTaskUrl(url: string) {
  return `${url}/task`
}

export function preparePostTaskUrlAction(url: string, taskId: string, action: string): string {
  return `${url}/task/${taskId}/${action}`
}

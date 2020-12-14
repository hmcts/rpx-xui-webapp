export interface TaskSearchParameters {
    parameters: TaskSearchParameter[]
}

export interface TaskSearchParameter {
    ccdId?: string
    eventId?: string
    jurisdiction?: string[]
    location?: string[]
    postEventState?: string
    preEventState?: string
    state?: string[]
    user?: string[]
}

export interface SearchTaskParameter {
  key: string
  operator: string
  values: string[]
}

export interface SearchTaskRequest {
  search_parameters: SearchTaskParameter[]
}

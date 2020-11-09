interface TaskSearchParameters {
    parameters: TaskSearchParameter[]
}

interface TaskSearchParameter {
    ccdId?: string
    eventId?: string
    jurisdiction?: string[]
    location?: string[]
    postEventState?: string
    preEventState?: string
    state?: string[]
    user?: string[]
}

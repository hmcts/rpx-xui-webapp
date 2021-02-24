export interface TaskList {
    tasks: Task[]
}

export interface Task {
    assignee: Assignee
    caseData: CaseData
    dueDate: Date
    name: string
    state: string
}

export interface Assignee {
    id: string
    userName: string
}

export interface CaseData {
    category: string
    location: LocationSummary
    name: string
    reference: string
}

export interface LocationSummary {
    id: string
    locationName: string
}

export interface Location {
    id: string
    locationName: string
    services: string[]
}

export interface Caseworker {
    firstName: string
    lastName: string
    idamId: string
    email: string
    location: Location
}

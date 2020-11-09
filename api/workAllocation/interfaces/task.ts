interface TaskList {
    tasks: Task[]
  }

interface Task {
    assignee: Assignee
    caseData: CaseData
    dueDate: Date
    name: string
    state: string
}

interface Assignee {
    id: string
    userName: string
}

interface CaseData {
    category: string
    location: LocationSummary
    name: string
    reference: string
}

interface LocationSummary {
    id: string
    locationName: string
}

interface Location {
    id: string
    locationName: string
    services: string[]
}

interface Caseworker {
    firstName: string
    lastName: string
    idamId: string
    location: Location
}

import { TaskAction } from '.';

export default interface Task {
  [key: string]: any
  assignee: string
  assigneeName: string
  id: string
  case_id: string
  caseName: string
  caseCategory: string
  location: string
  description: string
  taskName: string
  dueDate: Date
  actions: TaskAction[]
  warnings?: boolean
  derivedIcon?: string
  jurisdiction?: string
  isNew?: boolean
}

export interface TaskResponse {
  tasks: Task[]
  total_records: number
}

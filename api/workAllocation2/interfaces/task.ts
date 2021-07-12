export interface TaskList {
  tasks: Task[];
}

export interface Task {
  id: string;
  type: string;
  task_state: string;
  task_system: string;
  security_classification: string;
  task_title: string;
  created_date: string;
  due_date: string;
  location_name: string;
  location: string;
  jurisdiction: string;
  region: string;
  case_type_id: string;
  case_id: string;
  case_category: string;
  case_name: string;
  auto_assigned: boolean;
  actions: TaskAction[];
  execution_type: string;
  assignee: string;
  dueDate: string;
  taskName: string;
  caseName: string;
  caseCategory: string;
  assigneeName: string;
  name: string;
}

export interface TaskAction {
  id: string;
  title: string;
}

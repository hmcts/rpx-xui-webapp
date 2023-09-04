export interface Task {
    assignee?: string;
    auto_assigned?: boolean;
    case_category: string;
    case_id: string;
    case_management_category?: string;
    case_name?: string;
    case_type_id?: string;
    created_date: string;
    due_date?: string;
    execution_type?: string;
    id: string;
    jurisdiction: string;
    location?: string;
    location_name?: string;
    name?: string;
    permissions: {
        values: Permissions[];
    };
    region?: string;
    security_classification?: string;
    task_state?: string;
    task_system?: string;
    task_title?: string;
    type?: string;
    warning_list?: {
        values: string[];
    };
    warnings?: true;
    work_type_id?: string;
}
export declare enum Permissions {
    Own = "OWN",
    Execute = "EXECUTE",
    Read = "READ",
    Manage = "MANAGE",
    Cancel = "CANCEL"
}
export declare enum TaskState {
    UnConfigured = "UNCONFIGURED",
    PendingAutoAssign = "PENDING_AUTO_ASSIGN",
    Assigned = "ASSIGNED",
    Configured = "CONFIGURED",
    Unassigned = "UNASSIGNED",
    Completed = "COMPLETED",
    Cancelled = "CANCELLED",
    Terminated = "TERMINATED",
    PendingReConfiguration = "PENDING_RECONFIGURATION"
}
//# sourceMappingURL=Task.d.ts.map
import { faker } from '@faker-js/faker';

export function deterministicCaseDetailsTasksMock(caseId: string) {
  [{
    "id": "8d2199fd-0110-11f1-827d-fadcb493f149",
    "name": "Follow-up extended direction",
    "type": "followUpExtendedDirection",
    "task_state": "unassigned",
    "task_system": "SELF",
    "security_classification": "PUBLIC",
    "task_title": "Follow-up extended direction",
    "created_date": "2026-02-03T14:56:42+0000",
    "due_date": "2026-02-05T14:57:00+0000",
    "location_name": "Manchester",
    "location": "512401",
    "execution_type": "Case Management Task",
    "jurisdiction": "IA",
    "region": "1",
    "case_type_id": "Asylum",
    "case_id": caseId,
    "case_category": "Protection",
    "case_name": "redacted - appellantgivennames redacted - appellantfamilyname",
    "auto_assigned": false,
    "warnings": false,
    "warning_list": {
        "values": []
    },
    "case_management_category": "Protection",
    "work_type_id": "routine_work",
    "work_type_label": "Routine work",
    "permissions": {
        "values": ["read", "own", "manage", "cancel", "complete", "claim", "assign", "unassign"]
    },
    "description": "",
    "role_category": "LEGAL_OPERATIONS",
    "minor_priority": 500,
    "major_priority": 5000,
    "priority_date": "2026-02-05T14:57:00+0000",
    "dueDate": "2026-02-05T14:57:00+0000",
    "actions": [{
        "id": "assign",
        "title": "Assign task"
    }, {
        "id": "cancel",
        "title": "Cancel task"
    }, {
        "id": "claim",
        "title": "Assign to me"
    }]
}]

}

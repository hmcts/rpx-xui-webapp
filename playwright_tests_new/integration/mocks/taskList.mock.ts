import { faker } from '@faker-js/faker';

export const actions = [
    { id: "cancel", title: "Cancel task" },
    { id: "complete", title: "Mark as done" },
    { id: "go", title: "Go to task" },
    { id: "reassign", title: "Reassign task" },
    { id: "unclaim", title: "Unassign task" }
];

export const permissions = {
    values: ["read", "own", "manage", "execute", "cancel", "complete", "claim", "assign", "unassign"]
};

export const dateOptions = [
    { label: 'yesterday', value: faker.date.recent({ days: 2 }) },
    { label: 'today', value: new Date() },
    { label: 'tomorrow', value: faker.date.soon({ days: 1 }) },
    { label: 'next week', value: faker.date.soon({ days: 7 }) },
    { label: 'next month', value: faker.date.soon({ days: 30 }) },
    { label: 'future', value: faker.date.soon({ days: faker.number.int({ min: 14, max: 180 }) }) }
];

export function buildTaskListMock(rowCount: number = 3, assignee: string ) {
    const maxResults = 25;
    const tasks = Array.from({ length: Math.min(rowCount, maxResults) }, (_, i) => {
        // Created date: always in the past (up to 90 days ago)
        const createdDate = faker.date.past({ years: 0.25 });
        // Due date: pick from options
        const dueOpt = faker.helpers.arrayElement(dateOptions);
        const dueDate = dueOpt.value;
        // Hearing date: random future date (or null)
        const hearingDate = faker.datatype.boolean() ? faker.date.soon({ days: faker.number.int({ min: 1, max: 90 }) }) : null;
        // Format as ISO8601 with timezone
        const formatDate = (d: Date | null) => d ? d.toISOString().replace(/\.\d{3}Z$/, '+0000') : '';
        // Priority: random int 1-10
        const priority = faker.number.int({ min: 1, max: 10 });
        // Case name/category/location/task
        const caseName = faker.company.name();
        const caseCategory = 'Protection';
        const locationName = 'Taylor House';
        const taskTitle = faker.word.words({ count: { min: 2, max: 5 } });
        // Compose case_fields for table mapping
        const case_fields = {
            'Case name': caseName,
            'Case category': caseCategory,
            'Location': locationName,
            'Task': taskTitle,
            'Due date': formatDate(dueDate),
            'Hearing date': formatDate(hearingDate),
            'Priority': priority,
        };
        return {
            id: faker.string.uuid(),
            name: taskTitle,
            assignee: assignee,
            type: "processApplicationUpdateHearingRequirements",
            task_state: "assigned",
            task_system: "SELF",
            security_classification: "PUBLIC",
            task_title: taskTitle,
            created_date: formatDate(createdDate),
            due_date: formatDate(dueDate),
            location_name: locationName,
            location: '765324',
            execution_type: "Case Management Task",
            jurisdiction: "IA",
            region: "1",
            case_type_id: "Asylum",
            case_id: faker.number.int({ min: 1000000000000000, max: 9999999999999999 }).toString(),
            case_category: caseCategory,
            case_name: caseName,
            auto_assigned: false,
            warnings: false,
            warning_list: { values: [] },
            case_management_category: caseCategory,
            work_type_id: "applications",
            work_type_label: "Applications",
            permissions,
            description: `[Decide an application](/case/IA/Asylum/${faker.number.int({ min: 1000000000000000, max: 9999999999999999 })}/trigger/decideAnApplication)`,
            role_category: "LEGAL_OPERATIONS",
            minor_priority: priority,
            major_priority: priority * 1000,
            priority_date: formatDate(dueDate),
            dueDate: formatDate(dueDate),
            actions,
            case_fields
        };
    });

    return {
        tasks,
        total_records: rowCount
    };
}
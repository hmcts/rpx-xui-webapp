
@ng @integration_todo @test
Feature: WA Release 2: Case details Tasks tab (Integration to be done)

    Requirements from
    https://tools.hmcts.net/confluence/pages/viewpage.action?pageId=1466503344#WorkAllocationRelease2and2.1-ManagelinklogicforTasksandCases



    Scenario Outline: Task tab content displayed
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |
        Given I set MOCK request "/workallocation2/case/task/:caseid" response log to report

        Given I set MOCK case details with reference "caseDetails"
        Given I set MOCK case details "caseDetails" property "Jurisdiction" as "IA"
        Given I set MOCK case list values
            | case_id          |
            | 1234567812345678 |
            | 1234567812345679 |
        Given I set MOCK case tasks with userDetails from reference "userDetails"
            | id                 | task_title                                | assignee    | assigneeName | created_date | dueDate | permissions        | warnings | description                                                                                                                                                              |
            | 987654321987654321 | Task 1                                    | thissession | Test user    | -10          | -1      | Own,Manage,Execute | true     | Click link to proceed to next step [test link next step](/case/case-details/${case_id})                                                                                  |
            | 987654321987654322 | Task 2                                    | someone     | Test 2 user  | -10          | 0       | Own,Manage,Execute | true     | Click link to proceed to [next step 1](/case/case-details/${case_id}) or \n Click link to proceed to [next step 2](/case/case-details/${case_id}/${task_id}/testaction2) |
            |                    | Task 3                                    |             |              | -10          | 1       | Own,Manage,Execute | true     |                                                                                                                                                                          |
            |                    | Task 4                                    |             |              | -10          | 10      |                    | true     |                                                                                                                                                                          |
            |                    | Task 5                                    |             |              | -10          | 10      |                    | true     |                                                                                                                                                                          |
            |                    | 6 Permissions OME assined to me           | thissession | Test user    | -10          | 10      | Own,Manage,Execute | true     |                                                                                                                                                                          |
            |                    | 7 Permissions OME assigned to someother   | someone     | Test 3 user  | -10          | 10      | Own,Manage,Execute | true     |                                                                                                                                                                          |
            |                    | 8 Permissions OME unassigned              |             |              | -10          | 10      | Own,Manage,Execute | true     |                                                                                                                                                                          |
            |                    | 9 Permissions ME assined to me            | thissession | Test user    | -10          | 10      | Manage,Execute     | true     |                                                                                                                                                                          |
            |                    | 10 Permissions ME assigned to someother   | someone     | Test 4 user  | -10          | 10      | Manage,Execute     | true     |                                                                                                                                                                          |
            |                    | 11 Permissions ME unassigned              |             |              | -10          | 10      | Manage,Execute     | true     |                                                                                                                                                                          |
            |                    | 12 Permissions M assigned to someother    | someone     | Test 5 user  | -10          | 10      | Manage             | true     |                                                                                                                                                                          |
            |                    | 13 Permissions M unassigned               |             |              | -10          | 10      | Manage             | true     |                                                                                                                                                                          |
            |                    | 14 Permissions none assigned to someother | someone     | Test 6 user  | -10          | 10      |                    | true     |                                                                                                                                                                          |
            |                    | 15 Permissions none unassigned            |             |              | -10          | 10      |                    | true     |                                                                                                                                                                          |
        # https://tools.hmcts.net/confluence/pages/viewpage.action?pageId=1466503344#WorkAllocationRelease2and2.1-ManagelinklogicforTasksandCases

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        When I click tab with label "Tasks" in case details page

        Then I validate case details task tab page is displayed
        Then I validate task tab alert banner header is "Task alert"
        Then I validate task tab alert banner message is "An application is pending a decision. Consider if this application has an impact on any other tasks you might wish to complete."
        Then I validate task tab active tasks container displayed
        Then I validate task tab active tasks displayed count 15


        Then I validate task tab active task at position 1 with task name "Task 1" has attributes
            | name         | isDisplayed              | contentType     | text                                                   | href                               |
            | Task created | <TaskcreatedIsDisplayed> |                 | -10                                                    |                                    |
            | Priority     | <PriorityIsDisplayed>    |                 | HIGH                                                   |                                    |
            | Due date     | <DuedateIsDisplayed>     |                 | -1                                                     |                                    |
            | Assigned to  | true                     |                 |                                                        |                                    |
            | Manage       | true                     | link            | Reassign                                               |                                    |
            | Manage       | true                     | link            | Unassign                                               |                                    |
            | Next steps   | true                     |                 | Click link to proceed to next step test link next step |                                    |
            | Next steps   | true                     | link            | test link next step                                    |                                    |
            | Next steps   | true                     | linkURLContains | test link next step                                    | case/case-details/1234567812345678 |
            | Next steps   | true                     | linkURLContains | test link next step                                    | tid=987654321987654321             |


        Then I validate task tab active task at position 2 with task name "Task 2" has attributes
            | name         | isDisplayed              | contentType     | text                              | href                                                              |
            | Task created | <TaskcreatedIsDisplayed> |                 | -10                               |                                                                   |
            | Priority     | <PriorityIsDisplayed>    |                 | MEDIUM                            |                                                                   |
            | Due date     | <DuedateIsDisplayed>     |                 | 0                                 |                                                                   |
            | Assigned to  | true                     |                 |                                   |                                                                   |
            | Manage       | true                     | link            | Assign to me                      |                                                                   |
            | Manage       | true                     | link            | Reassign                          |                                                                   |
            | Manage       | true                     | link            | Unassign                          |                                                                   |
            | Next steps   | true                     | link            | Click link to proceed next step 1 |                                                                   |
            | Next steps   | true                     | link            | Click link to proceed next step 2 |                                                                   |
            | Next steps   | true                     | linkURLContains | Click link to proceed next step 1 | case/case-details/1234567812345678                                |
            | Next steps   | true                     | linkURLContains | Click link to proceed next step 2 | case/case-details/1234567812345678/987654321987654322/testaction2 |



        Then I validate task tab active task at position 3 with task name "Task 3" has attributes
            | name         | isDisplayed              | contentType | text         |
            | Task created | <TaskcreatedIsDisplayed> |             | -10          |
            | Priority     | <PriorityIsDisplayed>    |             | LOW          |
            | Due date     | <DuedateIsDisplayed>     |             | 1            |
            | Assigned to  | true                     |             |              |
            | Manage       | true                     | link        | Assign to me |
            | Manage       | true                     | link        | Assign       |
            | Next steps   | false                    |             |              |

        Then I validate task tab active task at position 4 with task name "Task 4" has attributes
            | name         | isDisplayed              | contentType | text |
            | Task created | <TaskcreatedIsDisplayed> |             | -10  |
            | Priority     | <PriorityIsDisplayed>    |             | LOW  |
            | Due date     | <DuedateIsDisplayed>     |             | 10   |
            | Assigned to  | true                     |             |      |
            | Manage       | false                    |             |      |
            | Next steps   | false                    |             |      |
        Then I validate task tab active task at position 5 with task name "Task 5" has attributes
            | name         | isDisplayed              | contentType | text |
            | Task created | <TaskcreatedIsDisplayed> |             | -10  |
            | Priority     | <PriorityIsDisplayed>    |             | LOW  |
            | Due date     | <DuedateIsDisplayed>     |             | 10   |
            | Assigned to  | true                     |             |      |
            | Manage       | false                    |             |      |
            | Next steps   | false                    |             |      |

        Then I validate task tab active task at position 6 with task name "6 Permissions OME assined to me" has attributes
            | name         | isDisplayed              | contentType | text      |
            | Task created | <TaskcreatedIsDisplayed> |             | -10       |
            | Priority     | <PriorityIsDisplayed>    |             | LOW       |
            | Due date     | <DuedateIsDisplayed>     |             | 10        |
            | Assigned to  | true                     |             | Test user |
            | Manage       | true                     | link        | Reassign  |
            | Manage       | true                     | link        | Unassign  |
            | Next steps   | true                     |             |           |

        Then I validate task tab active task at position 7 with task name "7 Permissions OME assigned to someother" has attributes
            | name         | isDisplayed              | contentType | text         |
            | Task created | <TaskcreatedIsDisplayed> |             | -10          |
            | Priority     | <PriorityIsDisplayed>    |             | LOW          |
            | Due date     | <DuedateIsDisplayed>     |             | 10           |
            | Assigned to  | true                     |             | Test 3 user  |
            | Manage       | true                     | link        | Assign to me |
            | Manage       | true                     | link        | Reassign     |
            | Manage       | true                     | link        | Unassign     |
            | Next steps   | false                    |             |              |

        Then I validate task tab active task at position 8 with task name "8 Permissions OME unassigned" has attributes
            | name         | isDisplayed              | contentType | text         |
            | Task created | <TaskcreatedIsDisplayed> |             | -10          |
            | Priority     | <PriorityIsDisplayed>    |             | LOW          |
            | Due date     | <DuedateIsDisplayed>     |             | 10           |
            | Assigned to  | true                     |             | Unassigned   |
            | Manage       | true                     | link        | Assign to me |
            | Next steps   | false                    |             |              |
        Then I validate task tab active task at position 9 with task name "9 Permissions ME assined to me" has attributes
            | name         | isDisplayed              | contentType | text      |
            | Task created | <TaskcreatedIsDisplayed> |             | -10       |
            | Priority     | <PriorityIsDisplayed>    |             | LOW       |
            | Due date     | <DuedateIsDisplayed>     |             | 10        |
            | Assigned to  | true                     |             | Test user |
            | Manage       | true                     | link        | Reassign  |
            | Manage       | true                     | link        | Unassign  |
            | Next steps   | true                     |             |           |

        Then I validate task tab active task at position 10 with task name "10 Permissions ME assigned to someother" has attributes
            | name         | isDisplayed              | contentType | text         |
            | Task created | <TaskcreatedIsDisplayed> |             | -10          |
            | Priority     | <PriorityIsDisplayed>    |             | LOW          |
            | Due date     | <DuedateIsDisplayed>     |             | 10           |
            | Assigned to  | true                     |             | Test 4 user  |
            | Manage       | true                     | link        | Assign to me |
            | Manage       | true                     | link        | Reassign     |
            | Manage       | true                     | link        | Unassign     |
            | Next steps   | false                    |             |              |

        Then I validate task tab active task at position 11 with task name "11 Permissions ME unassigned" has attributes
            | name         | isDisplayed              | contentType | text         |
            | Task created | <TaskcreatedIsDisplayed> |             | -10          |
            | Priority     | <PriorityIsDisplayed>    |             | LOW          |
            | Due date     | <DuedateIsDisplayed>     |             | 10           |
            | Assigned to  | true                     |             | Unassigned   |
            | Manage       | true                     | link        | Assign to me |
            | Next steps   | false                    |             |              |

        Then I validate task tab active task at position 12 with task name "12 Permissions M assigned to someother" has attributes
            | name         | isDisplayed              | contentType | text        |
            | Task created | <TaskcreatedIsDisplayed> |             | -10         |
            | Priority     | <PriorityIsDisplayed>    |             | LOW         |
            | Due date     | <DuedateIsDisplayed>     |             | 10          |
            | Assigned to  | true                     |             | Test 5 user |
            | Manage       | true                     | link        | Reassign    |
            | Manage       | true                     | link        | Unassign    |
            | Next steps   | false                    |             |             |

        Then I validate task tab active task at position 13 with task name "13 Permissions M unassigned" has attributes
            | name         | isDisplayed              | contentType | text       |
            | Task created | <TaskcreatedIsDisplayed> |             | -10        |
            | Priority     | <PriorityIsDisplayed>    |             | LOW        |
            | Due date     | <DuedateIsDisplayed>     |             | 10         |
            | Assigned to  | true                     |             | Unassigned |
            | Manage       | false                    |             |            |
            | Next steps   | false                    |             |            |

        Then I validate task tab active task at position 14 with task name "14 Permissions none assigned to someother" has attributes
            | name         | isDisplayed              | contentType | text        |
            | Task created | <TaskcreatedIsDisplayed> |             | -10         |
            | Priority     | <PriorityIsDisplayed>    |             | LOW         |
            | Due date     | <DuedateIsDisplayed>     |             | 10          |
            | Assigned to  | true                     |             | Test 6 user |
            | Manage       | false                    |             |             |
            | Next steps   | false                    |             |             |

        Then I validate task tab active task at position 15 with task name "15 Permissions none unassigned" has attributes
            | name         | isDisplayed              | contentType | text       |
            | Task created | <TaskcreatedIsDisplayed> |             | -10        |
            | Priority     | <PriorityIsDisplayed>    |             | LOW        |
            | Due date     | <DuedateIsDisplayed>     |             | 10         |
            | Assigned to  | true                     |             | Unassigned |
            | Manage       | false                    |             |            |
            | Next steps   | false                    |             |            |
        Examples:
            | roles                                                                            | PriorityIsDisplayed | DuedateIsDisplayed | TaskcreatedIsDisplayed |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor | true                | true               | false                  |
            | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor   | false               | false              | true                   |



@ng  
Feature: WA Release 2: Case details Tasks tab - Manage links (@integration_todo)

    Feature Description

    Background: Mock setup

      
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |
        Given I set MOCK case details with reference "caseDetails"
        Given I set MOCK case details "caseDetails" property "Jurisdiction" as "IA"

        Given I set MOCK case tasks with userDetails from reference "userDetails"
            | task_title                                | assignee    | assigneeName | created_date | due_date | permissions        | warnings | description                                                                             |
            | Task 1                                    | thissession | Test user    | -10          | -1      | Own,Manage,Execute | true     | Click link to proceed to next step [test link next step](/case/case-details/${case_id}) |
            | Task 2                                    | someone     | Test 2 user  | -10          | 0       | Own,Manage,Execute | true     | Click link to proceed to next step [test link next step](/case/case-details/${case_id}) |
            | Task 3                                    |             |              | -10          | 1       | Own,Manage,Execute | true     |                                                                                         |
            | Task 4                                    |             |              | -10          | 10      |                    | true     |                                                                                         |
            | Task 5                                    |             |              | -10          | 10      |                    | true     |                                                                                         |
            | 6 Permissions OME assined to me           | thissession | Test user    | -10          | 10      | Own,Manage,Execute | true     |                                                                                         |
            | 7 Permissions OME assigned to someother   | someone     | Test 3 user  | -10          | 10      | Own,Manage,Execute | true     |                                                                                         |
            | 8 Permissions OME unassigned              |             |              | -10          | 10      | Own,Manage,Execute | true     |                                                                                         |
            | 9 Permissions ME assined to me            | thissession | Test user    | -10          | 10      | Manage,Execute     | true     |                                                                                         |
            | 10 Permissions ME assigned to someother   | someone     | Test 4 user  | -10          | 10      | Manage,Execute     | true     |                                                                                         |
            | 11 Permissions ME unassigned              |             |              | -10          | 10      | Manage,Execute     | true     |                                                                                         |
            | 12 Permissions M assigned to someother    | someone     | Test 5 user  | -10          | 10      | Manage             | true     |                                                                                         |
            | 13 Permissions M unassigned               |             |              | -10          | 10      | Manage             | true     |                                                                                         |
            | 14 Permissions none assigned to someother | someone     | Test 6 user  | -10          | 10      |                    | true     |                                                                                         |
            | 15 Permissions none unassigned            |             |              | -10          | 10      |                    | true     |                                                                                         |

    Scenario: Task manage link actions Assign to me
       
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

        When I click manage link "Assign to me" for task at position 7 in case details tasks tab
        Then I see case details tab label "Tasks" is displayed is "true"
        Then I see case details page with message banner "You've assigned yourself a task"

    
    Scenario: Task manage link actions Reassign

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

        When I click manage link "Reassign" for task at position 7 in case details tasks tab

        Then In workflow "Reassign task", I see select role type page displayed with header "Choose a role type"
        Then In workflow "Reassign task", I see select role type page displayed with caption "Reassign task"
        Then In workflow "Reassign task", I see select role type radio options "Legal Ops,Judicial"
        Then In workflow "Reassign task", I select role type radio options "Legal Ops"
        When In workflow "Reassign task", I click continue

        Then In workflow "Reassign task", I see find person page displayed with caption "Reassign task"
        When In workflow "Reassign task", I enter search term "jane" in find person input text
        
        When In workflow "Reassign task", I select find person result "testemail0@testdomain.com"
        Then In workflow "Reassign task", I see find person is selected with "testemail0@testdomain.com"

        When In workflow "Reassign task", I click continue

        Then I see task check your changes page for action "Reassign task" displayed

        Then I validate task details displayed in check your changes page
            | Case name        | Case category      | Location      |
            | Allwork test scr | auto test category | London QA lab |

        Then I validate column "Person" value is set to "Jane 0 Doe" in task check your changes page
        When I click submit button "Reassign" in task check your changes page
        # Then I see navigation header tab page "My work"
        Then I see case details tab label "Tasks" is displayed is "true"

        Then I see case details page with message banner "You've reassigned a task to somebody else"



    Scenario: Task manage link actions Unassign

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

        When I click manage link "Unassign" for task at position 7 in case details tasks tab
        Then I see "Unassign task" task action page
        Then I validate task action page has description "Unassign this task. This will send it back to the available task list for someone to pick up."

        Then I validate task list table columns displayed for user "Judge"
            | ColumnHeader  | Caseworker | Judge |
            | Case name     | Yes        | Yes   |
            | Case category | Yes        | Yes   |
            | Location      | Yes        | Yes   |
            | Task          | Yes        | Yes   |
            | Task created  | No         | Yes   |
            | Due date      | Yes        | No    |
            | Priority      | Yes        | No    |


        Then I validate task details displayed in task action page
            | Case name        | Case category      | Location      |
            | Allwork test scr | auto test category | London QA lab |

        When I click "Unassign" submit button in task action page
        Then I see case details tab label "Tasks" is displayed is "true"

        Then I see case details page with message banner "You've unassigned a task."

# Then I validate notification banner messages displayed in "My work" page
#     | message                                   |
#     | <bannermessage> |




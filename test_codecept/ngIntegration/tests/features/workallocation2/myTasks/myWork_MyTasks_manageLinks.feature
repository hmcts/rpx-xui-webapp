@ng @functional_enabled
Feature: WA Release 2: My work - My tasks - Manage links

    Background: Mock and browser setup
        Given I init MockApp



    Scenario Outline:  My Tasks, colums and column links for "<UserType>"
        
        Given I set MOCK with user details
            | roles        | <Roles>,task-supervisor,case-allocator |
            | roleCategory | <roleCategory>                         |
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation |
            | IA           | Y           | ORGANISATION | 20001        |
            | SSCS         | Y           | ORGANISATION | 20001        |
        Given I set MOCK person with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator"
            | locationId | locationName           |
            | 20001      | IA Court Aldgate Tower |


        Given I set MOCK case "defaultCase" details with reference "WA_Case"
        Given I set MOCK case details "WA_Case" property "case_type.id" as "Asylum"

        Given I set MOCK case details "WA_Case" property "jurisdiction.id" as "IA"
        Given I set MOCK case details "WA_Case" trigger id "text" trigger name "Test event"


        Given I set MOCK tasks with permissions for view "My tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK tasks with attributes for view "My tasks"
            | index | permissions                | assignee            | case_name |
            | 0     | Manage,Read,Execute,Cancel,assign,unassign |                     | case 1    |
            | 1     | Manage,assign,unassign                    |                     | case 2    |
            | 2     | Read                       |                     | case 3    |
            | 3     | Manage,Read,unassign,assign              | 1234-1234-1234-1234 | case 4    |
            | 4     | Manage,unassign,assign                    | 1234-1234-1234-1234 | case 5    |
            | 5     | Read                       | 1234-1234-1234-1234 | case 6    |
        Given I set MOCK task details for WA release2
            | case_name        | case_category      | location_name |
            | Allwork test scr | auto test category | London QA lab |

        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "My work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Then I validate manage link actions for tasks
            | index | actions                                |
            | 1     | Reassign task,Unassign task,Go to task |
            | 2     | Reassign task,Unassign task,Go to task |
            | 4     | Reassign task,Unassign task,Go to task |
            | 5     | Reassign task,Unassign task,Go to task |
        When I open Manage link for task at row 1
        Then I see action link "Go to task" is present for task with Manage link open
        When I click action link "Go to task" on task with Manage link open
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        Then I see case details tab label "Tasks" is selected is "true"

        Examples:
            | UserIdentifier | UserType | Roles | roleCategory |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |LEGAL_OPERATIONS|
            # | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |JUDICIAL|


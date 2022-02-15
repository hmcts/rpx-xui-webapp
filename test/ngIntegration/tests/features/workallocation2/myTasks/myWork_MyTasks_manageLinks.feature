@ng
Feature: WA Release 2: My work - My tasks - Manage links

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK tasks with permissions for view "My tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK tasks with attributes for view "My tasks"
            | index | permissions                | assignee            | case_name |
            | 0     | Manage,Read,Execute,Cancel |                     | case 1    |
            | 1     | Manage                     |                     | case 2    |
            | 2     | Read                       |                     | case 3    |
            | 3     | Manage,Read                | 1234-1234-1234-1234 | case 4    |
            | 4     | Manage                     | 1234-1234-1234-1234 | case 5    |
            | 5     | Read                       | 1234-1234-1234-1234 | case 6    |
        Given I set MOCK task details for WA release2
            | case_name        | case_category      | location_name |
            | Allwork test scr | auto test category | London QA lab |
        Given I set MOCK locations with names in service "IA"
            | id    | locationName           |
            | 20001 | IA Court Aldgate Tower |
            | 20002 | IA Court Birmingham    |
            | 2003  | IA Court Bradford      |
            | 20004 | IA Court Glasgow       |
            | 20005 | IA Court Hatton Cross  |
            | 20006 | IA Court Newcastle     |
            | 20007 | IA Court Newport       |
            | 20008 | IA Court North Shields |
            | 20009 | IA Court Taylor House  |

            
    Scenario Outline:  My Tasks, colums and column links for "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
       
        Given I set MOCK person with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator"
            | locationId | locationName           |
            | 20001      | IA Court Aldgate Tower |
        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "My work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Then I validate manage link actions for tasks
            | index | actions                                |
            | 1     | Reassign task,Unassign task,Go to task |
            | 2     | Reassign task,Unassign task,Go to task |
            | 3     |                                        |
            | 4     | Reassign task,Unassign task,Go to task |
            | 5     | Reassign task,Unassign task,Go to task |
            | 6     |                                        |
        When I open Manage link for task at row 1
        Then I see action link "Go to task" is present for task with Manage link open
        When I click action link "Go to task" on task with Manage link open
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        Then I see case details tab label "Tasks" is selected is "true"

        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            # | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |


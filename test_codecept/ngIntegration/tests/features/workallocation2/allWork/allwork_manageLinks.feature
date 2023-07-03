@ng @functional_enabled
Feature: WA Release 2: All work - Manage links

    Background: Mock and browser setup
        Given I init MockApp

    Scenario Outline:  Task Manage links for "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        # Given I set MOCK request "/workallocation/taskWithPagination" response log to report
        Given I set MOCK tasks with permissions for view "All work" and assigned state "assigned"
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK tasks with attributes for view "AllWork"
            | index | permissions                       | assignee            | case_name |
            | 0     | Manage,Read,Execute,Cancel,assign |                     | case 1    |
            | 1     | Manage,assign                     |                     | case 2    |
            # | 2     | Read,assign                       |                     | case 3    |
            | 3     |                    | 1234-1234-1234-1234 | case 4    |
            | 4     | Manage,unassign,assign            | 1234-1234-1234-1234 | case 5    |
            # | 5     |                                   | 1234-1234-1234-1234 | case 6    |
        Given I set MOCK task details for WA release2
            | case_name        | case_category      | location_name |
            | Allwork test scr | auto test category | London QA lab |


        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "All work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Then I validate manage link actions for tasks
            | index | actions                                |
            | 1     | Assign task,Go to task                 |
            | 2     | Assign task,Go to task                 |
            | 4     | Reassign task,Unassign task,Go to task |

        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
# | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |


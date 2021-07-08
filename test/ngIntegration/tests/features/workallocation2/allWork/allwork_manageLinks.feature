@ng @test
Feature: WA Release 2: All work - Manage links

    Background: Mock and browser setup
        Given I init MockApp

    Scenario Outline:  My Tasks, colums and column links for "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK tasks with permissions for view "All work" and assigned state "assigned"
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK tasks with attributes for view "AllWork"
            | index | permissions | assignee            | case_name |
            | 0     | Manage,Read |                     | case 1    |
            | 1     | Manage      |                     | case 2    |
            | 2     | Read        |                     | case 3    |
            | 3     | Manage,Read | 1234-1234-1234-1234 | case 4    |
            | 4     | Manage      | 1234-1234-1234-1234 | case 5    |
            | 5     | Read        | 1234-1234-1234-1234 | case 6    |


        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "All work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Then I validate manage link actions for tasks
            | index | actions                                |
            | 0     | Assign task,Go to task                 |
            | 1     | Assign task,Go to task                 |
            | 2     |                                        |
            | 3     | Reassign task,Unassign task,Go to task |
            | 4     | Reassign task,Unassign task,Go to task |
            | 5     |                                        |

        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |


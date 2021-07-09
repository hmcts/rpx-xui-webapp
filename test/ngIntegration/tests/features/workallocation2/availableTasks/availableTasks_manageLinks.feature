@ng 
Feature: WA Release 2: My work - Available tasks - Manage links

    Background: Mock and browser setup
        Given I init MockApp

    Scenario Outline:  My Tasks, colums and column links for "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK tasks with permissions for view "Available tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK tasks with attributes for view "AvailableTasks"
            | index | permissions | assignee            | case_name |
            | 0     | Manage,Read |                     | case 1    |
            | 1     | Manage      |                     | case 2    |
            | 2     | Read        |                     | case 3    |
            | 3     | Manage,Read | 1234-1234-1234-1234 | case 4    |
            | 4     | Manage      | 1234-1234-1234-1234 | case 5    |
            | 5     | Read        | 1234-1234-1234-1234 | case 6    |


        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "My work", I see selected tab page displayed
        When I navigate to My work sub navigation tab "Available tasks"
        Then I validate tasks count in page 25

        Then I validate manage link actions for tasks
            | index | actions                                  |
            | 0     | Assign to me,Assign to me and go to case |
            | 1     | Assign to me,Assign to me and go to case |
            | 2     |                                          |
            | 3     | Assign to me,Assign to me and go to case |
            | 4     | Assign to me,Assign to me and go to case |
            | 5     |                                          |

        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |


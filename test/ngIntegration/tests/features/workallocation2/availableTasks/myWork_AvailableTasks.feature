@ng 
Feature: WA Release 2: My work -  Available tasks

    Background: Mock and browser setup
        Given I init MockApp

    Scenario Outline:  Available Tasks, columns and column links for "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I start MockApp
        Given I navigate to home page
        When I navigate to My work sub navigation tab "Available tasks"
        Then I validate task list table columns displayed
            | ColumnHeader  |
            | Case name     |
            | Case category | 
            | Location      |
            | Task |
            | Date          |

        Then I validate task list columns are links
            | ColumnHeader |
           
        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |


    Scenario: Available Tasks sort column persist in session with Caseworker user 
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer "
        Given I set MOCK tasks with permissions for view "Available Tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK request "/workallocation2/taskWithPagination/" intercept with reference "taskSearchRequest"
        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "Available tasks"
        Then I validate tasks count in page 25
        Then I validate task table pagination controls, is displayed state is "true"
        Then I validate task list page results text displayed as "Displaying 1 - 25 out of 140 tasks"

        When I click task list table header column "Case name", I validate task list table sorted with column "Case name" in order "asc"
         
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        Then I see case list page displayed
        When I click on primary navigation header tab "My work", I see selected tab page displayed
        When I navigate to My work sub navigation tab "Available tasks"
        Then I validate tasks count in page 25
        Then I validate task list page results text displayed as "Displaying 1 - 25 out of 140 tasks"
        Then I validate task list table sorted with column "Case name" in order "asc"
        
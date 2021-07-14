@ng  
Feature: WA Release 2: My work - My Tasks

    Background: Mock and browser setup
        Given I init MockApp

    Scenario Outline:  My Tasks, colums and column links for "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I start MockApp
        Given I navigate to home page
        Then I validate task list table columns displayed
            | ColumnHeader  |
            | Case name     |
            | Case category |
            | Location |
            | Task     |
            | Date     |
        Then I validate task list columns are links
            | ColumnHeader |
            | Case name     |
            | Task          |

        When I click task column link "Case name" at row 1
        Then I see case details page

        When I click on primary navigation header tab "My work", I see selected tab page displayed
        When I click task column link "Task" at row 1
        Then I see case details page
        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |

    Scenario Outline: My Tasks pagnation control display with only 1 page of items
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK tasks with permissions for view "My Tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 10   |
            | Read        | 10    |
        Given I set MOCK request "/workallocation2/taskWithPagination/" intercept with reference "taskSearchRequest"
        Given I start MockApp

        Given I navigate to home page
        Then I validate tasks count in page 20
        Then I validate task table pagination controls, is displayed state is "false"
       
        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |

  
    Scenario Outline: My Tasks sort column persist in session with Caseworker user "<SubNavigationTab>"
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer "
        Given I set MOCK tasks with permissions for view "My Tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK request "/workallocation2/taskWithPagination/" intercept with reference "taskSearchRequest"
        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "<SubNavigationTab>"
        Then I validate tasks count in page 25
        Then I validate task table pagination controls, is displayed state is "true"
        Then I validate task list page results text displayed as "Displaying 1 - 25 out of 140 tasks"

        When I click task list table header column "Case name", I validate task list table sorted with column "Case name" in order "asc"
     
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        Then I see case list page displayed
        When I click on primary navigation header tab "My work", I see selected tab page displayed
        When I navigate to My work sub navigation tab "<SubNavigationTab>"
        Then I validate tasks count in page 25
        Then I validate task list page results text displayed as "Displaying 1 - 25 out of 140 tasks"
        Then I validate task list table sorted with column "Case name" in order "asc"
        Examples:
            | SubNavigationTab |
            | My tasks         |

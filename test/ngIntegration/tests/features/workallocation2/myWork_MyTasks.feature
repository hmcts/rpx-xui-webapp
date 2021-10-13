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


    Scenario Outline: My Tasks pagnation and sorting for user type "<UserType>" with roles "<Roles>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK tasks with permissions for view "Available Tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK request "/workallocation2/taskWithPagination/" intercept with reference "taskSearchRequest"
        Given I start MockApp

        Given I navigate to home page

        Then I validate tasks count in page 25
        Then I validate task list page results text displayed as "Displaying 1 - 25 out of 140 tasks"
        Given I reset reference "taskSearchRequest" value to null
        When I click task list pagination link "Next" and wait for req reference "taskSearchRequest" not null
        Then I validate task search request with reference "taskSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 2          | 25       |
        Then I validate task list page results text displayed as "Displaying 26 - 50 out of 140 tasks"
        Given I reset reference "taskSearchRequest" value to null
        When I click task list pagination link "Previous" and wait for req reference "taskSearchRequest" not null
        Then I validate task search request with reference "taskSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 1          | 25       |
        Then I validate task list page results text displayed as "Displaying 1 - 25 out of 140 tasks"
        Given I reset reference "taskSearchRequest" value to null
        When I click task list pagination link "3" and wait for req reference "taskSearchRequest" not null
        Then I validate task search request with reference "taskSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 3          | 25       |
        Then I validate task list page results text displayed as "Displaying 51 - 75 out of 140 tasks"

        Then I validate "My work" tasks columns sorting with taskRequest url "/workallocation2/taskWithPagination/" on page 3
            | Header        | FieldId      |
            | Case name     | caseName     |
            | Case category | caseCategory |
            | Location      | locationName |
            | Task          | taskTitle    |
            | Date          | dueDate      |
        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |

    Scenario Outline: My Tasks sort column persist in session with Caseworker user "<SubNavigationTab>"
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer "
        Given I set MOCK tasks with permissions for view "Available Tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK request "/workallocation2/taskWithPagination/" intercept with reference "taskSearchRequest"
        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "<SubNavigationTab>"
        Then I validate tasks count in page 25
        Then I validate task list page results text displayed as "Displaying 1 - 25 out of 140 tasks"

        When I click task list table header column "Case name"
        Then I validate task list table sorted with column "Case name" in order "asc"
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
            | Available tasks  |


    Scenario Outline:  My Tasks error with response code <ResponseCode>
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer"
        Given I set MOCK api method "post" endpoint "/workallocation2/taskWithPagination/" with error response code <ResponseCode>
        Given I start MockApp
        Given I navigate to home page

        Then I see error message of type "<ErrorMessageType>" with message "<ErrorMessage>"
        Examples:
            | ResponseCode | ErrorMessageType | ErrorMessage |
            | 500 | Page | Sorry, there is a problem with the service |
            | 400 | Page | Sorry, there is a problem with the service |
            | 401 | Page | Sorry, you're not authorised to perform this action |
            | 403 | Page | Sorry, you're not authorised to perform this action |


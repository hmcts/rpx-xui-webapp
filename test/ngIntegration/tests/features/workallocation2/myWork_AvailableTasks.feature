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



    Scenario Outline: Available Tasks pagnation and sorting for user type "<UserType>" with roles "<Roles>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK tasks with permissions for view "Available Tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK request "/workallocation2/taskWithPagination/" intercept with reference "taskSearchRequest"
        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "Available tasks"
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
        Then I validate task list page results text displayed as "Displaying 1 - 25 out of 140 tasks"

        When I click task list table header column "Case name"
        Then I validate task list table sorted with column "Case name" in order "asc"
        When I click on primary navigation header tab "Case list"
        Then I see case list page displayed
        When I click on primary navigation header tab "My work"
        When I navigate to My work sub navigation tab "Available tasks"
        Then I validate tasks count in page 25
        Then I validate task list page results text displayed as "Displaying 1 - 25 out of 140 tasks"
        Then I validate task list table sorted with column "Case name" in order "asc"
        

    Scenario Outline:  Available Tasks error with response code <ResponseCode>
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker"
        Given I start MockApp
        Given I navigate to home page

        Given I set MOCK api method "post" endpoint "/workallocation2/taskWithPagination/" with error response code <ResponseCode>
        Given I start MockApp
        When I click on primary navigation header tab "My work"
        When I navigate to My work sub navigation tab "Available tasks"
        Then I see error message of type "<ErrorMessageType>" with message "<ErrorMessage>"
        Examples:
            | ResponseCode | ErrorMessageType | ErrorMessage                                        |
            | 500          | Page             | Sorry, there is a problem with the service          |
            | 400          | Page             | Sorry, there is a problem with the service          |
            | 401          | Page             | Sorry, you're not authorised to perform this action |
            | 403          | Page             | Sorry, you're not authorised to perform this action |


@ng @test
Feature: WA Release 2: My work - My Tasks - pagination sorting

    Background: Mock and browser setup
        Given I init MockApp

 
    Scenario Outline: My Tasks pagnation and sorting for user type "<UserType>" with roles "<Roles>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK tasks with permissions for view "My Tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK request "/workallocation2/taskWithPagination/" intercept with reference "taskSearchRequest"
        Given I start MockApp

        Given I navigate to home page

        Then I validate tasks count in page 25
        Then I validate task table pagination controls, is displayed state is "true"
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
            # | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |

    Scenario Outline: My Tasks pagnation control display with only 1 page of items
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK tasks with permissions for view "My Tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 10    |
            | Read        | 10    |
        Given I set MOCK request "/workallocation2/taskWithPagination/" intercept with reference "taskSearchRequest"
        Given I start MockApp

        Given I navigate to home page
        Then I validate tasks count in page 20
        Then I validate task table pagination controls, is displayed state is "false"

        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |



    Scenario Outline: My Tasks pagnation control display 0 items
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK tasks with permissions for view "My Tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 0    |
            | Read        | 0    |
        Given I set MOCK request "/workallocation2/taskWithPagination/" intercept with reference "taskSearchRequest"
        Given I start MockApp

        Given I navigate to home page
        Then I validate tasks count in page 0
        Then I validate task table pagination controls, is displayed state is "false"
        Then I validate WA tasks table footer displayed status is "true"
        Then I validate WA tasks table footer message is "You have no assigned tasks"

        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |

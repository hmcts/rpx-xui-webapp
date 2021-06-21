@ng
Feature: WA Release 2: My Tasks, Available tasks

    Background: Mock and browser setup
        Given I init MockApp

@test
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
        When I click task list pagination link "Next"
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 2          | 10       |
        Then I validate task list page results text displayed as "Displaying 26 - 50 out of 140 tasks"
        Given I reset reference "taskSearchRequest" value to null
        When I click task list pagination link "Previous"
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 1          | 10       |
        Then I validate task list page results text displayed as "Displaying 1 - 25 out of 140 tasks"
        Given I reset reference "taskSearchRequest" value to null
        When I click task list pagination link "3"
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 3          | 10       |
        Then I validate task list page results text displayed as "Displaying 51 - 75 out of 140 tasks"

        Then I validate "My work" tasks columns sorting with taskRequest url "/workallocation2/taskWithPagination/"
            | header        | FieldId      |
            | Case name     | caseName     |
            | Case category | caseCategory |
            | Location      | locationName |
            | Task          | taskTitle    |
            | date          | dueDate      |
        Examples:
            | UserIdentifier | UserType | Roles |
            | IAC_CaseOfficer_R2 | Caseworker| caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge | caseworker-ia-iacjudge,caseworker-ia,caseworker |








    Scenario: My Tasks sort column persist in session
        Given I set MOCK My tasks count 5
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I validate My tasks sort column persist in session



    Scenario:  My Tasks error responses
        Given I set MOCK My tasks count 5
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I validate error responses on My tasks page








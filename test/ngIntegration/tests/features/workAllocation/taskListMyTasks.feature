@ng @wa1
Feature: WA Release 1: My Tasks Task list

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK with "wa_release_1" release user and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer"



    Scenario: My Tasks pagination
        Given I set MOCK My tasks count 25
        Given I set MOCK request "/workallocation/taskWithPagination/" intercept with reference "taskSearchRequest"
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Task list"
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I validate tasks count in page 25
        Then I validate task list page results text displayed as "Displaying 1 - 25 out of 150 tasks"
        Given I reset reference "taskSearchRequest" value to null
        When I click task list pagination link "Next" and wait for req reference "taskSearchRequest" not null
        Then I validate task search request with reference "taskSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 2          | 25       |
        Then I validate task list page results text displayed as "Displaying 26 - 50 out of 150 tasks"
        Given I reset reference "taskSearchRequest" value to null
        When I click task list pagination link "Previous" and wait for req reference "taskSearchRequest" not null
        Then I validate task search request with reference "taskSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 1          | 25       |
        Then I validate task list page results text displayed as "Displaying 1 - 25 out of 150 tasks"
        Given I reset reference "taskSearchRequest" value to null
        When I click task list pagination link "3" and wait for req reference "taskSearchRequest" not null
        Then I validate task search request with reference "taskSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 3          | 25       |
        Then I validate task list page results text displayed as "Displaying 51 - 75 out of 150 tasks"

    Scenario: My Tasks task counts
        Given I set MOCK My tasks count 150
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Task list"
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I validate tasks count in page 25 

    Scenario: My Tasks sort columns
          Given I set MOCK My tasks count 150
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Task list"
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I validate tasks column sorting

    Scenario: My Tasks sort column persist in session
            Given I set MOCK My tasks count 150
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Task list"
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I validate My tasks sort column persist in session



    Scenario:  My Tasks error responses
           Given I set MOCK My tasks count 150
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Task list"
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I validate error responses on My tasks page


        





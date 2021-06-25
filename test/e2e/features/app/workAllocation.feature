@fullfunctional
Feature: WA Release 1: : Work allocations task list, Available list and Task manager

    Scenario Outline: View tasks, E2E journey of Caseworker-ia-officer user
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with test user identified as "<useridentifier>"
        Then I should be redirected to EUI dashboard page

        Then I see primary navigation tabs "<mainHeaders>" in main header
        Then I see primary navigation tabs "<rightColumnHeaders>" in right side header column


        When I click on primary navigation header tab "Task list", I see selected tab page displayed
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I see Task list table
        Then I validate tasks pagination is displayed if feature toggle "mc-mvp-wa-pagination" is on
        # Then I see Task list table displaying some tasks

        When I click sub navigation tab Available tasks
        Then I see Available tasks page displayed
        Then I see Task list table
        Then I see Task list Available tasks table displaying some tasks
        Then I validate tasks pagination is displayed if feature toggle "mc-mvp-wa-pagination" is on

        Then I see header tab Task manager
        When I click on primary navigation header tab "Task manager", I see selected tab page displayed
       
        Then I see Task manager page displayed
        Then I see Task list table
        Then I see Task manager table displaying some tasks
        Then I validate tasks pagination is displayed if feature toggle "mc-mvp-wa-pagination" is on
        When I select the sign out link
        Then I should be redirected to the Idam login page


        Examples:
            | useridentifier     | roles                                                            | mainHeaders                                    | rightColumnHeaders  |
            | IAC_CaseOfficer_R1 | caseworker-ia-caseofficer,caseworker-ia-admofficer               | Task list, Task manager,Case list, Create case | Find case           |
           
@test
Feature: Work allocations task list, Available list and Task manager

    Scenario: View tasks, E2E journey of Caseworker-ia-adm user  
        # When I navigate to Expert UI Url
        # Given I am logged into Expert UI caseworker-ia-adm user details
        Then I should be redirected to EUI dashboard page
        Then I see header tab Task list
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I see Task list table
        Then I see Task list table displaying some tasks

        When I click sub navigation tab Available tasks
        Then I see Available tasks page displayed
        Then I see Task list table
        Then I see Task list table displaying some tasks

    Scenario: View tasks, E2E journey of Caseworker-ia-officer user
        # When I navigate to Expert UI Url
        # Given I am logged into Expert UI caseworker-ia-caseofficer user details
        Then I should be redirected to EUI dashboard page
        Then I see header tab Task list
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I see Task list table
        Then I see Task list table displaying some tasks

        When I click sub navigation tab Available tasks
        Then I see Available tasks page displayed
        Then I see Task list table
        Then I see Task list table displaying some tasks

        Then I see header tab Task manager
        When I click on header tab Task manager
       
        Then I see Task manager page displayed
        Then I see Task list table
        Then I see Task list table displaying some tasks

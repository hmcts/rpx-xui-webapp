@ng 
Feature: Available Tasks Task list

    Background: Mock and browser setup
        Given I init MockApp


    Scenario: Avaiable Tasks task counts
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK My tasks count 5
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        When I click sub navigation tab Available tasks

        Then I see Available tasks page displayed
        Then I validate tasks count in page 5

    Scenario: Avaiable Tasks sort columns
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK My tasks count 5
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        When I click sub navigation tab Available tasks

        Then I see Available tasks page displayed
        Then I validate tasks column sorting

    Scenario: Avaiable Tasks sort column persist in session
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK My tasks count 5
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        When I click sub navigation tab Available tasks

        Then I see Available tasks page displayed
        Then I validate Available tasks sort column persist in session



    Scenario: Avaiable Tasks error responses
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK My tasks count 5
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        When I click sub navigation tab Available tasks

        Then I see Available tasks page displayed
        Then I validate error responses on available tasks page





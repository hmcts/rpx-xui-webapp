@ng @wa1
Feature: Task manager

    Background: Mock and browser setup
        Given I init MockApp


    Scenario: Task manager task counts
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK Task manager tasks count 25
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task manager

        Then I see Task manager page displayed
        Then I validate Task manager page tasks count 25

    Scenario: Task manager sort columns
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK Task manager tasks count 25
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task manager

        Then I see Task manager page displayed
        Then I validate tasks column sorting

    Scenario: Task manager sort column persist in session
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK Task manager tasks count 25
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task manager

        Then I see Task manager page displayed
        Then I validate Task manager tasks sort column persist in session

    Scenario: Task manager error responses
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK Task manager tasks count 25
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task manager

        Then I see Task manager page displayed
        Then I validate error responses on Task manager page





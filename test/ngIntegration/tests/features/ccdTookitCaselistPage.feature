@ng
Feature: Case list page
    Background: Start mock app
        Given I set mock case workbasket config "workbasketConfig"
        Given I start MockApp

    Scenario: Case edipt page navigation
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases"
        Then I see case list page displayed
        Then I validate workbasket "workbasketConfig" fields displayed
    
    Scenario: Validate search fiters to contain workbasket params
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases"
        Then I see case list page displayed
        Then I Validate case search request to contain filters from workbasket "workbasketConfig"

    Scenario: Validate workbasket fixed list items
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases"
        Then I see case list page displayed
        Then I validate workbasket fixed list items for workbasket "workbasketConfig"

    Scenario: Validate Case fields displayed and values
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases"
        Then I see case list page displayed
        Then I Validate case fields displayed and values "workbasketConfig"
    
    Scenario: Validate Case list table pagination properties/values and actions
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases"
        Then I see case list page displayed
        Then I Validate total cases count "workbasketConfig"
        When I click case list pagination "next" page
        Then I wait to see case results displayed
        When I click case list pagination "previous" page
        Then I wait to see case results displayed

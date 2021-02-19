@ng
Feature: Search case page
    Background: Start mock app
        Given I set mock case searchinput config "searchInputConfig"
        Given I start MockApp
    
    Scenario: Search case page navigation
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases/case-search"
        Then I see search case page displayed
        When I select jurisdiction "Family Divorce" case type "Divorce case - v115.00"
        Then I validate search case "searchInputConfig" fields displayed
    
    Scenario: Validate search fiters to contain search case params
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases/case-search"
        Then I see search case page displayed
        When I select jurisdiction "Family Divorce" case type "Divorce case - v115.00"
        Then I Validate case search request to contain filters from search case "searchInputConfig"

    Scenario: Validate search case fixed list items
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases/case-search"
        Then I see search case page displayed
        When I select jurisdiction "Family Divorce" case type "Divorce case - v115.00"
        Then I validate searchcase fixed list items for searchcase "searchInputConfig"

    Scenario: Validate search case fields and values displayed
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases/case-search"
        Then I see search case page displayed
        When I select jurisdiction "Family Divorce" case type "Divorce case - v115.00"
        Then I Validate case headers and values "searchInputConfig"

     Scenario: Validate Search case table pagination properties/values and actions
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases/case-search"
        Then I see search case page displayed
        When I select jurisdiction "Family Divorce" case type "Divorce case - v115.00"
        Then I Validate search case total cases count "searchInputConfig"
        When I click search case pagination "next" page
        Then I wait to see case results displayed
        When I click search case pagination "previous" page
        Then I wait to see case results displayed

     Scenario: Validate Case event/next step triggers listed
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases/case-search"
        Then I see search case page displayed
        When I select jurisdiction "Family Divorce" case type "Divorce case - v115.00"
        Then I Validate case event trigger actions listed "searchInputConfig"
    
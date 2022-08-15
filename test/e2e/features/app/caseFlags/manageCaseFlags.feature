@fullfunctional123
Feature: Manage case flags
    Manage case flags

  Background: Login as professional user
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with case flags user details
    Then I should be redirected to EUI dashboard page
    When I select search criteria jurisdiction "Family Divorce" case type "CaseView Callback Messages 2" state "Case flag created" in case list page and click apply
    When I click case at row 10 and navigate to case view page

  Scenario: Can see the checkbox column
    When I start case next step "Manage case flags"
    Then I am on case flags "Manage case flags" page
    When I select "Case name missing - Other, Test of case-level flag (A comment)" case flag option
    Then I am on case flags "Update flag" page
    # When I make flag status "inactive" if "active" and modify comment "test modified comment"
    # And I submit case flag
    # Then I see the case flags banner

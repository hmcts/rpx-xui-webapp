@managecaseflags
Feature: Manage case flags
    Manage case flags

  Background: Login to case flags case as case flags user
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with case flags user details
    Then I should be redirected to EUI dashboard page
    When I select search criteria jurisdiction "Family Divorce" case type "CaseView Callback Messages 2" state "Any" in case list page and click apply
    And I click case at row 25 and navigate to case view page
    And I click tab with label "Case flags" in case details page
    Then I see case details page displayed with tab "Case flags" selected

  Scenario: Manage case flags for a case or party or witness case flag
    Then I am on "Case flags" tab
    When I start case next step "Manage case flags"
    Then I am on manage case flags page
    When I select case flag option 1
    Then I am on case flags "Update flag" page
    When I enter "modifying test case flags" in text field
    And I submit case flag
    Then I see the case flags banner

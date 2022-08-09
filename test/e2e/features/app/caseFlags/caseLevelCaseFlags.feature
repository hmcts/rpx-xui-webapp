@caseflags
Feature: Case Level Case Flags
    Case Level Case Flags

  Background: Login as professional user
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with case flags user details
    Then I should be redirected to EUI dashboard page
    When I select search criteria jurisdiction "Family Divorce" case type "CaseView Callback Messages 2" state "Case flag created" in case list page and click apply

  Scenario: Can see the checkbox column
    When I click case at row 14 and navigate to case view page
    When I start case next step "Create case flag"
    Then I am on case flags "Where should this flag be added?" page
    When I select "CPF Rtiru 2" case flag option
    Then I am on case flags "Select flag type" page
    When I select "Complex Case" case flag option
    Then I am on case flags "Add comments for this flag" page
    When I enter "case level test case flags" in text field
    When I submit case flag
    Then I see the case flags banner

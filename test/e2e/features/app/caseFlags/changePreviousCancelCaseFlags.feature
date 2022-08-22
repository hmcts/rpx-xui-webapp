Feature: Case Level Case Flags
  Case Level Case Flags

  Background: Create a case for case flag
    Given I navigate to AAT UI Url
    When I am logged into Expert UI with case flags user details
    Then I should be redirected to EUI dashboard page
    When I click on primary navigation header tab "Create case", I see selected tab page displayed
    Then Create case page should be displayed
    When I start case with jurisdiction "Family Divorce" case type "CaseView Callback Messages 2" and event "Create initial Case Flags case"
    Then I am on case form page
    When I create a case flags case with the following data
      | field                   | value                         |
      | case_level_cf_type      | Complex Case                  |
      | case_level_cf_partyname | Case Level Case Flags Party 1 |
    When I navigate to the created case flags case details page
    And I am logged into Expert UI with case flags user details
    And I click tab with label "Case flags" in case details page
    Then I see case details page displayed with tab "Case flags" selected

  Scenario: Check for Change option when creating case flags
    When I start case next step "Create case flag"
    Then I am on case flags "Where should this flag be added?" page
    When I select "Case Level Case Flags Party 1" case flag option
    Then I am on case flags "Select flag type" page
    When I select "Complex Case" case flag option
    Then I am on case flags "Add comments for this flag" page
    When I enter "comments for case level case flags" in text field
    When I click change
    Then I am on case flags "Where should this flag be added?" page

  Scenario: Check for Change option when modifying case flags
    When I start case next step "Manage case flags"
    Then I am on manage case flags page
    When I select "Party Level Case Flags Party 1" case flag option
    Then I am on case flags "Update flag" page
    When I enter "modifying test case flags" in text field
    When I click change
    Then I am on manage case flags page

  Scenario: Check for previous button when creating case flags
    When I start case next step "Create case flag"
    Then I am on case flags "Where should this flag be added?" page
    When I select "Case Level Case Flags Party 1" case flag option
    Then I am on case flags "Select flag type" page
    When I select "Complex Case" case flag option
    Then I am on case flags "Add comments for this flag" page
    When I enter "comments for case level case flags" in text field
    When I click previous button
    Then I am on case flags "Where should this flag be added?" page

  Scenario: Check for previous button when modifying case flags
    When I start case next step "Manage case flags"
    Then I am on manage case flags page
    When I select "Party Level Case Flags Party 1" case flag option
    Then I am on case flags "Update flag" page
    When I enter "modifying test case flags" in text field
    When I click previous button
    Then I am on manage case flags page

  Scenario: Check for cancel link when creating case flags
    When I start case next step "Create case flag"
    Then I am on case flags "Where should this flag be added?" page
    When I select "Case Level Case Flags Party 1" case flag option
    Then I am on case flags "Select flag type" page
    When I select "Complex Case" case flag option
    Then I am on case flags "Add comments for this flag" page
    When I enter "comments for case level case flags" in text field
    When I click cancel link
    Then I am on case flags "Where should this flag be added?" page

  Scenario: Check for cancel link when modifying case flags
    When I start case next step "Manage case flags"
    Then I am on manage case flags page
    When I select "Party Level Case Flags Party 1" case flag option
    Then I am on case flags "Update flag" page
    When I enter "modifying test case flags" in text field
    When I click cancel link
    Then I am on manage case flags page

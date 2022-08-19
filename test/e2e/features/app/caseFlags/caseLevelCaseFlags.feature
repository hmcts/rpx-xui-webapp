@fullfunctional12
Feature: Case Level Case Flags
  Case Level Case Flags

  Background: Create a case for case flag
    # Given I navigate to AAT UI Url
    # When I am logged into Expert UI with case flags user details
    # Then I should be redirected to EUI dashboard page
    # When I click on primary navigation header tab "Create case", I see selected tab page displayed
    # Then Create case page should be displayed
    # When I start case with jurisdiction "Family Divorce" case type "CaseView Callback Messages 2" and event "Create initial Case Flags case"
    # Then I am on case form page
    # When I create a case flags case with the following data
    #   | field                    | value                          |
    #   | case_level_cf_type       | Complex Case                   |
    #   | case_level_cf_partyname  | Case Level Case Flags Party 1  |
    #   | party_level_cf_type      | Reasonable adjustment          |
    #   | party_level_cf_partyname | Party Level Case Flags Party 1 |
    And I navigate to the created case flags case details page
    And I am logged into Expert UI with case flags user details
    # Then I should be redirected to EUI dashboard page
    # When I select search criteria jurisdiction "Family Divorce" case type "CaseView Callback Messages 2" state "Any" in case list page and click apply
    # And I click case at row 25 and navigate to case view page
    And I click tab with label "Case flags" in case details page
    Then I see case details page displayed with tab "Case flags" selected
  # When I navigate to Expert UI Url
  # Given I am logged into Expert UI with case flags user details
  # Then I should be redirected to EUI dashboard page
  # When I select search criteria jurisdiction "Family Divorce" case type "CaseView Callback Messages 2" state "Case flag created" in case list page and click apply

  Scenario: Create and Modify Case Level Case Flag
    When I start case next step "Create case flag"
    Then I am on case flags "Where should this flag be added?" page
    When I select "Case Level Case Flags Party 1" case flag option
    Then I am on case flags "Select flag type" page
    When I select "Complex Case" case flag option
    Then I am on case flags "Add comments for this flag" page
    When I enter "comments for case level case flags" in text field
    When I submit case flag
    Then I see the case flags banner
    When I click tab with label "Case flags" in case details page
    Then I see case details page displayed with tab "Case flags" selected
    And I am on "Case flags" tab
    When I start case next step "Manage case flags"
    Then I am on manage case flags page
    When I select "Case name missing - Complex Case (comments for case level case flags)" case flag option
    Then I am on case flags "Update flag" page
    When I enter "modifying test case flags" in text field
    And I submit case flag
    Then I see the case flags banner

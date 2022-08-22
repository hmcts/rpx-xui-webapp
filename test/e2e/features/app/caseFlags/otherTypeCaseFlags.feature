@fullfunctional1
Feature: Case Level Case Flags Other Type
  Case Level Case Flags Other Type

  Background: Case Level Case Flags Other Type
    Given I navigate to AAT UI Url
    When I am logged into Expert UI with case flags user details
    Then I should be redirected to EUI dashboard page
    When I click on primary navigation header tab "Create case", I see selected tab page displayed
    Then Create case page should be displayed
    When I start case with jurisdiction "Family Divorce" case type "CaseView Callback Messages 2" and event "Create initial Case Flags case"
    Then I am on case form page
    When I create a case flags case with the following data
      | field                    | value                          |
      | case_level_cf_type       | Complex Case                   |
      | case_level_cf_partyname  | Case Level Case Flags Party 1  |
      | party_level_cf_type      | Reasonable adjustment          |
      | party_level_cf_partyname | Party Level Case Flags Party 1 |
    When I navigate to the created case flags case details page
    And I am logged into Expert UI with case flags user details
    And I click tab with label "Case flags" in case details page
    Then I see case details page displayed with tab "Case flags" selected

  Scenario Outline: Create and Manage Other Flag Type for "<Level>"
    When I start case next step "Create case flag"
    Then I am on case flags "Where should this flag be added?" page
    When I select "<CaseFlagName>" case flag option
    Then I am on case flags "Select flag type" page
    When I select "Other" case flag option
    And I enter Other flag type "<OtherFlagType>"
    Then I am on case flags "Add comments for this flag" page
    When I enter "comments for other case level case flags" in text field
    And I submit case flag
    Then I see the case flags banner
    When I click tab with label "Case flags" in case details page
    Then I see case details page displayed with tab "Case flags" selected
    And I am on "Case flags" tab
    Then I check for case flag fields
      | fields       |
      | heading      |
      | comment      |
      | creationDate |
    When I start case next step "Manage case flags"
    Then I am on manage case flags page
    When I select "<OtherFlagType>" case flag option
    Then I am on case flags "Update flag" page
    When I enter "modifying test case flags" in text field
    And I submit case flag
    Then I see the case flags banner
    When I click tab with label "Case flags" in case details page
    Then I see case details page displayed with tab "Case flags" selected
    And I am on "Case flags" tab
    Then I check for case flag fields
      | heading          |
      | comment          |
      | creationDate     |
      | lastModifiedDate |

    Examples:
      | Level                | CaseFlagName                   | OtherFlagType  |
      | Case Level CaseFlag  | Case Level Case Flags Party 1  | cl-othertype-1 |
      | Party Level CaseFlag | Party Level Case Flags Party 1 | pl-othertype-1 |

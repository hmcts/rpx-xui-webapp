@createcaseforcaseflags @caseflags
Feature: Create case for case flags
    Create case for case flags

  Background: Login to AAT
    When I navigate to AAT UI Url
    Given I am logged into Expert UI with case flags user details
    Then I should be redirected to EUI dashboard page

  Scenario: Create a simple case flag case with 1 caselevel caseflag and 1 partylevel caseflag
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

@fullfunctional1
Feature: Party Level Case Flags
  Party Level Case Flags

  Background: Create a case for case flag
    Given I navigate to AAT UI Url
    When I am logged into Expert UI with case flags user details
    Then I should be redirected to EUI dashboard page
    When I click on primary navigation header tab "Create case", I see selected tab page displayed
    Then Create case page should be displayed
    When I start case with jurisdiction "Family Divorce" case type "CaseView Callback Messages 2" and event "Create initial Case Flags case"
    Then I am on case form page
    When I create a case flags case with the following data
      | field                    | value                          |
      | party_level_cf_type      | Reasonable adjustment          |
      | party_level_cf_partyname | Party Level Case Flags Party 1 |
    When I navigate to the created case flags case details page
    And I am logged into Expert UI with case flags user details
    And I click tab with label "Case flags" in case details page
    Then I see case details page displayed with tab "Case flags" selected

  Scenario: Create and Manage Party Level Case Flags
    When I start case next step "Create case flag"
    Then I am on case flags "Where should this flag be added?" page
    When I select "Party Level Case Flags Party 1" case flag option
    Then I am on case flags "Select flag type" page
    Then I see the following case flags options
      | options               |
      | Reasonable adjustment |
      | Other                 |
    When I select "Reasonable adjustment" case flag option
    Then I am on case flags "Select flag type" page
    Then I see the following case flags options
      | options                                                     |
      | I need documents in an alternative format                   |
      | I need help with forms                                      |
      | I need adjustments to get to, into and around our buildings |
      | I need to bring support with me to a hearing                |
      | I need something to feel comfortable during my hearing      |
      | I need to request a certain type of hearing                 |
      | I need help communicating and understanding                 |
      | Other                                                       |
    When I select "I need documents in an alternative format" case flag option
    Then I am on case flags "Select flag type" page
    Then I see the following case flags options
      | options                         |
      | Documents in a specified colour |
      | Documents in easy read format   |
      | Braille documents               |
      | Documents in large print        |
      | Audio translation of documents  |
      | Documents read out to me        |
      | Information emailed to me       |
      | Other                           |
    When I select "Documents in a specified colour" case flag option
    Then I am on case flags "Add comments for this flag" page
    When I enter "comments for party level case flags" in text field
    When I submit case flag
    Then I see the case flags banner
    When I click tab with label "Case flags" in case details page
    Then I see case details page displayed with tab "Case flags" selected
    And I am on "Case flags" tab
    Then I check for case flag fields
      | fields           |
      | heading          |
      | comment          |
      | creationDate     |
      | lastModifiedDate |
    When I start case next step "Manage case flags"
    Then I am on manage case flags page
    When I select "Party Level Case Flags Party 1" case flag option
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

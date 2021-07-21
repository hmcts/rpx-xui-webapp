@fullfunctional4
Feature: Verify new entry timestamp

    Background: Login as professional user
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with valid Probate back office user credentials
        Then I should be redirected to EUI dashboard page


  Scenario Outline: User adds a new comment to a case and timestamp shows current time
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "<Jurisdiction>" case type "<CaseType>" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        When I open first case in search results
        Then I see case details page
        When I Add Comment to the case
        Then I see the event with the current timestamp


      Examples:
        | Jurisdiction | CaseType |
        | Manage probate application | Grant of representation |

Feature: Create Manual Hearing Request

  Background:
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with valid SSCS user details
    Then I should be redirected to EUI dashboard page
    When I click on Case list
    Then I am on case list page
    When I select search criteria jurisdiction "Tribunals" case type "SSCS Case v5.15.9-10177_DEMO" Region "Cardiff" Benefit "002" Issue "CE" in case list page and click apply
    Then I wait to see case results displayed
    When I select a case and click on hearing Tab and see hearings Summary

@hearings
  Scenario: Create Manual Hearing Request
    When I request hearing with preloaded values
    Then Hearing successful and shows in summary page


  Scenario: Cancel create case for Probate
    When I start case with jurisdiction "Manage probate application" case type "Grant of representation" and event "Apply for probate"
    When I click cancel link
    When I am on case list page

  Scenario: Create and Submit Probate Case
    When I start case with jurisdiction "Manage probate application" case type "Grant of representation" and event "Apply for probate"
    When I create Probate case
    Then I am on check your answers page
    When I submit case
    Then I see case details page

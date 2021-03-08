
Feature: Probate create case workflow

  Background:
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with valid user details
    Then I should be redirected to EUI dashboard page
    When I click on create case button
    Then Create case page should be displayed

@all
  Scenario: Start create case for Probate
    When I start case with jurisdiction "Manage probate application" case type "Grant of representation" and event "Apply for probate"
    Then I am on case form page


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

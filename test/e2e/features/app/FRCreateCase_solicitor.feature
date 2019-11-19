@fr @regression
Feature: FR create case workflow

  Background:
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with valid user details
    Then I should be redirected to EUI dashboard page
    When I click on create case button
    Then Create case page should be displayed


 @ignore 
  Scenario: Cancel create consented case for FR
    When I start case with jurisdiction "Family Divorce" case type "Financial Remedy Consented" and event "Consent Order Application"
    When I click cancel link
    When I am on case list page


  Scenario: Create and Submit FR Consented Case
    When I start case with jurisdiction "Family Divorce" case type "Financial Remedy Consented" and event "Consent Order Application"
    When I create FR case
    Then I am on check your answers page 
    When I submit case
    Then I see case details page 

  Scenario: Start Next Step on  FR Consented Case
    When I start case with jurisdiction "Family Divorce" case type "Financial Remedy Consented" and event "Consent Order Application"
    When I create FR case
    Then I am on check your answers page
    When I submit case
    Then I see case details page


@ignore

  Scenario: Cancel create contested case for FR
    When I start case with jurisdiction "Family Divorce" case type "Contested Financial Remedy" and event "Form A Application"
    When I click cancel link
    When I am on case list page


  Scenario: Create and Submit FR Contested Case
    When I start case with jurisdiction "Family Divorce" case type "Contested Financial Remedy" and event "Form A Application"
    When I create FR case
    Then I am on check your answers page
    When I submit case
    Then I see case details page



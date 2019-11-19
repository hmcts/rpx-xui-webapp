
@fr @regression
Feature: FR create case workflow - Case Worker

    Background:
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with valid Case Worker user details
        Then I should be redirected to EUI dashboard page
        When I click on create case button
        Then Create case page should be displayed

    
    Scenario: Create and Submit FR Consented Case
        When I start case with jurisdiction "Family Divorce" case type "Financial Remedy Consented" and event "Consent Order Application"
        When I create FR case
        Then I am on check your answers page
        When I submit case
        Then I see case details page




    Scenario: Create and Submit FR Contested Case
        When I start case with jurisdiction "Family Divorce" case type "Contested Financial Remedy" and event "Form A Application"
        When I create FR case
        Then I am on check your answers page
        When I submit case
        Then I see case details page



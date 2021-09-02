
Feature: IA create case workflow

    Background:
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with valid user details
        Then I should be redirected to EUI dashboard page
        When I click on primary navigation header tab "Create case", I see selected tab page displayed
        Then Create case page should be displayed

    
    Scenario: Start create case for IA Start appeal
        When I start case with jurisdiction "Immigration & Asylum" case type "Appeal* master" and event "Start your appeal"
        Then I am on case form page

    Scenario: Create and Submit IA Case start appeal
        When I start case with jurisdiction "Immigration & Asylum" case type "Appeal* master" and event "Start your appeal"
        When I create IAC case
        Then I am on check your answers page
        When I submit case
        Then I see case details page


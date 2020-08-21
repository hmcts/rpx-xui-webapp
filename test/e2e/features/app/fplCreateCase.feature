@divorce @fullfunctional
Feature: FPL create case workflow

    Background:
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with valid user details
        Then I should be redirected to EUI dashboard page
        When I click on create case button
        Then Create case page should be displayed

    @all
    Scenario: Start create case for FPL case
        When I start case with jurisdiction "Public Law" case type "Care, supervision and EPOs" and event "Start application"
        Then I am on case form page


    Scenario: Create and Submit FPL case
        When I start case with jurisdiction "Public Law" case type "Care, supervision and EPOs" and event "Start application"
        When I create Divorce case
        Then I am on check your answers page
        When I submit case
        Then I see case details page


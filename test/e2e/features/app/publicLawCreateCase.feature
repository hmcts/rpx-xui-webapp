
@publiclaw @all 
Feature: Public Law create case workflow

    Background:
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with valid user details
        Then I should be redirected to EUI dashboard page
        When I click on create case button
        Then Create case page should be displayed

    @smoke
    Scenario: Start create case for Public Law
        When I start case with jurisdiction "Public Law" case type "Care, supervision and EPOs" and event "Start application"
        Then I am on case form page

    
    Scenario: Cancel create case for Law
        When I start case with jurisdiction "Public Law" case type "Care, supervision and EPOs" and event "Start application"
        When I click cancel link
        When I am on case list page
@ignore
    Scenario: Create and Submit Law Case
        When I start case with jurisdiction "Public Law" case type "Care, supervision and EPOs" and event "Start application"
        When I create Public Law case
        Then I am on check your answers page
        When I submit case
        Then I see case details page

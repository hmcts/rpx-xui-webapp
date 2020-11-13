Feature: IA create case workflow

    Background:
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with valid user details
        Then I should be redirected to EUI dashboard page
        When I click on create case button
        Then Create case page should be displayed

    @fullfunctional
    Scenario: Start create case for IA Start appeal
        When I start case with jurisdiction "Immigration & Asylum" case type "Asylum" and event "Start your appeal"
        Then I am on case form page

    @ignore
    Scenario: Create and Submit IA Case start appeal
        When I start case with jurisdiction "Immigration & Asylum" case type "Asylum" and event "Start your appeal"
        When I create Divorce case
        Then I am on check your answers page
        When I submit case
        Then I see case details page


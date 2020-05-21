
@iac @all
Feature: Immigration Asylum create case workflow

    Background:
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with valid user details
        Then I should be redirected to EUI dashboard page
        When I click on create case button
        Then Create case page should be displayed

    @smoke
    Scenario: Start create case for IA
        When I start case with jurisdiction "Immigration & Asylum" case type "Appeal* master" and event "Start your appeal"
        Then I am on case form page

    
    Scenario: Cancel create case for IA
        When I start case with jurisdiction "Immigration & Asylum" case type "Appeal* master" and event "Start your appeal"
        When I click cancel link
        When I am on case list page

    Scenario: Create and Submit IA Case
        When I start case with jurisdiction "Immigration & Asylum" case type "Appeal* master" and event "Start your appeal"
        When I create Immigration Asylum case
        Then I am on check your answers page
        When I submit case
        Then I see case details page

@divorce @fullfunctional
Feature: Divorce create case workflow

    Background:
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with valid user details
        Then I should be redirected to EUI dashboard page
        When I click on create case button
        Then Create case page should be displayed

    @all
    Scenario: Start create case for Divorce
        When I start case with jurisdiction "Family Divorce" case type "Divorce case - v115.00" and event "Apply for a divorce"
       Then I am on case form page

    Scenario: Cancel create case for Divorce
        When I start case with jurisdiction "Family Divorce" case type "Divorce case - v115.00" and event "Apply for a divorce"
        When I click cancel link
        When I am on case list page


    Scenario: Create and Submit Divorce Consented Case
        When I start case with jurisdiction "Family Divorce" case type "Divorce case - v115.00" and event "Apply for a divorce"
        When I create Divorce case
        Then I am on check your answers page
        When I submit case
        Then I see case details page

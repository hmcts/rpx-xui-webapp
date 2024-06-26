
Feature: Divorce create case workflow

    Background:
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with valid user details
        Then I should be redirected to EUI dashboard page
        When I click on primary navigation header tab "Create case", I see selected tab page displayed
        Then Create case page should be displayed

    @all
    Scenario: Start create case for Divorce
        When I start case with jurisdiction "Family Divorce" case type "Divorce case - v115.00" and event "Apply for a divorce"
       Then I am on case form page 

    Scenario: Create and Submit Divorce Consented Case
        When I start case with jurisdiction "Family Divorce" case type "Divorce case - v115.00" and event "Apply for a divorce"
        When I create Divorce case
        Then I am on check your answers page
        When I submit case
        Then I see case details page

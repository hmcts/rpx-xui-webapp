@fullfunctional5
Feature: Cookie banner functionality

    Background:
        When I navigate to Expert UI Url
        Then I am on Idam login page

    Scenario: User accepts additional cookies
        When I click 'Accept additional cookies'
        Given I am logged into Expert UI with valid user details
        Then I should be redirected to EUI dashboard page
        Then I see the analytical cookies

    Scenario: User rejects additional cookies
        When I click 'Reject additional cookies'
        Given I am logged into Expert UI with valid user details
        Then I should be redirected to EUI dashboard page
        Then I don't see any analytical cookie


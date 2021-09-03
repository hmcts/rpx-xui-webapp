@fullfunctional5
Feature: Cookie banner functionality

    Background:
        When I navigate to Expert UI Url
        Then I am on Idam login page

    Scenario: User accepts additional cookies
        When I click 'Accept additional cookies'
        Then I see the analytical cookies

    Scenario: User rejects additional cookies
        When I click 'Reject additional cookies'
        Then I don't see any analytical cookie


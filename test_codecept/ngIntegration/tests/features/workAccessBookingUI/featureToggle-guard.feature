@ng @ignore
Feature: Work access page, feature toggle and route guards

    Scenario Outline: Before completing booking ui journey
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>" with reference "userDetails"
        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "IA"
            | bookable        | <bookable> |
            | substantive     | Y          |
            | baseLocation | 20001      |


        Given I start MockApp
        When I navigate to home page
        Given I navigate page route "get-help", wait for locator "exui-get-help"
        Given I navigate page route "booking", wait for locator "<expectedLocator>"

        Examples:
            | UserIdentifier   | Roles                                           | bookable | isDisplayed | expectedLocator   |
            | BOOKING_UI-FT-ON | caseworker-ia-iacjudge,caseworker-ia,caseworker | true     | true        | exui-booking-home |
            | BOOKING_UI-FT-ON | caseworker-ia-iacjudge,caseworker-ia,caseworker | false    | false       | exui-case-list    |

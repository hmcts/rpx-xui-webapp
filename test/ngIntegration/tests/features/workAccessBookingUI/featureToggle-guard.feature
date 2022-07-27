@ng @test
Feature: Work access page, feature toggle and route guards

    Scenario Outline: Before completing booking ui journey
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | bookable   | isCaseAllocator | substantive | jurisdiction |
            | <bookable> | true            | Y           | IA           |


        Given I start MockApp
        When I navigate to home page
        Given I navigate page route "get-help", wait for locator "exui-get-help"
        Given I navigate page route "booking", wait for locator "<expectedLocator>"

        Examples:
            | UserIdentifier   | Roles                                           | bookable | isDisplayed | expectedLocator   |
            | BOOKING_UI-FT-ON | caseworker-ia-iacjudge,caseworker-ia,caseworker | true     | true        | exui-booking-home |
            | BOOKING_UI-FT-ON | caseworker-ia-iacjudge,caseworker-ia,caseworker | false    | false       | exui-case-list    |
            | WA2              | caseworker-ia-iacjudge,caseworker-ia,caseworker | true     | false       | exui-case-list    |
            | WA2              | caseworker-ia-iacjudge,caseworker-ia,caseworker | false    | false       | exui-case-list    |

    Scenario Outline: After completing booking ui journey "View tasks and cases"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | bookable   | isCaseAllocator | substantive | jurisdiction |
            | <bookable> | true            | Y           | IA           |

        Given I start MockApp
        When I navigate to home page
        Given I navigate page route "booking", wait for locator "exui-booking-home"


        When I select work access radio button "View tasks and cases"
        Then I see work access continue button displayed
        When I click work access continue button
        Then I validate I am on My work page

        Given I navigate page route "booking", wait for locator "exui-case-list"

        Examples:
            | UserIdentifier   | Roles                                           | bookable | isDisplayed | expectedLocator   |
            | BOOKING_UI-FT-ON | caseworker-ia-iacjudge,caseworker-ia,caseworker | true     | true        | exui-booking-home |


    Scenario Outline: After completing booking ui journey "View existing bookings"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | bookable   | isCaseAllocator | substantive | jurisdiction |
            | <bookable> | true            | Y           | IA           |

        Given I start MockApp
        When I navigate to home page
        Given I navigate page route "booking", wait for locator "exui-booking-home"


        When I select work access radio button "View existing bookings"
        Then I see work access continue button displayed
        Then I see work access continue button not displayed

        Then I see work access existing bookings list container
        When I click continue for any existing booking in work access page

        Then I validate I am on My work page

        Given I navigate page route "booking", wait for locator "exui-case-list"


        Examples:
            | UserIdentifier   | Roles                                           | bookable | isDisplayed | expectedLocator   |
            | BOOKING_UI-FT-ON | caseworker-ia-iacjudge,caseworker-ia,caseworker | true     | true        | exui-booking-home |

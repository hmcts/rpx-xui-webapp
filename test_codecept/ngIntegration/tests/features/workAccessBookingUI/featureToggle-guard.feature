@ng @ignore
Feature: Work access page, feature toggle and route guards

    Scenario Outline: Before completing booking ui journey
        Given I set MOCK with user "BOOKING_UI-FT-ON" and userInfo with roles "caseworker-ia-iacjudge,caseworker-ia,caseworker,fee-paid-judge" with reference "userDetails"
         |roleCategory|
            |JUDICIAL|
        
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | bookable   | isCaseAllocator | substantive | jurisdiction | roleName       | roleCategory | contractType |
            | <bookable> | true            | N           | CIVIL,IA     | fee-paid-judge | JUDICIAL     | Fee-Paid     |


        Given I start MockApp
        When I navigate to home page
        Given I navigate page route "booking", wait for locator "<expectedLocator>"

        Examples:
            | UserIdentifier   | Roles                                           | bookable | isDisplayed | expectedLocator   |
            | BOOKING_UI-FT-ON | caseworker-ia-iacjudge,caseworker-ia,caseworker | true     | true        | exui-booking-home |
            | BOOKING_UI-FT-ON | caseworker-ia-iacjudge,caseworker-ia,caseworker | false    | false       | exui-case-list    |

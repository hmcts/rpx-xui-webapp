
@ng  
Feature: Work access page

    Background: Setup bookings data
        Given I set mock locations for bookings
            | epimms_id | site_name |
            |100001|Test location 1|
            | 100002 | Test location 2 |
            | 100003 | Test location 3 |



        Given I set mock for existing bookings
            | appointmentId | base_location_id | beginTime | endTime |  
            | 1001 | 100001 | +1 | +2 |
            | 1002 | 100002 | +2 | +4 |
            | 1003 | 100003 | +4 | +8 |
       
    Scenario Outline: page access to user with roles "<Roles>" is displayed "<isDisplayed>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | bookable | isCaseAllocator | substantive | jurisdiction |
            |true|true|Y|IA|        


        Given I start MockApp
        When I navigate to home page
        Then I validate work access page isDisplayed is "<isDisplayed>"

        Examples:
            | UserIdentifier     | Roles                                                           | isDisplayed |
            | BOOKING_UI-FT-ON | caseworker-ia-iacjudge,caseworker-ia,caseworker | false |
            # | IAC_Judge_WA_R2    | caseworker-ia-iacjudge,caseworker-ia,caseworker, fee-paid-judge | true       |

    
    Scenario: Work access options
        Given I set MOCK with user "BOOKING_UI-FT-ON" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker, fee-paid-judge" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | bookable | isCaseAllocator | substantive | jurisdiction |
            | true     | true            | Y           | IA           |

        Given I start MockApp
        When I navigate to home page


        Given I navigate page route "booking", wait for locator "exui-booking-home"


        Then I see work access page displayed
        Then I see work access radio button "View existing bookings" displayed
        Then I see work access radio button "Create new booking" displayed
        Then I see work access radio button "View tasks and cases" displayed
        Then I see work access continue button not displayed

        When I select work access radio button "View existing bookings"
        Then I see work access continue button not displayed

        When I select work access radio button "Create new booking"
        Then I see work access continue button displayed

        When I select work access radio button "View task and cases"
        Then I see work access continue button displayed


    Scenario: Work access View existing bookings with details
        Given I set MOCK with user "BOOKING_UI-FT-ON" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker, fee-paid-judge" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | bookable | isCaseAllocator | substantive | jurisdiction |
            | true     | true            | Y           | IA           |
        
        Given I start MockApp
        When I navigate to home page


        Given I navigate page route "booking", wait for locator "exui-booking-home"


        Then I see work access page displayed
        Then I see work access radio button "View existing bookings" displayed
        Then I see work access radio button "Create new booking" displayed
        Then I see work access radio button "View tasks and cases" displayed
        Then I see work access continue button not displayed

        When I select work access radio button "View existing bookings"
        Then I see work access continue button not displayed

        Then I see work access existing bookings list container
        Then I see work access existing bookings displayed with details
            | location        | fromDate | toDate |
            | Test location 1 | +1 | +2 |
            | Test location 2 | +2 | +4 |
            | Test location 3 | +4 | +8 |


    Scenario: Work access View existing booking and continue
        Given I set MOCK with user "BOOKING_UI-FT-ON" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker, fee-paid-judge" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | bookable | isCaseAllocator | substantive | jurisdiction |
            | true     | true            | Y           | IA           |
        
        Given I start MockApp
        When I navigate to home page

        Given I navigate page route "booking", wait for locator "exui-booking-home"


        Then I see work access page displayed
        Then I see work access radio button "View existing bookings" displayed
        Then I see work access radio button "Create new booking" displayed
        Then I see work access radio button "View tasks and cases" displayed
        Then I see work access continue button not displayed

        When I select work access radio button "View existing bookings"
        Then I see work access continue button not displayed

        Then I see work access existing bookings list container
        When I click continue for any existing booking in work access page


    Scenario: Work access Create new booking and continue
        Given I set MOCK with user "BOOKING_UI-FT-ON" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker, fee-paid-judge" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | bookable | isCaseAllocator | substantive | jurisdiction |
            | true     | true            | Y           | IA           |
        
    
        Given I start MockApp
        When I navigate to home page


        Given I navigate page route "booking", wait for locator "exui-booking-home"


        Then I see work access page displayed
        Then I see work access radio button "View existing bookings" displayed
        Then I see work access radio button "Create new booking" displayed
        Then I see work access radio button "View tasks and cases" displayed
        Then I see work access continue button not displayed

        When I select work access radio button "Create new booking"
        Then I see work access continue button displayed
        When I click work access continue button



    Scenario: Work access View tasks and casesg and continue
        Given I set MOCK with user "BOOKING_UI-FT-ON" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker, fee-paid-judge" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | bookable | isCaseAllocator | substantive | jurisdiction |
            | true     | true            | Y           | IA           |

        Given I start MockApp
        When I navigate to home page

        Given I navigate page route "booking", wait for locator "exui-booking-home"


        Then I see work access page displayed
        Then I see work access radio button "View existing bookings" displayed
        Then I see work access radio button "Create new booking" displayed
        Then I see work access radio button "View tasks and cases" displayed
        Then I see work access continue button not displayed

        When I select work access radio button "View tasks and cases"
        Then I see work access continue button displayed
        When I click work access continue button


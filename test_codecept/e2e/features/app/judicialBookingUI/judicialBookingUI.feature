@fullfunctional @demo 
Feature: Judicial Booking UI

    Scenario: View and create booking
        Given I am logged into Expert UI with test user identified as "BOOKING_UI-FT-ON"
        Then I validate work access page isDisplayed is "true"
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

        When I select work access radio button "View existing bookings"
        Then I see work access continue button not displayed

        Then I see work access existing bookings list container
        Then I validate work access existing bookings


        When I select work access radio button "Create new booking"
        Then I see work access continue button displayed
        When I click work access continue button


        When I enter location search text "cen" in create booking page

        When I select location at index 5 in create booking location search

        When I click continue in create new booking work flow
        When I select duartion option "Today only" in create booking page
        When I click continue in create new booking work flow
        When I click continue to submit new booking work flow
        Then I validate I am on My work page
        # Then I see new booking created message



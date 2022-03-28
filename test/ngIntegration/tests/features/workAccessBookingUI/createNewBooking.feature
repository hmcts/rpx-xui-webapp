
Feature: Work access create new booking workflow 


    Scenario: Work access Create new booking and continue
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker, fee-paid-judge" with reference "userDetails"
        Given I start MockApp
        When I navigate to home page
        Then I see work access page displayed
        Then I see work access radio button "View existing bookings" displayed
        Then I see work access radio button "Create new booking" displayed
        Then I see work access radio button "View tasks and cases" displayed
        Then I see work access continue button not displayed

        When I see select work access radio button "Create new booking"
        Then I see work access continue button displayed
        When I click work access continue button

        Then I see create booking search location page is displayed
        When I enter location "Taylor" in create new booking work flow location page
        Then I see location results in create new booking work flow location page
            |location|
            ||
            ||
        When I select location "" from search results in create new booking work flow location page
        Then I see location "" set in create new booking work flow location page
        When I click continue in create new booking work flow
        Then I see access dates for new booking page
        When I set start date "" and end date in create new wbooking work flow 
        When I click continue in create new booking work flow
        Then I see check answers in create new booking work flow
        When I click submit in create new booking work flow
        Then I see new booking ceated message

@ng
Feature: WA Release 1: My Tasks Task list

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK with "wa_release_1" release user and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer"


    Scenario: My Tasks task counts
           Given I set MOCK My tasks count 5
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I validate tasks count in page 5 

    Scenario: My Tasks sort columns
          Given I set MOCK My tasks count 5
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I validate tasks column sorting

    Scenario: My Tasks sort column persist in session
            Given I set MOCK My tasks count 5
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I validate My tasks sort column persist in session



    Scenario:  My Tasks error responses
           Given I set MOCK My tasks count 5
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I validate error responses on My tasks page


        





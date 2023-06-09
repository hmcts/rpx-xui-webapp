@fullfunctional_disabled_for_angular_11 
Feature: Check media viewer

    Background:
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with hrs testes user details
        Then I should be redirected to EUI dashboard page
        When I click on create case button
        Then Create case page should be displayed

    Scenario: Start create case for Hearing Recordings and check document
        When I start case with jurisdiction "Hearing Recordings" case type "Recorded Hearings v.1.0|Recorded Hearings v.03|Recorded Hearings" and event "Create a case"
        Then I am on case form page
        When I create Hearing Recordings case
        # Given I save current window handle reference "mainTab"
        When I click on Case Hearing Files tab
        When I click on a file
        Given I switch to new window opened
        # Given I save current window handle reference "mediaViewerTest"
        Then I see the file displayed in Media Viewer


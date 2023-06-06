@fullfunctional @test @codecept_enabled
Feature: Test case type case creation and case details validations

  Background:
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with valid user details
    Then I should be redirected to EUI dashboard page

    Scenario: Start create case page form fields validating against API response
        When I click on primary navigation header tab "Create case", I see selected tab page displayed
        Then Create case page should be displayed
        When I start case with jurisdiction "Family Divorce" case type "XUI Test Case type" and event "Create a case"
        Then I am on case form page
        Then Validate create case form pages fields against the api response

    Scenario: Validate check your answers summary page
        When I click on primary navigation header tab "Create case", I see selected tab page displayed
        Then Create case page should be displayed
        When I start case with jurisdiction "Family Divorce" case type "XUI Test Case type" and event "Create a case"
        Then I am on case form page
        Then I should be able to fill the form pages
        Then Validate check your answer summery page

    Scenario: Validate mandatory fields condition check in page
        When I click on primary navigation header tab "Create case", I see selected tab page displayed
        Then Create case page should be displayed
        When I start case with jurisdiction "Family Divorce" case type "XUI Test Case type" and event "Create a case"
        Then I am on case form page
        Then Validate mandatory fields functionality

    Scenario:  Validate event pages display show condition logic
        When I click on primary navigation header tab "Create case", I see selected tab page displayed
        Then Create case page should be displayed
        When I start case with jurisdiction "Family Divorce" case type "XUI Test Case type" and event "Create a case"
        Then I am on case form page
        Then Validate event pages display show condition logic


    Scenario: Validate Case event check your answers summary page links
        When I click on primary navigation header tab "Create case", I see selected tab page displayed
        Then Create case page should be displayed
        When I start case with jurisdiction "Family Divorce" case type "XUI Test Case type" and event "Create a case"
        Then I am on case form page
        Then I should be able to fill the form pages
        Then Should be able to see check your answers summary page links


    Scenario: Validate tabs in case details page against API response
        When I click on search button
        Then Search page should be displayed
        When I enter search fields jurisdiction "Family Divorce" case type "XUI Test Case type"
        When I click apply to perform case search
        Then I see results returned
        When I open first case in search results
        Then I see case details page
        Then I should be able to see tabs in case details page

    Scenario: Validate tab details in case details page against API response
        When I click on search button
        Then Search page should be displayed
        When I enter search fields jurisdiction "Family Divorce" case type "XUI Test Case type"
        When I click apply to perform case search
        Then I see results returned
        When I open first case in search results
        Then I see case details page
        Then I should be validate tab details in case details page


    Scenario: Validate Case event next step trigger actions
        When I click on search button
        Then Search page should be displayed
        When I enter search fields jurisdiction "Family Divorce" case type "XUI Test Case type"
        When I click apply to perform case search
        Then I see results returned
        When I open first case in search results
        Then I see case details page
        Then Validate Case event next step trigger actions

    Scenario: Validate update form page click on next step trigger actions
        When I click on search button
        Then Search page should be displayed
        When I enter search fields jurisdiction "Family Divorce" case type "XUI Test Case type"
        When I click apply to perform case search
        Then I see results returned
        When I open first case in search results
        Then I see case details page
        When I start case next step "Update case"
        Then Validate Case event update populating form page

    Scenario: Validate media viewer text redaction working
        When I click on search button
        Then Search page should be displayed
        When I enter search fields jurisdiction "Family Divorce" case type "XUI Test Case type"
        When I click apply to perform case search
        Then I see results returned
        When I open second case in search results
        Then I see case details page
        When I click tab with label "Tab 1" in case details page
        When I open dummy document
        Then I see the file displayed in Media Viewer
        Then I verify that text redaction is working

    Scenario: Validate media viewer bookmark feature working
        When I click on search button
        Then Search page should be displayed
        When I enter search fields jurisdiction "Family Divorce" case type "XUI Test Case type"
        When I click apply to perform case search
        Then I see results returned
        When I open second case in search results
        Then I see case details page
        When I click tab with label "Tab 1" in case details page
        When I open dummy document
        Then I see the file displayed in Media Viewer
        Then I verify that bookmark feature is working

    Scenario: Validate media viewer comment feature working
        When I click on search button
        Then Search page should be displayed
        When I enter search fields jurisdiction "Family Divorce" case type "XUI Test Case type"
        When I click apply to perform case search
        Then I see results returned
        When I open second case in search results
        Then I see case details page
        When I click tab with label "Tab 1" in case details page
        When I open dummy document
        Then I see the file displayed in Media Viewer
        Then I verify that comment feature is working

    Scenario: Validate invalid date error message
        When I click on primary navigation header tab "Create case", I see selected tab page displayed
        Then Create case page should be displayed
        When I start case with jurisdiction "Family Divorce" case type "XUI Test Case type" and event "Create a case"
        Then I am on case form page
        When I create case with invalid date
        Then I see error message of type "validation" displayed with message "Date is not valid"

        


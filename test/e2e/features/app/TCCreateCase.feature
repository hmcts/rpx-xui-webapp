
@fullfunctional
Feature: Test case type case creation and case details validations

  Background:
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with valid user details
    Then I should be redirected to EUI dashboard page
    
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
    
    Scenario: Validate Case event update, populating form page
        When I click on search button
        Then Search page should be displayed
        When I enter search fields jurisdiction "Family Divorce" case type "XUI Test Case type"
        When I click apply to perform case search
        Then I see results returned
        When I open first case in search results
        Then I see case details page
        Then Validate Case event update populating form page
    
    Scenario: Start create case page form fields validating against API response
        When I click on create case button
        Then Create case page should be displayed
        When I start case with jurisdiction "Family Divorce" case type "XUI Test Case type" and event "Create a case"
        Then I am on case form page
        Then Validate create case form pages fields against the api response
    
    Scenario: Validate Case event check your answers summary page links 	
        When I click on create case button
        Then Create case page should be displayed
        When I start case with jurisdiction "Family Divorce" case type "XUI Test Case type" and event "Create a case"
        Then I am on case form page
        Then I should be able to fill the form pages 
        Then Should be able to see check your answers summary page links 

    Scenario: Validate check your answers summary page 		
        When I click on create case button
        Then Create case page should be displayed
        When I start case with jurisdiction "Family Divorce" case type "XUI Test Case type" and event "Create a case"
        Then I am on case form page
        Then I should be able to fill the form pages 
        Then Validate check your answer summery page

    Scenario: Validate mandatory fields condition check in page 	
        When I click on create case button
        Then Create case page should be displayed
        When I start case with jurisdiction "Family Divorce" case type "XUI Test Case type" and event "Create a case"
        Then I am on case form page
        Then Validate mandatory fields functionality
    
    Scenario:  Validate event pages display show condition logic	
        When I click on create case button
        Then Create case page should be displayed
        When I start case with jurisdiction "Family Divorce" case type "XUI Test Case type" and event "Create a case"
        Then I am on case form page
        Then Validate event pages display show condition logic

   

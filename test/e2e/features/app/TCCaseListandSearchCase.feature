@fullfunctional
Feature: Test case type case list and find case workflow

  Background:
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with valid user details
    Then I should be redirected to EUI dashboard page
    
    Scenario: Validate workbasket inputs against the API response
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "Family Divorce" case type "XUI Test Case type" state "Case created" in case list page
        When I click search Apply in case list page
        Then Validate workbasket inputs against the API response

     Scenario: Validate workbasket complex values against the API response
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "Family Divorce" case type "XUI Test Case type" state "Case created" in case list page
        When I click search Apply in case list page
        Then Validate workbasket inputs complex values against the API response
          
    Scenario: Validate workbasket update on case type change
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "Family Divorce" case type "XUI Test Case type" state "Case created" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        When I select search criteria jurisdiction "Family Divorce" case type "Financial Remedy Consented" state "New Paper Case" in case list page
        When I click search Apply in case list page

    Scenario: validating the case list headers against api response
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "Family Divorce" case type "XUI Test Case type" state "Case created" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then validating the case list header against the api response
    
    Scenario: Validate search-inputs against the API response
        When I click on search button
        Then Search page should be displayed
        When I enter search fields jurisdiction "Family Divorce" case type "XUI Test Case type"
        When I click apply to perform case search
        Then Validate search inputs against the API response

    Scenario: Validating the search inputs case list headers against api response
        When I click on search button
        Then Search page should be displayed
        When I enter search fields jurisdiction "Family Divorce" case type "XUI Test Case type"
        When I click apply to perform case search
        Then I see results returned
        Then Validating the search inputs case list headers against api response

    Scenario: Validate search inputs on case type change
        When I click on search button
        Then Search page should be displayed
        When I enter search fields jurisdiction "Family Divorce" case type "XUI Test Case type"
        When I reset case search fields 
        When I enter search fields jurisdiction "Family Divorce" case type "Financial Remedy Consented"
        When I click apply to perform case search
        Then I see results returned

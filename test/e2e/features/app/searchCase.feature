
@search @regression
Feature: search criteria workflow

  Background:
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with valid user details
    Then I should be redirected to EUI dashboard page
    When I click on search button
    Then Search page should be displayed

@test
  Scenario: search criteria apply workflow
    When I enter search fields jurisdiction "Family Divorce" case type "Financial Remedy Consented"
    When I reset case search fields 
     When I enter search fields jurisdiction "Family Divorce" case type "Financial Remedy Consented"
    When I click apply to perform case search
    Then I see results returned
    When I open first case in search results
    Then I see case details page

  Scenario: search criteria reset workflow
    When I enter search fields jurisdiction "Family Divorce" case type "Financial Remedy Consented"
    When I reset case search fields
    Then search criteria details should be reset

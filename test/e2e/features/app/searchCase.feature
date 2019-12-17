@search @all
Feature: search criteria workflow

  Background:
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with valid user details
    Then I should be redirected to EUI dashboard page
    
  Scenario Outline:  search criteria apply workflow from Search Case Page
    When I click on search button
    Then Search page should be displayed
    When I enter search fields jurisdiction "<Jurisdiction>" case type "<CaseType>"
    When I reset case search fields 
    When I enter search fields jurisdiction "<Jurisdiction>" case type "<CaseType>"
    When I click apply to perform case search
    Then I see results returned
    When I open first case in search results
    Then I see case details page

    Examples:
    | Jurisdiction | CaseType |
    | Family Divorce | Financial Remedy Consented |
    | Family Divorce | Contested Financial Remedy |

  Scenario Outline:  search criteria apply workflow from Case list Page
    When I click on Case list
    Then I am on case list page
    When I select search criteria jurisdiction "<Jurisdiction>" case type "<CaseType>" state "Any" in case list page
    When I click search Reset in case list page
    When I select search criteria jurisdiction "<Jurisdiction>" case type "<CaseType>" state "Any" in case list page
    When I click search Apply in case list page
    Then I wait to see case results displayed
    When I open first case in case list page
    Then I see case details page

    Examples:
      | Jurisdiction   | CaseType                   |
      | Family Divorce | Financial Remedy Consented |
      | Family Divorce | Contested Financial Remedy |

  Scenario: search criteria reset workflow in case list page
    When I click on Case list
    Then I am on case list page
    When I select search criteria jurisdiction "Family Divorce" case type "Financial Remedy Consented" state "Any" in case list page
    When I click search Apply in case list page
    Then I wait to see case results displayed
    When I click search Reset in case list page
    Then I see search results on case list page are reset

  Scenario: search criteria reset workflow in search page
    When I click on search button
    Then Search page should be displayed
    When I enter search fields jurisdiction "Family Divorce" case type "Financial Remedy Consented"
    When I click apply to perform case search
    Then I see results returned
    When I reset case search fields
    Then search criteria details should be reset

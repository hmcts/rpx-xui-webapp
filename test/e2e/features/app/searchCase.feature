
Feature: search criteria workflow

  Background:
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with SSCS judge details
    Then I should be redirected to EUI dashboard page
    When I click on search button
    Then Search page should be displayed
    When I enter mandatory fields jurisdiction,case type and click on start button

  Scenario: search criteria apply workflow
    Then I should navigate to search criteria page
    When I select the search criteria details and click on apply button
    Then Case details should be displayed based on selected search criteria

  Scenario: search criteria reset workflow
    Then I should navigate to search criteria page
    When I select the search criteria details and click on reset button
    Then search criteria details should be reset

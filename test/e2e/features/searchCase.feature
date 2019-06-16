Feature: search criteria workflow

  Scenario: search criteria apply workflow
    Given I am on expert ui case list page
    When I click on search button
    Then I should navigate to search criteria page
    When I select the search criteria details and click on apply button
    Then Case details should be displayed based on selected search criteria.
  Scenario: search criteria reset workflow
    Given I am on expert ui case list page
    When I click on search button
    Then I should navigate to search criteria page
    When I select the search criteria details and click on reset button
    Then search criteria details should be reset

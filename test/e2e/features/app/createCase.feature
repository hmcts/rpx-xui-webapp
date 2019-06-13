Feature: create case workflow

  Background:
    Given I am on expert ui case list page
    When I click on create case button
    Then Create case page should be displayed
    When I enter mandatory fields jurisdiction,case type,event and click on start button
    Then I should navigate to Case details page

  Scenario: create case workflow
    When I Enter mandatory case details and click on continue button
    Then I should be on Appeal created page
    When I enter event details and click on submit button
    Then case should be created successfuly

  Scenario: validate cancel case workflow
    When I click on cancel button
    Then I should be display the expert ui case list page

  Scenario: validate previous case workflow
    When I click on previous button
    Then I should be display the expert ui case list page

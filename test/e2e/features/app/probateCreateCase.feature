
Feature: create case workflow

  Background:
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with SSCS judge details
    Then I should be redirected to EUI dashboard page
    When I click on create case button
    Then Create case page should be displayed

  @smoke
  Scenario: create case for Probate user workflow
    When I enter mandatory probate fields jurisdiction,case type,event and click on start button
    Then I should navigate to apply for probate page
    When I Enter mandatory details and click on save and continue button
    Then I should be on check your answers page
    When I click on save and continue button
    Then case should be created successfully


  Scenario: validate cancel case workflow
    When I Enter mandatory case details and click on continue button
    Then I should be on Appeal created page
    When I click on cancel button
    Then I should be display the expert ui case list page

  Scenario: validate previous case workflow
    When I Enter mandatory case details and click on continue button
    Then I should be on Appeal created page
    When I click on previous button
    Then I should be display the Case details page

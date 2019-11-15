
Feature: fr create case workflow

  Background:
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with valid user details
    Then I should be redirected to EUI dashboard page
    When I click on create case button
    Then Create case page should be displayed

@fr1
  Scenario: create case for FR user workflow
    When I create "consented"  FR Case

  @fr
  Scenario: create case for FR user workflow
    When I create "contested"  FR Case




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

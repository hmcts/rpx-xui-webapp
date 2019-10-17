
Feature: divorces create case workflow

  Background:
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with SSCS judge details
    Then I should be redirected to EUI dashboard page
    When I click on create case button
    Then Create case page should be displayed

 Scenario: create case for Divorces user workflow
     When I enter mandatory divorces fields jurisdiction,case type,event and click on start button
     Then I should navigate to about the solicitor page
     When I Enter mandatory solicitor details and click on continue button
     Then I should navigate to about the petitioner page
     When I Enter mandatory petitioner details and click on continue button
     Then I should navigate to about the respondent page
     When I Enter mandatory respondent details and click on continue button
     Then I should navigate to marriage certificate details page
     When I Enter mandatory marriage certificate details and click on continue button
     Then I should navigate to jurisdiction page
     When I select the legal connection and click on continue button
     Then I should navigate to reason for the divorce page
     When I select the fact reason and click on continue button
     Then I should navigate to statement of case page
     When I Enter mandatory statement of case details and click on continue button
     Then I should be on check your answers page
     When I click on save petition button
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

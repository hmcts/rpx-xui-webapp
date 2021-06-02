@fullfunctional
Feature: Error Validation

  Background:
    When I navigate to Expert UI Url


  Scenario: login and log out from EUI with valid user
    Given I am logged into Expert UI with valid user details
    Then I should be redirected to EUI dashboard page
    Then I select PublicLaw
    When I enter wrong case number and click submit
    Then I see custom error message



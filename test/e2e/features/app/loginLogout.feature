
@login
Feature: Login

  Background:
    When I navigate to Expert UI Url

  @EUI-42 @login @all @smoke
  Scenario: un-authenticated user login
    Then I am on Idam login page
    When I enter an Invalid email-address and password to login
    Then I should be redirected to the Idam login page
    Then I should see failure error summary


  @EUI-42 @logout @smoke @all
  Scenario: login and log out from EUI as SSCS user
    Given I am logged into Expert UI with SSCS judge details
    Then I should be redirected to EUI dashboard page
    When I select the sign out link
    Then I should be redirected to the Idam login page


  @EUI-42 @logout @all @smoke
  Scenario: login and log out from EUI as FR user
    Given I am logged into Expert UI with FR judge details
    Then I should be redirected to EUI dashboard page
    When I select the sign out link
    Then I should be redirected to the Idam login page


  @EUI-42 @logout @all @smoke
  Scenario: Verify the direct link navigate to login page
    Given I navigate to Expert UI Url direct link
    Then I should be redirected back to Login page after direct link

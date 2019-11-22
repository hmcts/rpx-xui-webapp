@smoke @regression
Feature: Login

  Background:
    When I navigate to Expert UI Url

#
#  Scenario: Login and Logout as SSCS user
#    Then I login as SSCS user
#    Then I check the user is logged
#    Then I click the signout
#    Then I logout successfully and back to Login page
#
#  Scenario: Login and Logout as FR user
#    Then I login as FR user
#    Then I check the user is logged
#    Then I click the signout
#    Then I logout successfully and back to Login page


    @all @smoke
  Scenario: un-authenticated user login
    Then I am on Idam login page
    When I enter an Invalid email-address and password to login
    Then I should be redirected to the Idam login page
    Then I should see failure error summary

@smoke
  Scenario: login and log out from EUI with valid user
    Given I am logged into Expert UI with valid user details
    Then I should be redirected to EUI dashboard page
    When I select the sign out link
    Then I should be redirected to the Idam login page

    @all
  Scenario: login and log out from EUI as Probate user
    Given I am logged into Expert UI with Probate user details
    Then I should be redirected to EUI dashboard page
    When I select the sign out link
    Then I should be redirected to the Idam login page


     @all @smoke
  Scenario: Verify the direct link navigate to login page
    Given I navigate to Expert UI Url direct link
    Then I should be redirected back to Login page after direct link

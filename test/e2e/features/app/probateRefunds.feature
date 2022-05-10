@probate @fullfunctional @refunds
Feature: Probate Refunds

  Background:
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with Probate user details
    Then I should be redirected to EUI dashboard page
    When I click on Refunds button
    Then Refunds page should be displayed

# @reviewcase
#   Scenario: Verify Review Case
#     When I click Review case
#     # Then I am on case form page

@processrefund
  Scenario: Verify Process Refund
    When I click Process refund
    Then Process refund page should be displayed

@reviewrefund
  Scenario: Verify Review Refund
    When I click Review refund
    Then Review refund page should be displayed

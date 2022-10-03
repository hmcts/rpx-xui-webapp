Feature: Verify Hearing Tab and Summary visible for SSCS

  Background:
    When I navigate to Expert UI Url direct link for SSCS
    Given I am logged into Expert UI with valid SSCS user details
    When I see hearings Summary

@hearings
  Scenario: Create Manual Hearing Request
    When I request hearing with preloaded values
    Then Hearing successful and shows in summary page


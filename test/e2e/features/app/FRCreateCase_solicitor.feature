Feature: FR create case workflow

  Background:
    When I navigate to Expert UI Url
    Given I am logged into Expert UI with valid user details
    Then I should be redirected to EUI dashboard page
    When I click on primary navigation header tab "Create case", I see selected tab page displayed
    Then Create case page should be displayed

  Scenario Outline:  Start FR Case creation
    When I start case with jurisdiction "<Jurisdiction>" case type "<CaseType>" and event "<Event>"
    Then I am on case form page
    Examples:
      | Jurisdiction   | CaseType                   | Event                     |
      | Family Divorce | Financial Remedy Consented | Consent Order Application |
      | Family Divorce | Contested Financial Remedy | Form A Application        |

  Scenario Outline:  Cancel FR Case creation
    When I start case with jurisdiction "<Jurisdiction>" case type "<CaseType>" and event "<Event>"
    When I click cancel link
    When I am on case list page
  Examples:
    | Jurisdiction   | CaseType                   | Event                     |
    | Family Divorce | Financial Remedy Consented | Consent Order Application |
    | Family Divorce | Contested Financial Remedy | Form A Application        |


  Scenario Outline:  Create and Submit FR Case
    When I start case with jurisdiction "<Jurisdiction>" case type "<CaseType>" and event "<Event>"
    When I create FR case
    Then I am on check your answers page
    When I submit case
    Then I see case details page
    Examples:
      | Jurisdiction   | CaseType                   | Event                     |
      | Family Divorce | Financial Remedy Consented | Consent Order Application |
      | Family Divorce | Contested Financial Remedy | Form A Application        |


  Scenario Outline: Start Next Step on  FR Case
    When I start case with jurisdiction "<Jurisdiction>" case type "<CaseType>" and event "<Event>"
    When I create FR case
    Then I am on check your answers page
    When I submit case
    Then I see case details page
    When I start case next step
    Examples:
      | Jurisdiction   | CaseType                   | Event                     |
      | Family Divorce | Financial Remedy Consented | Consent Order Application |
      | Family Divorce | Contested Financial Remedy | Form A Application        |

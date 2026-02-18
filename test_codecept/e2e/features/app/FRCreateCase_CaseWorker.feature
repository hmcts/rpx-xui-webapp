Feature: FR create case workflow - Case Worker

    Background:
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with valid Case Worker user details
        Then I should be redirected to EUI dashboard page
        When I click on primary navigation header tab "Create case", I see selected tab page displayed
        Then Create case page should be displayed

   Scenario Outline: Start FR Case Creation
        When I start case with jurisdiction "<Jurisdiction>" case type "<CaseType>" and event "<Event>"
        Then I am on case form page
    Examples:
    | Jurisdiction | CaseType| Event |
    | Family Divorce | Financial Remedy Consented | Consent Order Application |
    | Family Divorce | Contested Financial Remedy | Form A Application |

    Scenario Outline:  Create and Submit FR Casese
        When I start case with jurisdiction "<Jurisdiction>" case type "<CaseType>" and event "<Event>"
        When I create FR case
        Then I am on check your answers page
        When I submit case
        Then I see case details page
    Examples:
        | Jurisdiction   | CaseType                   | Event                     |
        | Family Divorce | Financial Remedy Consented | Consent Order Application |
        | Family Divorce | Contested Financial Remedy | Form A Application        |

@smoke
Feature: Smoke tests to validate successful deployment 
 
    Scenario: Validate App URL is accesible and redirects to IDAM for authentication
        When I navigate to Expert UI Url
        Then I am on Idam login page

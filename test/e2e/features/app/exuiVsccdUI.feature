Feature: Application feature variations with professional users Bs Non professional users (EXUI Vx CCD UI)

    Scenario: Share a case feature available to EXUI users
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with valid user details
        Then I should be redirected to EUI dashboard page
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "Family Divorce" case type "Divorce case - v115.00" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list selection feature "is" available

    Scenario: Share a case feature not available to CCD users when logged in to EXUI Manage Cases
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with non professional user details
        Then I should be redirected to EUI dashboard page
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "Family Divorce" case type "Financial Remedy Consented" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list selection feature "is not" available

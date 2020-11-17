Feature: Case List Selection

    Cases in case list page have check to select and multiple cases can be selected across pages that can be shared

    Background: Login as professional user
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with valid user details
        Then I should be redirected to EUI dashboard page


    Scenario: Can see the checkbox column
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "Family Divorce" case type "Divorce case - v115.00" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list table header has Select all checkbox column
        Then I see case list table each case row has checkbox column


    Scenario: Verify Case list selection and Unselection persistence on navigation to case view
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "Family Divorce" case type "Divorce case - v115.00" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list table header has Select all checkbox column
        Then I see case list table each case row has checkbox column
        When I select case at row 1 in case list page
        When I select case at row 2 in case list page
        When I select case at row 3 in case list page
        When I unselect case at row 1 in case list page
        When I click case at row 2 and navigate to case view page
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "Family Divorce" case type "Divorce case - v115.00" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list table has case at row 2 selected
        Then I see case list table has case at row 3 selected


    Scenario: Verify Case list selection and Unslection persistence over filter changes
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "Family Divorce" case type "Divorce case - v115.00" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list table header has Select all checkbox column
        Then I see case list table each case row has checkbox column
        When I select case at row 1 in case list page
        When I select case at row 2 in case list page
        When I select search criteria jurisdiction "Family Divorce" case type "Financial Remedy Consented" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        When I select case at row 3 in case list page
        When I select case at row 4 in case list page
        When I select search criteria jurisdiction "Family Divorce" case type "Divorce case - v115.00" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list table has case at row 1 selected
        Then I see case list table has case at row 2 selected

    Scenario: verify Case list select and unselect persists with case list pagination
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "Family Divorce" case type "Divorce case - v115.00" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list table header has Select all checkbox column
        Then I see case list table each case row has checkbox column
        When I select case at row 1 in case list page
        When I select case at row 2 in case list page
        When I click case list pagination "next" page
        Then I wait to see case results displayed
        When I select case at row 3 in case list page
        When I select case at row 4 in case list page
        When I click case list pagination "previous" page
        Then I wait to see case results displayed
        Then I see case list table has case at row 1 selected
        Then I see case list table has case at row 2 selected

    Scenario: verify Case list select and unselect are retained  with sorting
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "Family Divorce" case type "Divorce case - v115.00" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list table header has Select all checkbox column
        Then I see case list table each case row has checkbox column
        When I select case at row 1 in case list page
        When I select case at row 2 in case list page
        When I sort case list table by column at position 2
        Then I see case list table has 2 rows selected

    Scenario: Verify Share case of selected cases
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "Family Divorce" case type "Divorce case - v115.00" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        When I select case at row 1 in case list page
        When I select case at row 2 in case list page
        When I select case at row 3 in case list page
        Then I see case list table has 3 rows selected
        When I click Share Case button
        Then I see Share Case page is displayed
        Then I see Share case page has 3 cases listed


Feature: Case List Selection

    Cases in case list page have check to select and multiple cases can be selected across pages that can be shared

    Background: Login as professional user
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with valid user details
        Then I should be redirected to EUI dashboard page
    
    Scenario: Can see the checkbox column
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "<Jurisdiction>" case type "<CaseType>" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list table header has checkbox column
        Then I see case list table each case row has checkbox column 

    Scenario: Verify Case list selection and Unslection persistence
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "<Jurisdiction>" case type "<CaseType>" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list table header has checkbox column
        Then I see case list table each case row has checkbox column
        When I select case 1 in case list table
        Then I select case 2 in case list table
        Then I select case 3 in case list table
        Then I unselect case 1 in case list table
        When I click on create case button
        Then Create case page should be displayed
        When I click on Case list
        Then I am on case list page
        Then I wait to see case results displayed
        Then I see case list table has case 2 selected
        Then I see case list table has case 3 selected

    Scenario: Verify Case list selection and Unslection persistence over filter changes
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "<Jurisdiction1>" case type "<CaseType1>" state "Any1" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list table header has checkbox column
        Then I see case list table each case row has checkbox column
        When I select case 1 in case list table
        Then I select case 2 in case list table
        When I select search criteria jurisdiction "<Jurisdiction2>" case type "<CaseType2>" state "Any2" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        When I select case 1 in case list table
        Then I select case 2 in case list table
        When I select search criteria jurisdiction "<Jurisdiction1>" case type "<CaseType1>" state "Any1" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list table has case 1 selected
        Then I see case list table has case 2 selected

    Scenario: verify Case list select and unselect persists with case list pagination
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "<Jurisdiction>" case type "<CaseType>" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list table header has checkbox column
        Then I see case list table each case row has checkbox column
        When I select case 1 in case list table
        Then I select case 2 in case list table
        Then I click case list next page
        Then I wait to see case results displayed
        When I select case 3 in case list table
        Then I select case 4 in case list table
        Then I click case list previous page
        Then I wait to see case results displayed
        Then I see case list table has case 1 selected
        Then I see case list table has case 2 selected

    Scenario: verify Case list select and unselect are retained  with sorting
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "<Jurisdiction>" case type "<CaseType>" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list table header has checkbox column
        Then I see case list table each case row has checkbox column
        When I select case 1 in case list table
        Then I select case 2 in case list table
        Then I sort case list table by column
        Then I see case list table has 2 rows selected

    Scenario: verify Case list page information container "Why some cases are not selectable"
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "<Jurisdiction>" case type "<CaseType>" state "Any" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see why Can't select a case information
        Then I see why Can't select a case information details not displayed
        Then I click on why Can't select a case information container
        Then I see why Can't select a case information details is displayed
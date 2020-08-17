@caseShare
Feature: Share Case page features
    User can share case with other users within organisation    

    Background: Login as professional user
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with valid user details
        Then I should be redirected to EUI dashboard page

    @all  
    Scenario: Verify User can Deselect a case from list of selected cases
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
        When I click Share Case button
        Then I see Share Case page is displayed
        Then I see Share case page has 3 cases listed
        When I click deselect button for case 1 from share case page
        Then I see Share case page has 2 cases listed
        When I click deselect button for case 1 from share case page
        Then I see Share case page has 1 cases listed
        When I click deselect button for case 1 from share case page
        Then I see Share case page has 0 cases listed
        Then I see message "No cases to display." with all cases deselected

    Scenario: Verify Clicking Back after removing case(s) from the share a case screen
        When I click on Case list
        Then I am on case list page
        When I select search criteria jurisdiction "Family Divorce" case type "Contested Financial Remedy" state "Application Drafted" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list table header has Select all checkbox column
        Then I see case list table each case row has checkbox column
        When I select case at row 1 in case list page
        When I select case at row 2 in case list page
        When I select case at row 3 in case list page
        When I click Share Case button
        Then I see Share Case page is displayed
        Then I see Share case page has 3 cases listed
        When I click deselect button for case 1 from share case page
        When I click back link in share case page
        Then I am on case list page
        When I select search criteria jurisdiction "Family Divorce" case type "Contested Financial Remedy" state "Application Drafted" in case list page
        When I click search Apply in case list page
        Then I wait to see case results displayed
        Then I see case list table has 2 rows selected

    Scenario: Verify Case details individual case expand collapse feature
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
        When I click Share Case button
        Then I see Share Case page is displayed
        Then I see Share case page has 3 cases listed
        Then I see share case page, case 1 has details collpased
        Then I see share case page, case 2 has details collpased
        Then I see share case page, case 3 has details collpased
        When I click case 1 expand icon in share case page
        Then I see share case page, case 1 has details expanded
        Then I see share case page, case 2 has details collpased
        Then I see share case page, case 3 has details collpased
        When I click case 1 collapse icon in share case page
        Then I see share case page, case 1 has details collpased
        Then I see share case page, case 2 has details collpased
        Then I see share case page, case 3 has details collpased
        
    Scenario: Verify Case details Open all/Close all
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
        When I click Share Case button
        Then I see Share Case page is displayed
        Then I see Share case page has 3 cases listed
        Then I see share case page, case 1 has details collpased
        Then I see share case page, case 2 has details collpased
        Then I see share case page, case 3 has details collpased
        Then I see OpenAll text displayed as "Open all" in share case page
        When I click case 1 expand icon in share case page
        Then I see share case page, case 1 has details expanded
        Then I see share case page, case 2 has details collpased
        Then I see share case page, case 3 has details collpased
        Then I see OpenAll text displayed as "Open all" in share case page
        When I click case 2 expand icon in share case page
        Then I see share case page, case 1 has details expanded
        Then I see share case page, case 2 has details expanded
        Then I see share case page, case 3 has details collpased
        Then I see OpenAll text displayed as "Open all" in share case page
        When I click case 3 expand icon in share case page
        Then I see share case page, case 1 has details expanded
        Then I see share case page, case 2 has details expanded
        Then I see share case page, case 3 has details expanded
        Then I see OpenAll text displayed as "Close all" in share case page
        When I click CloseAll in share case page
        Then I see CloseAll text displayed as "Open all" in share case page
        Then I see share case page, case 1 has details collpased
        Then I see share case page, case 2 has details collpased
        Then I see share case page, case 3 has details collpased
        When I click OpenAll in share case page
        Then I see OpenAll text displayed as "Close all" in share case page
        Then I see share case page, case 1 has details expanded
        Then I see share case page, case 2 has details expanded
        Then I see share case page, case 3 has details expanded

    Scenario: Verify Add user to share a case with
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
        When I click Share Case button
        Then I see Share Case page is displayed
        Then I see Share case page has 3 cases listed
        # Then I see user Add button is disabled in share case page
        When I enter text "@" in user email in share case page
        Then I see users list filtered with containing text "@"
        When I select a user not shared with atleast one case listed in share case page
        Then I see user Add button is enabled in share case page
        When I click Add user button in share case page
        Then I see last added user is marked as to be added in cases
        When I click continue in share case page
        Then I see Share Case check and confirm page
        Then I see Share Case changes are listed as modified in share case page

    Scenario: Verify Add a user with atleast one case already shared
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
        When I click Share Case button
        Then I see Share Case page is displayed
        Then I see Share case page has 3 cases listed
        # Then I see user Add button is disabled in share case page
        When I enter text "@" in user email in share case page
        Then I see users list filtered with containing text "@"
        When I select a user already shared with atleast one case listed in share case page
        Then I see user Add button is enabled in share case page
        When I click Add user button in share case page
        Then I see last added user is marked as to be added in cases
        When I click continue in share case page
        Then I see Share Case check and confirm page
        Then I see Share Case changes are listed as modified in share case page
        @
    Scenario: Verify Remove user to share a case with
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
        When I click Share Case button
        Then I see Share Case page is displayed
        Then I see Share case page has 3 cases listed
        When I click Remove link for a user already shared a case
        Then I see a user is marked to be removed in a listed case
        When I click continue in share case page
        Then I see Share Case check and confirm page
        Then I see Share Case changes are listed as modified in share case page

    Scenario: Verify add and Remove user to share a case with
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
        When I click Share Case button
        Then I see Share Case page is displayed
        Then I see Share case page has 3 cases listed
        When I enter text "@" in user email in share case page
        Then I see users list filtered with containing text "@"
        When I select a user not shared with atleast one case listed in share case page
        Then I see user Add button is enabled in share case page
        When I click Add user button in share case page
        When I click Remove link for a user already shared a case
        Then I see last added user is marked as to be added in cases
        Then I see a user is marked to be removed in a listed case
        When I click continue in share case page
        Then I see Share Case check and confirm page
        Then I see Share Case changes are listed as modified in share case page

    
    Scenario: Verify back link on check and confirm page and changes persist in Share case page 
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
        When I click Share Case button
        Then I see Share Case page is displayed
        Then I see Share case page has 3 cases listed
        When I enter text "@" in user email in share case page
        Then I see users list filtered with containing text "@"
        When I select a user not shared with atleast one case listed in share case page
        Then I see user Add button is enabled in share case page
        When I click Add user button in share case page
        When I click Remove link for a user already shared a case
        Then I see last added user is marked as to be added in cases
        Then I see a user is marked to be removed in a listed case
        When I click continue in share case page
        Then I see Share Case check and confirm page
        Then I see Share Case changes are listed as modified in share case page
        When I click back link in Share Case check and confirm page
        Then I see Share Case page is displayed
        Then I see share case changes persisted in displayed in Share Case page

    
    Scenario: Verify change link on check and confirm page and changes persist in Share case page
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
        When I click Share Case button
        Then I see Share Case page is displayed
        Then I see Share case page has 3 cases listed
        When I enter text "@" in user email in share case page
        Then I see users list filtered with containing text "@"
        When I select a user not shared with atleast one case listed in share case page
        Then I see user Add button is enabled in share case page
        When I click Add user button in share case page
        When I click Remove link for a user already shared a case
        Then I see last added user is marked as to be added in cases
        Then I see a user is marked to be removed in a listed case
        When I click continue in share case page
        Then I see Share Case check and confirm page
        Then I see Share Case changes are listed as modified in share case page
        When I click change link for case at pos 1 in Share Case check and confirm page
        Then I see Share Case page is displayed
        Then I see share case changes persisted in displayed in Share Case page

    # This is not part of MVP . To be enabled feature implemented to persist changes in Share a case page
    # Scenario: Verify add and Remove user to share a case with persist on moving away from share case page
    #     When I click on Case list
    #     Then I am on case list page
    #     When I select search criteria jurisdiction "Family Divorce" case type "Divorce case - v115.00" state "Any" in case list page
    #     When I click search Apply in case list page
    #     Then I wait to see case results displayed
    #     Then I see case list table header has Select all checkbox column
    #     Then I see case list table each case row has checkbox column
    #     When I select case at row 1 in case list page
    #     When I select case at row 2 in case list page
    #     When I select case at row 3 in case list page
    #     When I click Share Case button
    #     Then I see Share Case page is displayed
    #     Then I see Share case page has 3 cases listed
    #     When I enter text "@" in user email in share case page
    #     Then I see users list filtered with containing text "@"
    #     When I select a user not shared with atleast one case listed in share case page
    #     Then I see user Add button is enabled in share case page
    #     When I click Add user button in share case page
    #     When I click Remove link for a user already shared a case
    #     Then I see last added user is marked as to be added in cases
    #     Then I see a user is marked to be removed in a listed case
    #     When I click back link in share case page
    #     Then I am on case list page
    #     When I select search criteria jurisdiction "Family Divorce" case type "Divorce case - v115.00" state "Any" in case list page
    #     When I click search Apply in case list page
    #     Then I wait to see case results displayed
    #     Then I see case list table header has Select all checkbox column
    #     Then I see case list table each case row has checkbox column
    #     When I select case at row 1 in case list page
    #     When I select case at row 2 in case list page
    #     When I select case at row 3 in case list page
    #     When I click Share Case button
    #     Then I see Share Case page is displayed
    #     Then I see Share case page has 3 cases listed
    #     Then I see share case changes persisted in displayed in Share Case page
    #     When I click continue in share case page
    #     Then I see Share Case check and confirm page
    #     Then I see Share Case changes are listed as modified in share case page

    
    Scenario: Verify Completion o share case journey
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
        When I click Share Case button
        Then I see Share Case page is displayed
        Then I see Share case page has 3 cases listed
        When I enter text "@" in user email in share case page
        Then I see users list filtered with containing text "@"
        When I select a user not shared with atleast one case listed in share case page
        Then I see user Add button is enabled in share case page
        When I click Add user button in share case page
        When I click Remove link for a user already shared a case
        Then I see last added user is marked as to be added in cases
        Then I see a user is marked to be removed in a listed case
        Then I see share case changes persisted in displayed in Share Case page
        When I click continue in share case page
        Then I see Share Case check and confirm page
        Then I see Share Case changes are listed as modified in share case page
        When I click Confirm button in Share Case check and confirm page
        Then I see success message for Share case changes




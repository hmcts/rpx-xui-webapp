@caseflags
Feature: Party Level Case Flags

    Party Level Case Flags

    Background: Login as professional user
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with case flags user details
        Then I should be redirected to EUI dashboard page
        When I select search criteria jurisdiction "Family Divorce" case type "CaseView Callback Messages 2" state "Case flag created" in case list page and click apply



    Scenario: Can see the checkbox column
        When I click case at row 14 and navigate to case view page
        # When I navigate to case "1658445194416863"
        # Then I am on case list page
        # Then I am on "Manage Case flags test data" tab
        # When I select "Case flags" tab
        # Then I validate case flags banner
        When I start case next step "Create case flag"
        Then I am on case flags "Where should this flag be added?" page
        When I select "Rtiru Second Case Flag Party name 1" case flag option
        Then I am on case flags "Select flag type" page
        When I select "Complex Case" case flag option
        Then I am on case flags "Add comments for this flag" page
        When I enter "test case flags" in text field
        # Then I am on case flags "Review flag details" page
        When I submit case flag
        Then I see the case flags banner
        # Then I am on Select Flag Type page
        # When I select "Complex Case" flag type
        # Then I am on Add comments page
        # When I add comments
        # Then I am on Review Flag Details page
        # When I submit the case flag
        # And I select "Case flags" tab
        # Then I validate case flags banner

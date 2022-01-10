@ng @test 
Feature: Global search

    Background: Setup
        Given I set MOCK with user "CASEWORKER_GLOBALSEARCH" and roles "caseworker,caseworker-befta_master,caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer" with reference "mockUserDetails"
        Given I start MockApp
        Given I navigate to home page
        Then I click on primary navigation header tab "Search", I see selected tab page displayed
        Then I see global search Page

    Scenario: Search page field validation
        Then I validate field services has following values in global search page
            | value                |
            | BEFTA Master         |
            | Immigration & Asylum |

        When I click search button in global search page
        Then I see error message "Enter information in at least one field" in global search Page

        When I input field "16-digit case reference" with value "1234567890123456" in global search Page
        When I input field "Other reference" with value "some test ref" in global search Page
        When I input field "Full name" with value "Sherlock Holmes" in global search Page
        When I input field "First line of address" with value "221B Baker street" in global search Page
        When I click search button in global search page
        Then I see global search results page
        When I click Change search link in global search results page
        Then I see global search Page
        Then I validate input field "16-digit case reference" has value "1234567890123456" in global search page
        Then I validate input field "Other reference" has value "some test ref" in global search page
        Then I validate input field "Full name" has value "Sherlock Holmes" in global search page
        Then I validate input field "First line of address" has value "221B Baker street" in global search page


        When I input field "Postcode" with value "ABC" in global search Page
        When I click search button in global search page
        Then I see error message "Enter a valid postcod" for field "Postcode" in global search Page
        When I input field "Postcode" with value "SE12AB" in global search Page
        When I click search button in global search page
        Then I see global search results page
        When I click Change search link in global search results page
        Then I see global search Page

        When I input field "Email address" with value "abc.com" in global search Page
        When I click search button in global search page
        Then I see error message "Enter an email address in the correct format, like name@example.com" for field "Email address" in global search Page
        When I input field "Email address" with value "abc@xyz.com" in global search Page
        When I click search button in global search page
        Then I see global search results page
        When I click Change search link in global search results page
        Then I see global search Page
        Then I validate input field "Email address" has value "abc@xyz.co" in global search page


        When I input date field "Date of birth" with format DD-MM-YYYY "32-01-2021" in global search page
        When I click search button in global search page
        Then I see error message "Enter a valid date of birth" for field "Date of birth" in global search Page
        When I input date field "Date of birth" with format DD-MM-YYYY "30-21-2021" in global search page
        When I click search button in global search page
        Then I see error message "Enter a valid date of birth" for field "Date of birth" in global search Page
        #  When I input date field "Date of birth" with format DD-MM-YYYY "30-01-2021234" in global search page
        # When I click search button in global search page
        #  Then I see error message "Enter a valid date of birth" for field "Date of birth" in global search Page
        When I input date field "Date of birth" with format DD-MM-YYYY "30-01-2000" in global search page
        When I click search button in global search page
        Then I see global search results page
        When I click Change search link in global search results page
        Then I see global search Page

        When I input date field "Date of death" with format DD-MM-YYYY "32-01-2021" in global search page
        When I click search button in global search page
        Then I see error message "Enter a valid date of death" for field "Date of death" in global search Page
        When I input date field "Date of death" with format DD-MM-YYYY "30-21-2021" in global search page
        When I click search button in global search page
        Then I see error message "Enter a valid date of death" for field "Date of death" in global search Page
        #  When I input date field "Date of death" with format DD-MM-YYYY "30-01-2021234" in global search page
        # When I click search button in global search page
        #  Then I see error message "Enter a valid date of death" for field "Date of death" in global search Page
        When I input date field "Date of death" with format DD-MM-YYYY "30-01-1999" in global search page
        When I click search button in global search page
        Then I see error message "The date of death cannot be earlier than the date of birth" for field "Date of death" in global search Page


        When I input date field "Date of death" with format DD-MM-YYYY "30-01-2010" in global search page
        When I click search button in global search page
        Then I see global search results page
        When I click Change search link in global search results page
        Then I see global search Page


        Then I validate input field "16-digit case reference" has value "1234567890123456" in global search page
        Then I validate input field "Other reference" has value "some test ref" in global search page
        Then I validate input field "Full name" has value "Sherlock Holmes" in global search page
        Then I validate input field "First line of address" has value "221B Baker street" in global search page

        Then I validate input field "Email address" has value "abc@xyz.com" in global search page
        Then I validate input field "Postcode" has value "SE12AB" in global search page

        Then I validate input field "Date of birth" has value "30-1-2000" in global search page
        Then I validate input field "Date of death" has value "30-1-2010" in global search page


        When I input field "16-digit case reference" with value "" in global search Page
        When I input field "Other reference" with value "f" in global search Page
        When I input field "Full name" with value "s" in global search Page
        When I input field "First line of address" with value "" in global search Page
        When I input field "Postcode" with value "" in global search Page
        When I input field "Email address" with value "" in global search Page
        When I input date field "Date of birth" with format DD-MM-YYYY "" in global search page
        When I input date field "Date of death" with format DD-MM-YYYY "" in global search page

        When I click search button in global search page
        Then I see global search results page
        When I click Change search link in global search results page
        Then I see global search Page

        Then I validate input field "16-digit case reference" has value "" in global search page
        Then I validate input field "Other reference" has value "" in global search page
        Then I validate input field "Full name" has value "" in global search page
        Then I validate input field "First line of address" has value "" in global search page

        Then I validate input field "Email address" has value "" in global search page
        Then I validate input field "Postcode" has value "" in global search page

        Then I validate input field "Date of birth" has value "" in global search page
        Then I validate input field "Date of death" has value "" in global search page


    Scenario: Date fields validation error
        When I input date field "Date of birth" with format DD-MM-YYYY "302-21-2021" in global search page
        When I click search button in global search page
        When I input field "16-digit case reference" with value "1234567890123456" in global search Page

        Then I see error message "Enter a valid date of birth" for field "Date of birth" in global search Page
        When I input date field "Date of birth" with format DD-MM-YYYY "" in global search page
        When I click search button in global search page
        Then I see global search results page


        When I click Change search link in global search results page
        Then I see global search Page

        When I input date field "Date of death" with format DD-MM-YYYY "302-21-2021" in global search page
        When I click search button in global search page
        Then I see error message "Enter a valid date of death" for field "Date of death" in global search Page
        When I input date field "Date of death" with format DD-MM-YYYY "" in global search page
        When I click search button in global search page
        Then I see global search results page

        When I click Change search link in global search results page
        Then I see global search Page

        When I input date field "Date of birth" with format DD-MM-YYYY "30-01-2000" in global search page
        When I input date field "Date of death" with format DD-MM-YYYY "30-01-1999" in global search page
        When I click search button in global search page
        Then I see error message "The date of death cannot be earlier than the date of birth" for field "Date of death" in global search Page

    Scenario: Case search results view column values
        Given I set set global search mock results response and resultInfo
            | caseStartRecord | casesReturned | moreResultsToGo |
            | 1               | 10            | false           |

        Given I set global search mock results with values
            | index | processForAccess | caseNameHmctsInternal | caseReference    | CCDJurisdictionName | stateId      | baseLocationName |
            | 0     | CHALLENGED       | Test case 1           | 1234567812345678 | Test Jurisdiction   | Case created | Test location 1  |
            | 1     | SPECIFIC         | Test case 2           | 8765432187654321 | Test Jurisdiction   | Case created | Test location 2  |
        Given I start MockApp
        When I input field "16-digit case reference" with value "1234567890123456" in global search Page

        When I click search button in global search page
        Then I see global search results page

        Then I validate global search results displayed count 10
        Then I validate global search results values
            | Row_Num | Case             | Service           | State        | Location        | ACTION_LINK_COLUMN |
            | 1       | Test case 1      | Test Jurisdiction | Case created | Test location 1 | Challenged access  |
            | 1       | 1234567812345678 | Test Jurisdiction | Case created | Test location 1 | Challenged access  |
            | 2       | Test case 2      | Test Jurisdiction | Case created | Test location 2 | Specific access    |
            | 2       | 8765432187654321 | Test Jurisdiction | Case created | Test location 2 | Specific access    |

    Scenario: Case search results view Pagination controls
        Given I set set global search mock results response and resultInfo
            | caseStartRecord | casesReturned | moreResultsToGo |
            | 1               | 25            | true            |
        Given I start MockApp
        When I input field "16-digit case reference" with value "1234567890123456" in global search Page

        When I click search button in global search page
        Then I see global search results page
        Then I validate global search results displayed count 25
        Then I validate global search results pagination link "Next page" is enabled
        Then I validate global search results pagination link "Previous page" is disabled


        Given I set set global search mock results response and resultInfo
            | caseStartRecord | casesReturned | moreResultsToGo |
            | 26              | 20            | false           |
        Given I start MockApp
        When I click global search results pagination link "Next page"
        Then I validate global search results displayed count 20
        Then I validate global search results pagination link "Next page" is disabled
        Then I validate global search results pagination link "Previous page" is enabled

        Given I set set global search mock results response and resultInfo
            | caseStartRecord | casesReturned | moreResultsToGo |
            | 1               | 25            | true            |
        Given I start MockApp

        When I click global search results pagination link "Previous page"
        Then I validate global search results displayed count 25
        Then I validate global search results pagination link "Next page" is enabled
        Then I validate global search results pagination link "Previous page" is disabled


    Scenario: Case search results view validations view link
        Given I set set global search mock results response and resultInfo
            | caseStartRecord | casesReturned | moreResultsToGo |
            | 1               | 10            | false           |

        Given I start MockApp
        When I input field "16-digit case reference" with value "1234567890123456" in global search Page

        When I click search button in global search page
        Then I see global search results page
        Then I validate global search results displayed count 10
        When I click action link "View" at row 1 in global search results page
        Then I see case details page


    Scenario: Case search results view validations challenged access
        Given I set set global search mock results response and resultInfo
            | caseStartRecord | casesReturned | moreResultsToGo |
            | 1               | 10            | false           |

        Given I set global search mock results with values
            | index | processForAccess | caseNameHmctsInternal | caseReference    | CCDJurisdictionName | stateId      | baseLocationName |
            | 0     | CHALLENGED       | Test case 1           | 1234567812345678 | Test Jurisdiction   | Case created | Test location 1  |
            | 1     | SPECIFIC         | Test case 2           | 8765432187654321 | Test Jurisdiction   | Case created | Test location 2  |
        Given I start MockApp
        When I input field "16-digit case reference" with value "1234567890123456" in global search Page

        When I click search button in global search page
        Then I see global search results page


        Then I validate global search results displayed count 10

        When I click action link "Challenged access" at row 1 in global search results page
        Then I see case details challenged access request page

    Scenario: Case search results view validations Specific access
        Given I set set global search mock results response and resultInfo
            | caseStartRecord | casesReturned | moreResultsToGo |
            | 1               | 10            | false           |

        Given I set global search mock results with values
            | index | processForAccess | caseNameHmctsInternal | caseReference    | CCDJurisdictionName | stateId      | baseLocationName |
            | 0     | CHALLENGED       | Test case 1           | 1234567812345678 | Test Jurisdiction   | Case created | Test location 1  |
            | 1     | SPECIFIC         | Test case 2           | 8765432187654321 | Test Jurisdiction   | Case created | Test location 2  |

        Given I start MockApp
        When I input field "16-digit case reference" with value "1234567890123456" in global search Page

        When I click search button in global search page
        Then I see global search results page


        Then I validate global search results displayed count 10
        # Then I validate global search results values
        #     ||||

        When I click action link "Specific access" at row 2 in global search results page
        Then I see case details specific access request page


    Scenario: Search from header all valid case refence formats 
        Given I set global search mock results count 1
        Given I start MockApp

        Then I validate valid global search case reference searches  
            | ScenarioDescription                        | caseReference          |
            | shorter than 16 digit              | 1234123412341234    |
            | 16 digit with space                | 1234 1234 1234 1234 |
            | 16 digit with hyphens              | 1234-1234-1234-1234 |
            | 16 digit with wild card at end     | 123412341234123*    |
            | 16 digit with wild card            | 12341234123*1234    |
            | 16 digit with wild card and hyphen | 1234-1234-123*-1234 |
            | 16 digit with wild card and space  | 1234 1234 123* 1234 |

    Scenario: Search from header all invalid case refence formats
        Given I set global search mock results count 1
        Given I start MockApp

        Then I validate invalid global search case reference searches
            | ScenarioDescription                | caseReference       |
            | shorter than 16 digit           | 1234                 |
            | longer than 16 digit            | 12341234123412341234 |
            | 16 digit with 2 wild card chars | 12341234123412**     |
            | with Alpha numeric              | 1Abcd67812345678     |
            | with special character          | 1$%^&@6781234567     |




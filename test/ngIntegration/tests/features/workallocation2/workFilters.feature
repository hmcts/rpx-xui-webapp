@ng
Feature: WA Release 2: My work - Work filters

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK locations with names in service "IA"
            | id    | locationName           |
            | 20001 | IA Court Aldgate Tower |
            | 20002 | IA Court Birmingham    |
            | 2003  | IA Court Bradford      |
            | 20004 | IA Court Glasgow       |
            | 20005 | IA Court Hatton Cross  |
            | 20006 | IA Court Newcastle     |
            | 20007 | IA Court Newport       |
            | 20008 | IA Court North Shields |
            | 20009 | IA Court Taylor House  |

        Given I set MOCK locations with names in service "SSCS"
            | id    | locationName             |
            | 20010 | SSCS Court Aldgate Tower |
            | 20011 | SSCS Court Birmingham    |
            | 20012 | SSCS Court Bradford      |
            | 20013 | SSCS Court Glasgow       |
            | 20014 | SSCS Court Hatton Cross  |
            | 20015 | SSCS Court Newcastle     |
            | 20016 | SSCS Court Newport       |
            | 20017 | SSCS Court North Shields |
            | 20018 | SSCS Court Taylor House  |
      

        Given I set MOCK request "/workallocation2/task" intercept with reference "workallocationTaskRequest"
        Given I set MOCK request "/workallocation2/my-work/cases" intercept with reference "workallocationCasesRequest"

    Scenario Outline:  Work filters show hide button and Apply for "<UserType>"
        Given I set MOCK with "wa_release_2" release user and roles "<Roles>"
        Given I start MockApp
        Given I navigate to home page
        # When I click on primary navigation header "My work"
        Then I see work filter button displayed
        Then I validate work filter button text is "Show work filter"
        # Then I validate work location filter batch and hint labels are not displayed
        Then I validate location filter is not displayed
        When I click work filter button to "Show" filter
        Then I validate work filter button text is "Hide work filter"


        Then I validate my work filter services container displayed
        Then I validate my work filter location search displayed
        # Then I validate my work filter services listed
        # Then I Validate my work filter services selected
        # Then I validate my work filter locations selected


        # When I select service "" in my work filter
        # When I unselect service "" in my work filter
        # When I search for location text "" in my work filters
        # Then I see location search results in my work filter
        # When I select locations search result "" in my work filter
        # Then I see location "" selected in my work filter
        # When I click add location button in my work filter



        When I click work location filter Apply button

        Then I validate my work filter services container not displayed
        When I click work filter button to "Show" filter
        Then I validate my work filter services container displayed

        Examples:
            | UserType       | Roles                                                            |
            | Caseworker IAC | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer |
    # | Judge          | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker    |

    Scenario Outline:  Work filters mandatory field validations
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles " caseworker-ia-caseofficer,caseworker-ia-admofficer, task-supervisor,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK person with user "IAC_CaseOfficer_R2" and roles "<Roles>,task-supervisor,case-allocator"
        |locationId|locationName|
        | 20001 | IA Court Aldgate Tower |
       
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |
        Given I start MockApp
        Given I navigate to home page
        # When I click on primary navigation header "My work"

        Then I see work filter button displayed
        Then I validate work filter button text is "Show work filter"
        # Then I validate work location filter batch and hint labels are not displayed
        Then I validate location filter is not displayed
        When I click work filter button to "Show" filter
        When I unselect service "SSCS" in my work filter
        When I unselect service "Immigration and Asylum" in my work filter
        When I click work location filter Apply button
        Then I see error message "Select a service" for service work filter in my work page
        Then I see error message of type "message" displayed with message "Select a service"

        When I select service "SSCS" in my work filter
        When I select service "Immigration and Asylum" in my work filter

        When I remove slected location "IA Court" from my work filters

        When I click work location filter Apply button
        Then I see error message "Search for a location by name" for location work filter in my work page
        Then I see error message of type "message" displayed with message "Enter a location"

        When I search for location text "IA Court Taylor" in my work filters
        Then I see location search results in my work filter
            | name                  |
            | IA Court Taylor House |
        When I select locations search result "IA Court Taylor House" in my work filter
        When I click add location button in my work filter
        Then I see location "IA Court Taylor House" selected in my work filter
        When I click work location filter Apply button
        Then I validate my work filter services container not displayed


        Examples:
            | UserType | Roles                                                         |
            | Caseworker IAC | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer |
            # | Judge    | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker |



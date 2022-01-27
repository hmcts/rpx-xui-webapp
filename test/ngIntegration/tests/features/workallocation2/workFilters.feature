@ng 
Feature: WA Release 2: My work - Work filters

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK locations with names in service "IA"
            | locationName  |
            | IA Court Aldgate Tower |
            | IA Court Birmingham |
            | IA Court Bradford |
            | IA Court Glasgow |
            | IA Court Hatton Cross |
            | IA Court Newcastle |
            | IA Court Newport |
            | IA Court North Shields |
            | IA Court Taylor House |

        Given I set MOCK locations with names in service "SSCS"
            | locationName           |
            | SSCS Court Aldgate Tower |
            | SSCS Court Birmingham |
            | SSCS Court Bradford |
            | SSCS Court Glasgow |
            | SSCS Court Hatton Cross |
            | SSCS Court Newcastle |
            | SSCS Court Newport |
            | SSCS Court North Shields |
            | SSCS Court Taylor House |
        Given I set MOCK location for person of type "caseworker" in release "wa_release_2"
            | id    | locationName  |
            | 12345 | Aldgate Tower |

        Given I set MOCK request "/workallocation2/task" intercept with reference "workallocationTaskRequest"
        Given I set MOCK request "/workallocation2/my-work/cases" intercept with reference "workallocationCasesRequest"


    Scenario Outline:  Work filters show hide button and Apply for "<UserType>"
        Given I set MOCK with "wa_release_2" release user and roles "<Roles>"
        Given I start MockApp
        Given I navigate to home page
        # When I click on primary navigation header "My work"
        Then I see work filter button displayed
        Then I validate work filter button text is "Show work filter"
        Then I validate work location filter batch and hint labels are not displayed
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
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |
        Given I start MockApp
        Given I navigate to home page
        # When I click on primary navigation header "My work"

        Then I see work filter button displayed
        Then I validate work filter button text is "Show work filter"
        Then I validate work location filter batch and hint labels are not displayed
        Then I validate location filter is not displayed
        When I click work filter button to "Show" filter
        When I unselect service "SSCS" in my work filter
        When I unselect service "Immigration and Asylum" in my work filter
        When I click work location filter Apply button
        Then I see error message "Select a service" for service work filter in my work page
        Then I see error message of type "message" displayed with message "Select a service"

        When I select service "SSCS" in my work filter
        When I select service "Immigration and Asylum" in my work filter

        When I remove slected location "IA court" from my work filters

        When I click work location filter Apply button
        Then I see error message "Search for a location by name" for location work filter in my work page
        Then I see error message of type "message" displayed with message "Enter a location"

        When I search for location text "IA court" in my work filters
        Then I see location search results in my work filter
        |name|
        |IA court 0|
        When I select locations search result "IA court 0" in my work filter
        When I click add location button in my work filter
        Then I see location "IA court 0" selected in my work filter
        When I click work location filter Apply button
        Then I validate my work filter services container not displayed


        Examples:   
            | UserType | Roles                                                         |
            # | Caseworker IAC | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | Judge    | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker |



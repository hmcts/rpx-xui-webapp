@ng
Feature: WA Release 2: My work - Work filters

    Background: Mock and browser setup
        Given I init MockApp
        Given I clear all MOCK location
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


        Given I set MOCK caseworkers for service "IA"
            | idamId                               | firstName   | lastName | email                   | roleCategory     |
            | 3db21928-cbbc-4364-bd91-137c7031fe17 | caseworker1 | cw       | caseworker_user1@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be02 | caseworker2 | cw       | caseworker_user2@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be03 | caseworker3 | cw       | caseworker_user3@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be04 | caseworker4 | cw       | caseworker_user4@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be05 | caseworker5 | cw       | caseworker_user5@gov.uk | LEGAL_OPERATIONS |

        Given I set MOCK caseworkers for service "SSCS"
            | idamId                               | firstName   | lastName | email                   | roleCategory     |
            | 3db21928-cbbc-4364-bd91-137c7031fe17 | caseworker1 | cw       | caseworker_user1@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be06 | caseworker6 | cw       | caseworker_user6@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be07 | caseworker7 | cw       | caseworker_user7@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be08 | caseworker8 | cw       | caseworker_user8@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be09 | caseworker9 | cw       | caseworker_user9@gov.uk | LEGAL_OPERATIONS |

        Given I set MOCK caseworkers for service "CIVIL"
            | idamId                               | firstName    | lastName | email                    | roleCategory     |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be10 | caseworker10 | cw       | caseworker_user10@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be11 | caseworker11 | cw       | caseworker_user11@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be12 | caseworker12 | cw       | caseworker_user12@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be13 | caseworker13 | cw       | caseworker_user13@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be14 | caseworker14 | cw       | caseworker_user14@gov.uk | LEGAL_OPERATIONS |


        Given I set MOCK request "/workallocation/task" intercept with reference "workallocationTaskRequest"
        Given I set MOCK request "/workallocation/my-work/cases" intercept with reference "workallocationCasesRequest"

        Given I set MOCK request "/api/locations/getLocations" intercept with reference "workFilterLocationsRequest"

    Scenario Outline:  Work filters show hide button and Apply for "<UserType>"
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<Roles>" with reference "userDetails"
        # Given I set MOCK with user "IAC_CaseOfficer_R2" and roles " caseworker-ia-caseofficer,caseworker-ia-admofficer, task-supervisor,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType | baseLocation |
            | IA | Y | ORGANISATION | 20001 |
            | SSCS | Y | ORGANISATION | 20001 |


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



        When I click work location filter Apply button

        Then I validate my work filter services container not displayed
        When I click work filter button to "Show" filter
        Then I validate my work filter services container displayed

        Examples:
            | UserType       | Roles                                                            |
            | Caseworker IAC | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer |
    # | Judge          | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker    |


    Scenario Outline:  Work filters types for selected sub navigation tabs
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<Roles>" with reference "userDetails"
        # Given I set MOCK with user "IAC_CaseOfficer_R2" and roles " caseworker-ia-caseofficer,caseworker-ia-admofficer, task-supervisor,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation |
            | IA           | Y           | ORGANISATION | 20001        |
            | SSCS         | Y           | ORGANISATION | 20001        |


        Given I start MockApp
        Given I navigate to home page
        # When I click on primary navigation header "My work"
        Then I see work filter button displayed
        Then I validate work filter button text is "Show work filter"
        # Then I validate work location filter batch and hint labels are not displayed
        Then I validate location filter is not displayed

        Then I validate work filter button text is "Show work filter"
        When I click work filter button to "Show" filter
        Then I validate work filter button text is "Hide work filter"
        Then I see work filter of type "Services" is displayed
        Then I see work filter of type "Locations" is displayed
        Then I see work filter of type "Work types" is displayed
        When I click work location filter Apply button
        Then I validate my work filter services container not displayed

        When I navigate to My work sub navigation tab "Available tasks"
        Then I validate work filter button text is "Show work filter"
        When I click work filter button to "Show" filter
        Then I validate work filter button text is "Hide work filter"
        Then I see work filter of type "Services" is displayed
        Then I see work filter of type "Locations" is displayed
        Then I see work filter of type "Work types" is displayed
        When I click work location filter Apply button
        Then I validate my work filter services container not displayed

        When I navigate to My work sub navigation tab "My cases"
        Then I validate work filter button text is "Show work filter"
        When I click work filter button to "Show" filter
        Then I validate work filter button text is "Hide work filter"
        Then I see work filter of type "Services" is displayed
        Then I see work filter of type "Locations" is displayed
        Then I see work filter of type "Work types" is not displayed
        When I click work location filter Apply button
        Then I validate my work filter services container not displayed

        When I navigate to My work sub navigation tab "My tasks"
        Then I validate work filter button text is "Show work filter"
        When I click work filter button to "Show" filter
        Then I validate work filter button text is "Hide work filter"
        Then I see work filter of type "Services" is displayed
        Then I see work filter of type "Locations" is displayed
        Then I see work filter of type "Work types" is displayed
        When I click work location filter Apply button
        Then I validate my work filter services container not displayed

        Examples:
            | UserType       | Roles                                                            |
            | Caseworker IAC | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer |
    # | Judge          | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker    |

    Scenario Outline:  Work filters mandatory field validations and filter selection
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<Roles>" with reference "userDetails"
        # Given I set MOCK with user "IAC_CaseOfficer_R2" and roles " caseworker-ia-caseofficer,caseworker-ia-admofficer, task-supervisor,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation |
            | IA           | Y           | ORGANISATION | 20001        |
            | SSCS         | Y           | ORGANISATION | 20001        |




        Given I set MOCK caseworkers for service "IA", base location
            | email                   | locationId |
            | caseworker_user1@gov.uk | 20001      |

        Given I set MOCK caseworkers for service "SSCS", base location
            | email                   | locationId |
            | caseworker_user1@gov.uk | 20001      |

        Given I start MockApp
        Given I navigate to home page
        # When I click on primary navigation header "My work"

        Then I see work filter button displayed
        Then I validate work filter button text is "Show work filter"
        # Then I validate work location filter batch and hint labels are not displayed
        Then I validate location filter is not displayed
        When I click work filter button to "Show" filter
        When I unselect service "Social security and child support" in my work filter
        When I unselect service "Immigration and Asylum" in my work filter
        When I click work location filter Apply button
        Then I see error message "Select a service" for service work filter in my work page
        Then I see error message of type "message" displayed with message "Select a service"

        When I select service "Immigration and Asylum" in my work filter

        When I remove slected location "IA Court" from my work filters

        When I click work location filter Apply button
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
            | UserType       | Roles                                                            |
            | Caseworker IAC | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer |
    # | Judge    | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker |

    Scenario Outline: Work filters locations based on organisation role and base location

        Given I set MOCK caseworkers for service "IA"
            | idamId                               | firstName   | lastName | email                   | roleCategory     |
            | 3db21928-cbbc-4364-bd91-137c7031fe17 | caseworker1 | cw       | caseworker_user1@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be02 | caseworker2 | cw       | caseworker_user2@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be03 | caseworker3 | cw       | caseworker_user3@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be04 | caseworker4 | cw       | caseworker_user4@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be05 | caseworker5 | cw       | caseworker_user5@gov.uk | LEGAL_OPERATIONS |

        Given I set MOCK caseworkers for service "SSCS"
            | idamId                               | firstName   | lastName | email                   | roleCategory     |
            | 3db21928-cbbc-4364-bd91-137c7031fe17 | caseworker1 | cw       | caseworker_user1@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be06 | caseworker6 | cw       | caseworker_user6@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be07 | caseworker7 | cw       | caseworker_user7@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be08 | caseworker8 | cw       | caseworker_user8@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be09 | caseworker9 | cw       | caseworker_user9@gov.uk | LEGAL_OPERATIONS |

        Given I set MOCK caseworkers for service "CIVIL"
            | idamId                               | firstName    | lastName | email                    | roleCategory     |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be10 | caseworker10 | cw       | caseworker_user10@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be11 | caseworker11 | cw       | caseworker_user11@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be12 | caseworker12 | cw       | caseworker_user12@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be13 | caseworker13 | cw       | caseworker_user13@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be14 | caseworker14 | cw       | caseworker_user14@gov.uk | LEGAL_OPERATIONS |

        Given I set MOCK caseworkers for service "IA", base location
            | email                   | locationId        |
            | caseworker_user1@gov.uk | <IA_baseLocation> |

        Given I set MOCK caseworkers for service "SSCS", base location
            | email                   | locationId          |
            | caseworker_user1@gov.uk | <SSCS_baseLocation> |


        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles " caseworker-ia-caseofficer,caseworker-ia-admofficer, task-supervisor,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType        |
            | IA           | Y           | <IA_roleType>   |
            | SSCS         | Y           | <SSCS_roleType> |


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

        When I remove all selected locations from my work filters

        Given I reset reference "workFilterLocationsRequest" value to null

        When I search for location text "Court" in my work filters

        When I wait for reference "workFilterLocationsRequest" value not null


        Examples:
            | IA_roleType  | IA_baseLocation | SSCS_roleType | SSCS_baseLocation | resultCount | searchableServices |
            | ORGANISATION |                 | ORGANISATION  |                   | 18          | IA,SSCS            |
            | CASE         | 20001           | ORGANISATION  | 20010             | 9           | SSCS               |
            | ORGANISATION | 20001           | CASE          | 20010             | 9           | IA                 |


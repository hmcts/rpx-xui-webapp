@ng 
Feature: WA Release 2: All work > cases -  pagination sorting

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK request "/workallocation/all-work/cases" intercept with reference "caseSearchRequest"


    Scenario Outline: pagnation and sorting for user type "<UserType>" with roles "<Roles>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK workallocation cases with permissions for view "AllWorkCases"
            | Roles          | Count |
            | case-allocator | 40 |
            | case-allocator | 100 |

        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"

        Then I validate work allocation cases count in page 25

        Then I validate work allocation cases table pagination controls, is displayed state is "true"
        Then I validate WA case list page results text displayed as "Showing 1 to 25 of 140 results"


        Given I reset reference "caseSearchRequest" value to null
        When I click WA case list pagination link "Next" and wait for req reference "caseSearchRequest" not null
        Then I validate task search request with reference "caseSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 2          | 25       |
        Then I validate WA case list page results text displayed as "Showing 26 to 50 of 140 results"
        Given I reset reference "caseSearchRequest" value to null
        When I click WA case list pagination link "Previous" and wait for req reference "caseSearchRequest" not null
        Then I validate task search request with reference "caseSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 1          | 25       |
        Then I validate WA case list page results text displayed as "Showing 1 to 25 of 140 results"
        Given I reset reference "caseSearchRequest" value to null
        When I click WA case list pagination link "3" and wait for req reference "caseSearchRequest" not null
        Then I validate task search request with reference "caseSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 3          | 25       |
        Then I validate WA case list page results text displayed as "Showing 51 to 75 of 140 results"

        Then I validate work allocation table "cases" columns sortability
            | Columnheader | isSortable |
            | Person       | No         |
            | Case name    | No        |
            | Case category | No |

        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |

    Scenario Outline: pagnation control display with only 1 page of items
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK workallocation cases with permissions for view "AllWorkCases"
            | Roles          | Count |
            | case-allocator | 20 |

        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"

        Then I validate task table pagination controls, is displayed state is "false"
        Then I validate work allocation cases count in page 20

        Then I validate work allocation cases table pagination controls, is displayed state is "false"
        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |

    # For EUI-4366
    @ignore
    Scenario Outline: pagnation control display 0 items
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK workallocation cases with permissions for view "AllWorkCases"
            | Roles          | Count |
            | case-allocator | 0 |

        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"

        Then I validate work allocation cases table pagination controls, is displayed state is "false"

        Then I validate WA cases table footer displayed status is "true"
        Then I validate WA cases table footer message is "Change your selection to view cases"

        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |




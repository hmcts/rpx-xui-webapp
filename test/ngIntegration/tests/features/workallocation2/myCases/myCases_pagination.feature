@ng
Feature: WA Release 2: My work -  My cases - pagination sorting

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK request "/workallocation2/caseWithPagination" intercept with reference "caseSearchRequest"


    Scenario Outline: pagnation and sorting for user type "<UserType>" with roles "<Roles>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK workallocation cases with permissions for view "My cases"
            | Roles          | Count |
            | case-allocator | 40    |
            |                | 100    |

        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "My cases"

        Then I validate work allocation cases count in page 25

        Then I validate work allocation cases table pagination controls, is displayed state is "true"
        Then I validate WA case list page results text displayed as "Displaying 1 - 25 out of 140 cases"


        Given I reset reference "caseSearchRequest" value to null
        When I click WA case list pagination link "Next" and wait for req reference "caseSearchRequest" not null
        Then I validate task search request with reference "caseSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 2          | 25       |
        Then I validate WA case list page results text displayed as "Displaying 26 - 50 out of 140 cases"
        Given I reset reference "caseSearchRequest" value to null
        When I click WA case list pagination link "Previous" and wait for req reference "caseSearchRequest" not null
        Then I validate task search request with reference "caseSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 1          | 25       |
        Then I validate WA case list page results text displayed as "Displaying 1 - 25 out of 140 cases"
        Given I reset reference "caseSearchRequest" value to null
        When I click WA case list pagination link "3" and wait for req reference "caseSearchRequest" not null
        Then I validate task search request with reference "caseSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 3          | 25       |
        Then I validate WA case list page results text displayed as "Displaying 51 - 75 out of 140 cases"

       
        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |





    Scenario Outline: pagnation control display with only 1 page of items
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK workallocation cases with permissions for view "My cases"
            | Roles          | Count |
            | case-allocator | 20    |

        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "My cases"

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
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK workallocation cases with permissions for view "My cases"
            | Roles          | Count |
            | case-allocator | 0    |

        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "My cases"

        Then I validate work allocation cases table pagination controls, is displayed state is "false"

        Then I validate WA cases table footer displayed status is "true"
        Then I validate WA cases table footer message is "You have no assigned cases"

        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |




@ng @wa2 @wa @test
Feature: WA Release 2: My cases - pagination

    Background: Mock and browser setup
        Given I init MockApp


    Scenario Outline: My Cases pagnation for user type "<UserType>" with roles "<Roles>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK workallocation cases with permissions for view "My cases" and assigned state ""
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK request "/workallocation2/caseWithPagination/" intercept with reference "caseSearchRequest"
        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "My cases"

        Then I validate work allocation cases count in page 25
        Then I validate task table pagination controls, is displayed state is "true"
        Then I validate work allocation cases pagination results text displayed as "Displaying 1 - 25 out of 140 cases"
        Given I reset reference "caseSearchRequest" value to null
        When I click work allocation cases pagination link "Next" and wait for req reference "caseSearchRequest" not null
        Then I validate work allocation cases search request with reference "caseSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 2          | 25       |
        Then I validate work allocation cases pagination results text displayed as "Displaying 26 - 50 out of 140 cases"
        Given I reset reference "caseSearchRequest" value to null
        When I click work allocation cases pagination link "Previous" and wait for req reference "caseSearchRequest" not null
        Then I validate work allocation cases search request with reference "caseSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 1          | 25       |
        Then I validate work allocation cases pagination results text displayed as "Displaying 1 - 25 out of 140 cases"
        Given I reset reference "caseSearchRequest" value to null
        When I click work allocation cases pagination link "3" and wait for req reference "caseSearchRequest" not null
        Then I validate work allocation cases search request with reference "caseSearchRequest" has pagination parameters
            | PageNumber | PageSize |
            | 3          | 25       |
        Then I validate work allocation cases pagination results text displayed as "Displaying 51 - 75 out of 140 cases"


        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
    # | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |


    Scenario Outline: My cases pagnation with 1 page items for user type "<UserType>" with roles "<Roles>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK workallocation cases with permissions for view "My cases" and assigned state ""
            | Permissions | Count |
            | Manage      | 10     |
            | Read        | 10     |
        Given I set MOCK request "/workallocation2/caseWithPagination/" intercept with reference "caseSearchRequest"
        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "My cases"

        Then I validate work allocation cases count in page 20
        Then I validate task table pagination controls, is displayed state is "false"
       

        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |




    Scenario Outline: My cases pagnation with 0 items for user type "<UserType>" with roles "<Roles>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK workallocation cases with permissions for view "My cases" and assigned state ""
            | Permissions | Count |
            | Manage      | 0   |
            | Read        | 0    |
        Given I set MOCK request "/workallocation2/caseWithPagination/" intercept with reference "caseSearchRequest"
        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "My cases"

        Then I validate work allocation cases count in page 0
        Then I validate task table pagination controls, is displayed state is "false"
        Then I validate WA cases table footer displayed status is "true"
        Then I validate WA cases table footer message is "that match your selection"

        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |



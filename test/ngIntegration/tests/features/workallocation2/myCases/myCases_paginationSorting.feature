@ng @wa2 @wa
Feature: WA Release 2: My cases - pagination

    Background: Mock and browser setup
        Given I init MockApp

 
    Scenario Outline: My Tasks pagnation and sorting for user type "<UserType>" with roles "<Roles>"
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

 
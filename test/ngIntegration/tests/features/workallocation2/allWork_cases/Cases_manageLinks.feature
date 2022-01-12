@ng @wa2 @wa
Feature: WA Release 2: All work > cases - Manage links

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK workallocation cases with permissions for view "AllWorkCases"
            | Roles          | Count |
            | case-allocator | 10    |
            | case-allocator | 90    |


    Scenario Outline:  My cases, colums and column links for "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"


        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"

        Then I validate work allocation cases count in page 25

        Then I validate manage link actions for cases
            | index | actions           |
            | 1     | Reallocate,Remove |
            | 12    | Reallocate,Remove |

        Examples:
            | UserIdentifier  | UserType | Roles                                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer,,task-supervisor |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor |


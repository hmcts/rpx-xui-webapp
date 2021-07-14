@ng  @wa2 @wa 
Feature: WA Release 2: My cases

    Background: Mock and browser setup
        Given I init MockApp

    Scenario Outline:  My cases, colums and column links for "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I start MockApp
        Given I navigate to home page
        When I navigate to My work sub navigation tab "My cases"

        Then I validate work allocation cases table columns displayed
            | ColumnHeader  |
            | Case name     |
            | Jurisdiction  |
            | Case category |
            | Case role     |
            | Start         |
            | End           |

        Then I validate work allocation table columns are links
            | ColumnHeader |
            | Case name    |

        When I click work allocation case column link "Case name" at row 1
        Then I see case details page
        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |

    Scenario Outline: My cases pagnation control display with only 1 page of items
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK workallocation cases with permissions for view "My Cases" and assigned state ""
            | Permissions | Count |
            | Manage      | 10    |
            | Read        | 10    |
        Given I set MOCK request "/workallocation2/caseWithPagination/" intercept with reference "taskSearchRequest"
        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "My cases"

        Then I validate work allocation cases count in page 20
        Then I validate work allocation cases table pagination controls, is displayed state is "false"

        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            # | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |



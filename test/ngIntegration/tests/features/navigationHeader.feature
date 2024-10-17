@ng @ignore
Feature: Navigation header tabs
    https://tools.hmcts.net/confluence/display/EUI/Global+Search

    Scenario Outline: Primanry nav headers for user "<roleType>" "<useridentifier>" and roles "<rolesIdentifiers>"
        Then I Log to report launch darkly feature toggle values
            | name                  |
            | mc-menu-items         |
            | mc-menu-theme         |
            | MC_Notice_of_Change   |
            | feature-global-search |
            | feature-refunds       |
        Given I set MOCK with user identifer "<useridentifier>" role type "<roleType>" and role identifiers "<rolesIdentifiers>"
        Given I init MockApp
        Given I start MockApp
        Given I navigate to home page
        Then I log LD feature toggle values
            | name          |
            | mc-menu-items |
            | mc-menu-theme |
        Then I validate header displayed for user type "<roleType>"
        Then I see primary navigation tabs "<mainHeaders>" in main header

        Then I do not see primary navigation tabs does not exist excluding "<mainHeaders>"
            | Tabs             |
            | Case list        |
            | Create case      |
            | My work          |
            | All work         |
            | Task list        |
            | Task manager     |
            | Search           |
            | Refunds          |
            | Notice of change |

        Then I see primary navigation tabs "<rightColumnHeaders>" in right side header column
        Then I validate 16-digit Case reference search box isDisplayed? is "<16-digitCaseRef>"

        Examples:
            | roleType   | useridentifier    | rolesIdentifiers                            | mainHeaders                                                         | rightColumnHeaders | 16-digitCaseRef |
            | caseworker | PROD_LIKE         | NON-WA                                      | Case list, Create case                                              | Find case          | yes             |
            | caseworker | WA2_GLOBAL-SEARCH | WA2,GLOBAL-SEARCH                           | Case list,My work , Create case, Search                             |                    | yes             |
            | caseworker | WA2_GLOBAL-SEARCH | WA2-SUPERVISOR,GLOBAL-SEARCH                | Case list,My work, All work , Create case, Search                   |                    | yes             |
            | caseworker | WA2_GLOBAL-SEARCH | WA2-SUPERVISOR,NON-WA,GLOBAL-SEARCH         | Case list,My work, All work ,Case list, Create case, Search         | Find case          | yes             |
            | caseworker | PROD_LIKE         | NON-WA,REFUNDS                              | Case list,Create case,Refunds                                       | Find case          | yes             |
            | caseworker | WA2_GLOBAL-SEARCH | WA2-SUPERVISOR,GLOBAL-SEARCH,REFUNDS        | Case list,My work, All work , Create case, Search, Refunds          |                    | yes             |
            | caseworker | WA2_GLOBAL-SEARCH | WA2-SUPERVISOR,NON-WA,GLOBAL-SEARCH,REFUNDS | Case list,My work, All work ,Case list, Create case, Search,Refunds | Find case          | yes             |
            | judicial   | PROD_LIKE         | NON-WA                                      | Case list                                                           | Find case          | yes             |
            | judicial   | WA2_GLOBAL-SEARCH | WA2-SUPERVISOR,GLOBAL-SEARCH                | Case list,My work, All work, Search                                 |                    | yes             |
            | judicial   | WA2_GLOBAL-SEARCH | WA2-SUPERVISOR,NON-WA,GLOBAL-SEARCH         | My work, All work,Case list, Search                                 | Find case          | yes             |
            | solicitor  | PROD_LIKE         | NON-NOC                                     | Case list, Create case                                              | Find case          | no              |
            | solicitor  | PROD_LIKE         | NOC                                         | Case list, Create case,Notice of change                             | Find case          | no              |


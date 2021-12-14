@ng @test
Feature: Navigation header tabs

    Scenario Outline: Primanry nav headers for user "<roleType>" "<useridentifier>" and roles "<rolesIdentifiers>"
        Given I set MOCK with user identifer "<useridentifier>" role type "<roleType>" and role identifiers "<rolesIdentifiers>"

        Given I start MockApp
        Given I navigate to home page
        Then I validate header displayed for user type "<roleType>"
        Then I see primary navigation tabs "<mainHeaders>" in main header
        Then I see primary navigation tabs "<rightColumnHeaders>" in right side header column
        Then I validate 16-digit Case reference search box isDisplayed? is "<16-digitCaseRef>"

        Examples:
            | roleType   | useridentifier    | rolesIdentifiers                 | mainHeaders                                               | rightColumnHeaders | 16-digitCaseRef |
            | caseworker | PROD_LIKE         | NON-WA                           | Case list, Create case                                    | Find case          | yes             |
            | caseworker | WA2_GLOBAL-SEARCH | WA2,GLOBAL-SEARCH                | My work, All work , Create case, Search                   |                    | yes             |
            | caseworker | WA2_GLOBAL-SEARCH | WA2,NON-WA,GLOBAL-SEARCH         | My work, All work ,Case list, Create case, Search         | Find case          | yes             |
            | caseworker | PROD_LIKE         | NON-WA,REFUNDS                   | Case list,Create case,Refunds                             | Find case          | yes             |
            | caseworker | WA2_GLOBAL-SEARCH | WA2,GLOBAL-SEARCH,REFUNDS        | My work, All work , Create case, Search, Refunds          |                    | yes             |
            | caseworker | WA2_GLOBAL-SEARCH | WA2,NON-WA,GLOBAL-SEARCH,REFUNDS | My work, All work ,Case list, Create case, Search,Refunds | Find case          | yes             |
            | judicial   | PROD_LIKE         | NON-WA                           | Case list                                                 | Find case          | yes             |
            | judicial   | WA2_GLOBAL-SEARCH | WA2,GLOBAL-SEARCH                | My work, All work, Search                                 |                    | yes             |
            | judicial   | WA2_GLOBAL-SEARCH | WA2,NON-WA,GLOBAL-SEARCH         | My work, All work,Case list, Search                       | Find case          | yes             |
            | solicitor  | PROD_LIKE         | NON-NOC                          | Case list, Create case                                    | Find case          | no              |
            | solicitor  | PROD_LIKE         | NOC                              | Case list, Create case,Notice of change                   | Find case          | no              |


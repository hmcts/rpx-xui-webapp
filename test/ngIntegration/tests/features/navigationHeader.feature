@ng 
Feature: Navigation header tabs

    Scenario Outline: Primanry nav headers for user "<useridentifier>" and roles "<roles>"
        Given I set MOCK with user "<useridentifier>" and roles "<roles>"


        Given I start MockApp
        Given I navigate to home page
        Then I see primary navigation tabs "<mainHeaders>" in main header
        Then I see primary navigation tabs "<rightColumnHeaders>" in right side header column

        Examples:
            | useridentifier     | roles                                                            | mainHeaders                                    | rightColumnHeaders  |
            | IAC_CaseOfficer_R1 | caseworker-ia-caseofficer,caseworker-ia-admofficer               | Task list, Task manager,Case list, Create case | Find case           |
            | IAC_CaseOfficer_R2 | caseworker-ia-caseofficer,caseworker-ia-admofficer               | My work, All work ,Case list, Create case      | Find case           |
            | IAC_Judge_WA_R1    | caseworker-ia-iacjudge,caseworker-ia,caseworker                  | Case list                                      | Find case           |
            | IAC_Judge_WA_R2    | caseworker-ia-iacjudge,caseworker-ia,caseworker                  | My work, All work                              | Case list,Find case |
            | SOLICITOR          | caseworker-divorce-solicitor,caseworker-divorce,pui-case-manager | Case list, Create case                         | Find case           |

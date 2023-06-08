@ng 
Feature: WA Release 2: Case details - "Tasks", "Roles and access" tabs visibility

    Scenario Outline: WA tab "<TaskTabLabel>" is displayed "<TaskTabLabelisDisplayed>" in case details for user "<UserType>" "<UserIdentifier>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "<TaskTabLabel>" is displayed is "<TaskTabLabelisDisplayed>"
        Then I see case details tab label "<RolesAndAccessTabLabel>" is displayed is "<RolesAndAccessTabLabelisDisplayed>"

        Examples:
            | UserIdentifier     | UserType   | Roles                                                            | TaskTabLabel | TaskTabLabelisDisplayed | RolesAndAccessTabLabel | RolesAndAccessTabLabelisDisplayed |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer | Tasks        | true                    | Roles and access       | true                              |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker    | Tasks        | true                    | Roles and access       | true                              |
            | SOLICITOR          | Solicitor  | caseworker-divorce,caseworker-divorce-solicitor,pui-case-manager                 | Tasks        | false                   | Roles and access       | false                             |


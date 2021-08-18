@ng
Feature: WA Release 2: Case details - "Tasks", "Roles and access" tabs visibility

    Scenario Outline: WA tab "<TabLabel>"" is displayed "<isDisplayed>"" in case details for user "<UserType>" "<UserIdentifier>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "<TaskTabLabel>" is displayed is "<TaskTabLabelisDisplayed>"
        Then I see case details tab label "<RolesAnsAccessTabLabel>" is displayed is "<isDisplayed>"

        Examples:
            | UserIdentifier     | UserType   | Roles                                              | TaskTabLabel | TaskTabLabelisDisplayed | RolesAnsAccessTabLabel | RolesAnsAccessTabLabelisDisplayed |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | Tasks        | true                    | Roles and access       | true                              |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    | Tasks        | true                    | Roles and access       | true                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-test                                 | Tasks        | false                   | Roles and access       | false                             |


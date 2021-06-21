@fullfunctional
Feature: WA Release 2: : Work allocations My work, All work

    Scenario Outline: View tasks, E2E journey of Caseworker-ia-officer user
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with test user identified as "<useridentifier>"
        Then I should be redirected to EUI dashboard page

        Then I see primary navigation tabs "<mainHeaders>" in main header
        Then I see primary navigation tabs "<rightColumnHeaders>" in right side header column

        Then I validate I am on My work page
        Then I validate My work sub navigations displayed
            | Tab             |
            | My tasks        |
            | Available tasks |
        Then I see My tasks page displayed
        Then I see Task list table

        # Then I see Task list table displaying some tasks



        Examples:
            | useridentifier     | roles                                              | mainHeaders                               | rightColumnHeaders  |
            | IAC_CaseOfficer_R2 | caseworker-ia-caseofficer,caseworker-ia-admofficer | My work, All work ,Case list, Create case | Find case           |
            | IAC_Judge_WA_R2    | caseworker-ia-iacjudge,caseworker-ia,caseworker    | My work, All work                         | Case list,Find case |



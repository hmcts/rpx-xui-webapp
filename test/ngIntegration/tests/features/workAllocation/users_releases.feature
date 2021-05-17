
Feature: Mutiple users, feature variation across releases

    Valiidate features for judge and caseworker users across releases


    Background: Mock and browser setup
        Given I init MockApp


    Scenario Outline:  Judge user Primary navigation tabs <release>
        Given I set MOCK with "<release>" release user and roles
            | ROLE                   |
            | caseworker-ia-iacjudge |
            | caseworker-ia          |
            | caseworker             |
        Given I start MockApp
        Given I navigate to home page
        Then I validate primary navigation tabs for user "judge" in release "<release>"
        Examples:
            | release      |
            | wa_release_1 |
            | wa_release_2 |

    Scenario Outline:  Case worker user Primary navigation tabs <release>

        Given I set MOCK with "<release>" release user and roles
            | ROLE                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I start MockApp
        Given I navigate to home page
        Then I validate primary navigation tabs for user "caseworker" in release "<release>"
        Examples:
            | release      |
            | wa_release_1 |
            | wa_release_2 |


    Scenario:  Judge user Task list fields displayed in release wa_release_2
        Given I set MOCK with "wa_release_2" release user and roles
            | ROLE                   |
            | caseworker-ia-iacjudge |
            | caseworker-ia          |
            | caseworker             |
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "My work"
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I validate task list column displayed for user "judge" in release "wa_release_2"

    Scenario:  Judge user Available tasks fields displayed in release wa_release_2
        Given I set MOCK with "wa_release_2" release user and roles
            | ROLE                   |
            | caseworker-ia-iacjudge |
            | caseworker-ia          |
            | caseworker             |
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "My work"
        Then I see Task list sub navigation tabs
        When I click sub navigation tab Available tasks

        Then I see Available tasks page displayed
        Then I validate available task list column displayed for user "judge" in release "wa_release_2"

   
    Scenario Outline:  caseworker user Task list fields displayed in release <release>
        Given I set MOCK with "<release>" release user and roles
            | ROLE                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab for release "<release>"
            | wa_release_1 | wa_release_2 |
            | Task list    | My work      |
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I validate task list column displayed for user "caseworker" in release "<release>"
        Then I validate task list columns for release "<release>" are links to case details
            | wa_release_1   | wa_release_2 |
            | Case reference | Case name    |
            |                | Task         |
        Examples:
            | release      |
            | wa_release_2 |
            | wa_release_1 |


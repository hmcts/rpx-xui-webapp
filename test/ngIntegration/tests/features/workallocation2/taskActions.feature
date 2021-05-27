@ng @test
Feature: Release 2 Task actions

    Background: Mock and browser setup
        Given I init MockApp


    Scenario Outline:  Available Tasks actions for "<UserType>"
        Given I set MOCK with "wa_release_2" release user and roles "<Roles>"
           
        Given I set MOCK tasks with permissions for view "Available Tasks" and assigned state ""
            | Permissions |
            | Manage      |
            | Read        |
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header "My work"
        When I click sub navigation tab Available tasks
        Then I validate task actions in manage link for task at row 1
            | Action                      |
            | Assign to me                |
            | Assign to me and go to case |
        Then I validate task actions in manage link for task at row 2
            | Action |

        Examples:
            | UserType       | Roles                                              |
            | Caseworker IAC | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | Judge          | caseworker-ia-iacjudge,caseworker-ia,caseworker    |


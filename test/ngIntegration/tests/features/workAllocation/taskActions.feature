@ng 
Feature: Task actions

    Background: Mock and browser setup
        Given I init MockApp

    Scenario Outline:  My Tasks actions 
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK My tasks count 5
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I see Task list table
        When I click manage link for first task
        When I click task action "<Action>"
        Then I see task page for action type "<ActionType>"
        Then I validate action type "<ActionType>" for task action "<Action>" page content
    Examples:
        | Action | ActionType | 
        | Reassign task  | ASSIGNMENT  | 
        | Unassign task | ACTION |

    Scenario Outline:  Task manager Tasks actions
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task manager

        Then I see Task manager page displayed
        Then I see Task list table
        When I click manage link for first task
        When I click task action "<Action>"
        Then I see task page for action type "<ActionType>"
        Then I validate action type "<ActionType>" for task action "<Action>" page content
        Examples:
            | Action        | ActionType |
            | Reassign task | ASSIGNMENT |
            | Unassign task | ACTION     |
            | Mark as done | ACTION |
            | Cancel task | ACTION |


    Scenario: My Tasks reassign page errors
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK My tasks count 5
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I validate My task reassign page errors


    Scenario: My Tasks reassign submit errors
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK My tasks count 5
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        Then I see My tasks page displayed
        Then I validate My task reassign submit errors



    Scenario: Available task action page errors
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK My tasks count 5
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task list
        Then I see Task list sub navigation tabs
        When I click sub navigation tab Available tasks

        Then I see Available tasks page displayed
        Then I validate available task action page errors




    Scenario: Task manager task action page errors
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I start MockApp
        Given I navigate to home page
        When I click on header tab Task manager

        Then I see Task manager page displayed
        Then I validate Task manager task action page errors

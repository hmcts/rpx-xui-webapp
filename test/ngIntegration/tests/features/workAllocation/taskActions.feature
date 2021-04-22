@ng 
Feature: Task actions

    Background: Mock and browser setup
        Given I init MockApp

    @test
    Scenario:  My Tasks actions submit
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I start MockApp
        Given I navigate to home page
        Then I validate Task actions from page "My Tasks"
            | ManageAction  | ActionType | SubmitCancel | SuccessMessage                                        |
            | Reassign task | ASSIGNMENT | Submit       | You've reassigned a task to somebody else             |
            | Unassign task | ACTION     | Submit       | You've unassigned a task. It's now in Available tasks |
            | Reassign task | ASSIGNMENT | Cancel       |                                                       |
            | Unassign task | ACTION     | Cancel       |                                                       |
            | Go to case    | ONCECLICK  |              |                                                       |


    @test
    Scenario:  Available Tasks actions submit
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I start MockApp
        Given I navigate to home page
        Then I validate Task actions from page "Available tasks"
            | ManageAction                | ActionType | SubmitCancel | SuccessMessage                                        |
            | Assign to me                | ONCECLICK  |              | You've unassigned a task. It's now in Available tasks |
            | Assign to me and go to case | ONCECLICK  |              |                                                       |

    @test
    Scenario:   Task manager actions submit
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I start MockApp
        Given I navigate to home page
        Then I validate Task actions from page "Task manager"
            | ManageAction                | ActionType | SubmitCancel | SuccessMessage                                        |
            | Reassign task | ASSIGNMENT | Submit | You've reassigned a task to somebody else |
            | Unassign task | ACTION | Submit | You've unassigned a task. |
            | Mark as done  | ACTION     | Submit | You've marked a task as done              |
            | Cancel task   | ACTION     | Submit | You've cancelled a task.                  |
            | Reassign task | ASSIGNMENT | Cancel |                                           |
            | Unassign task | ACTION | Cancel |  |
            | Mark as done  | ACTION     | Cancel |                                           |
            | Cancel task   | ACTION     | Cancel |                                           |



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

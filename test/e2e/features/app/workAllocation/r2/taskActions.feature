@__fullfunctional
Feature: WA Release 2: : Task Assign/Reassign

    Scenario: Reassign task from All work

        When I navigate to Expert UI Url
        Given I am logged into Expert UI with test user identified as "IAC_CaseOfficer_R2"
        Then I validate I am on My work page
        When I click on primary navigation header tab "All work", I see selected tab page displayed

        Then I validate task list columns are links
            | ColumnHeader |
            | Case name    |
            | Task         |

        Given I capture task details at row 1 with reference "taskDetails"

        When I open Manage link for task at row 1
        Then I see action link "Reassign" is present for task with Manage link open
        When I click action link "Reassign" on task with Manage link open
        Then In workflow "Reassign task", I see select role type page displayed with header "Choose a role type"
        Then In workflow "Reassign task", I see select role type page displayed with caption "Reassign task"
        Then In workflow "Reassign task", I see select role type radio options "Legal Ops,Judicial"
        Then In workflow "Reassign task", I select role type radio options "Legal Ops"
        When In workflow "Reassign task", I click continue


        Then In workflow "Reassign task", I see find person page displayed with caption "Reassign task"

        Given I have a caseworker details other than logged in user with reference "ReassignToCaseworker" for service "IA"

        When In workflow "Reassign task", I enter search term with caseworker reference "ReassignToCaseworker" in find person input text

        When In workflow "Reassign task", I select find person result with caseworker reference "ReassignToCaseworker"
        Then In workflow "Reassign task", I see find person is selected with caseworker reference "ReassignToCaseworker"

        When In workflow "Reassign task", I click continue


        Then I see task check your changes page for action "Reassign task" displayed
 
        When I click submit button "Reassign" in task check your changes page
        Then I see navigation header tab page "All work"
        Then I validate notification message banner is displayed in "All work" page
        Then I validate notification banner messages displayed in "All work" page
            | message         |
            | Task assigned |

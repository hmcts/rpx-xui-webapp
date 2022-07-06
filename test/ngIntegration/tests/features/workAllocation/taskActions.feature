@_ng 
Feature: WA Release 1: Task actions

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK with "wa_release_1" release user and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer"

    
    Scenario:  My Tasks actions submit
        Given I start MockApp
        Given I navigate to home page
        Then I validate Task actions from page "My Tasks"
            | ManageAction  | ActionType | SubmitCancel | SuccessMessage                                        |
            | Reassign task | ASSIGNMENT | Submit       | You've reassigned a task to somebody else             |
            | Unassign task | ACTION     | Submit       | You've unassigned a task. It's now in Available tasks |
            | Reassign task | ASSIGNMENT | Cancel       |                                                       |
            | Unassign task | ACTION     | Cancel       |                                                       |
            | Go to case    | ONCECLICK  |              |                                                       |


    
    Scenario:  WITH_SESSION : Available Tasks actions submit
         Given I start MockApp
        Given I navigate to home page
        Then I validate Task actions from page "Available tasks"
            | ManageAction                | ActionType | SubmitCancel | SuccessMessage                                        |
            | Assign to me                | ONCECLICK  |              | You've unassigned a task. It's now in Available tasks |
            | Assign to me and go to case | ONCECLICK  |              |                                                       |

   
    Scenario:  WITH_SESSION :  Task manager actions submit
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



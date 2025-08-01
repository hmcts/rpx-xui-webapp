@ng  @wa2 @task_action
Feature: WA Release 2: Task actions

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK locations with names in service "IA"
            | id    | locationName           |
            | 20001 | IA Court Aldgate Tower |
            | 20002 | IA Court Birmingham    |
            | 2003  | IA Court Bradford      |
            | 20004 | IA Court Glasgow       |
            | 20005 | IA Court Hatton Cross  |
            | 20006 | IA Court Newcastle     |
            | 20007 | IA Court Newport       |
            | 20008 | IA Court North Shields |
            | 20009 | IA Court Center 1  |

    Scenario Outline:  Available Tasks actions for "<UserType>"
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK person with user "IAC_CaseOfficer_R2" and roles "caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator"
            | locationId | locationName           |
            | 20001      | IA Court Aldgate Tower |
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | baseLocation | roleType     |
            | IA | 20001 | ORGANISATION |
            | SSCS         |            | ORGANISATION |
        Given I set MOCK tasks with permissions for view "Available Tasks" and assigned state ""
            | Permissions |
            | Manage,Own  |
            | Read        |
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header "My work"
        When I click sub navigation tab Available tasks
        Then I validate task actions in manage link for task at row 1
            | Action                      |
            | Assign to me                |
            | Assign to me and go to task |
        Then I validate task actions in manage link for task at row 2
            | Action |
            | Assign to me                |
            | Assign to me and go to task |
        Examples:
            | UserType       | Roles                                              |
            | Caseworker IAC | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | Judge          | caseworker-ia-iacjudge,caseworker-ia,caseworker    |


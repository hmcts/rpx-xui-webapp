@ng
Feature: WA Release 2: Case events and Task completion and states

    Background: Setup
        Given I set MOCK case details with reference "caseDetails"
        Given I set MOCK case details "caseDetails" property "jurisdiction" as "IA"
        Given I set MOCK case details "caseDetails" trigger id "text" trigger name "Test event"
           Given I set MOCK caseworkers for service "IA"
            | idamId                               | firstName   | lastName | email                   | roleCategory     |
            | 3db21928-cbbc-4364-bd91-137c7031fe10 | Test 2      | user     | caseworker_user1@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be81 | Test 3      | user     | caseworker_user2@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be87 | Test 4      | user     | caseworker_user3@gov.uk | LEGAL_OPERATIONS |
            | 3db21928-cbbc-4364-bd91-137c7031fe17 | XUI test    | auto     | caseworker_user6@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be83 | caseworker7 | cw       | caseworker_user7@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be82 | caseworker8 | cw       | caseworker_user8@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be83 | admin1      | a        | admin_user1@gov.uk      | ADMIN            |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be82 | admin2      | a        | admin_user2@gov.uk      | ADMIN            |

        Given I add MOCK judicial user
            | idamId                               | firstName   | lastName | email                   |
            | 38eb0c5e-29c7-453e-b92d-f2029aaed6c3 | Test 5      | judge    | caseworker_user1@gov.uk |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be81 | Test 6      | judge    | caseworker_user2@gov.uk |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be87 | Test 4      | user     | caseworker_user3@gov.uk |
            | 1db21928-cbbc-4364-bd91-137c7031fe17 | XUI test    | auto     | caseworker_user6@gov.uk |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be83 | caseworker7 | cw       | caseworker_user7@gov.uk |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be82 | caseworker8 | cw       | caseworker_user8@gov.uk |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be83 | admin1      | a        | admin_user1@gov.uk      |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be82 | admin2      | a        | admin_user2@gov.uk      |


    Scenario Outline: No task available
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |

        Given I set MOCK task required for event as "true"


        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        When I click tab with label "Tasks" in case details page

        Then I validate case details task tab page is displayed

        When I start case next step "Test event"
        Then I see task event validation error page
            | Summary header  | There is a problem                                                            |
            | Summary message | No task available                                                             |
            | Details header  | No task available                                                             |
            | Details message | You should have an assigned task for this event, but something has gone wrong |
            | Link            | Return to tasks tab                                                           |
        Examples:
            | roles                                                                            |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor |


    Scenario Outline: Task not assigned
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |


        Given I set MOCK task required for event as "true"
        Given I set MOCK tasks required for event
            | assignee | task_state |
            | null     | unassigned |


        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        When I click tab with label "Tasks" in case details page

        Then I validate case details task tab page is displayed

        When I start case next step "Test event"
        Then I see task event validation error page
            | Summary header  | There is a problem                         |
            | Summary message | Task assignment required                   |
            | Details header  | Task assignment required                   |
            | Details message | You must assign it to yourself to continue |
            | Link            | Return to tasks tab                        |
        Examples:
            | roles                                                                            |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor |

    Scenario Outline: Task multiple tasks found unassigned
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |


        Given I set MOCK task required for event as "true"
        Given I set MOCK tasks required for event
            | assignee | task_state |
            | null     | unassigned |
            | null     | unassigned |


        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        When I click tab with label "Tasks" in case details page

        Then I validate case details task tab page is displayed

        When I start case next step "Test event"
        Then I see task event validation error page
            | Summary header  | There is a problem                         |
            | Summary message | Task assignment required                   |
            | Details header  | Task assignment required                   |
            | Details message | You must assign it to yourself to continue |
            | Link            | Return to tasks tab                        |
        Examples:
            | roles                                                                            |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor |

    Scenario Outline: Task multiple tasks found assigned to this user
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |


        Given I set MOCK task required for event as "true"
        Given I set MOCK tasks required for event
            | assignee                             | task_state |
            | 3db21928-cbbc-4364-bd91-137c7031fe17 | assigned   |
            | 3db21928-cbbc-4364-bd91-137c7031fe17 | assigned   |


        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        When I click tab with label "Tasks" in case details page

        Then I validate case details task tab page is displayed

        When I start case next step "Test event"
        Then I see task event validation error page
            | Summary header  | There is a problem                                                                         |
            | Summary message | Multiple tasks exist                                                                       |
            | Details header  | Multiple tasks exist                                                                       |
            | Details message | You're starting work which could complete more than one of the active tasks for this case. |
        Examples:
            | roles                                                                            |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor |

    Scenario Outline: Task one task found assigned to this user
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |


        Given I set MOCK task required for event as "true"
        Given I set MOCK tasks required for event
            | id                                   | assignee                             | task_state |
            | 3db21928-cbbc-task-bd91-137c7031fe17 | 3db21928-cbbc-4364-bd91-137c7031fe17 | assigned   |

        Given I set MOCK task details
            | id           | 3db21928-cbbc-task-bd91-137c7031fe17 |
            | assignee     | 3db21928-cbbc-4364-bd91-137c7031fe17 |
            | task_state   | assigned                             |
            | jurisdiction | IA                                   |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        When I click tab with label "Tasks" in case details page

        Then I validate case details task tab page is displayed

        When I start case next step "Test event"
        When I complete and submit test event "text"
        Then I see case details page
      
         Examples:
            | roles                                                                            |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor |


    Scenario Outline: Task one task found assigned to this user, reassigned someone before submit, continue
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |


        Given I set MOCK task required for event as "true"
        Given I set MOCK tasks required for event
            | id                                   | assignee                             | task_state | jurisdiction |
            | 3db21928-cbbc-task-bd91-137c7031fe17 | 3db21928-cbbc-4364-bd91-137c7031fe17 | assigned   | IA           |

        Given I set MOCK task details
            | id           | 3db21928-cbbc-task-bd91-137c7031fe17 |
            | assignee     | 3db21928-cbbc-4364-bd91-137c7031fe10 |
            | task_state   | assigned                             |
            | jurisdiction | IA                                   |


        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        When I click tab with label "Tasks" in case details page

        Then I validate case details task tab page is displayed

        When I start case next step "Test event"
        When I complete and submit test event "text"
        Then I see task event validation error page
            | Summary header  | There is a problem                           |
            | Summary message | Task reassigned                              |
            | Details header  | Task reassigned                              |
            | Details message | This task has been reassigned to Test 2 user |


        Then I see task event validation error page
            | Summary header  | There is a problem                                                |
            | Details message | Click Continue to reassign the task to you and save your progress |
        Then I see task event validation error page
            | Summary header  | There is a problem                                                                  |
            | Details message | Alternatively, click Cancel to return to the tasks tab without saving your progress |


        When I click continue in task event validation message page
        Then I see case details page
        Examples:
            | roles                                                                            |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor |



    Scenario Outline: Task one task found assigned to this user, reassigned someone before submit, cancel
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |


        Given I set MOCK task required for event as "true"
        Given I set MOCK tasks required for event
            | id                                   | assignee                             | task_state | jurisdiction |
            | 3db21928-cbbc-task-bd91-137c7031fe17 | 3db21928-cbbc-4364-bd91-137c7031fe17 | assigned   | IA           |

        Given I set MOCK task details
            | id           | 3db21928-cbbc-task-bd91-137c7031fe17 |
            | assignee     | 3db21928-cbbc-4364-bd91-137c7031fe10 |
            | task_state   | assigned                             |
            | jurisdiction | IA                                   |


        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        When I click tab with label "Tasks" in case details page

        Then I validate case details task tab page is displayed

        When I start case next step "Test event"
        When I complete and submit test event "text"
        Then I see task event validation error page
            | Summary header  | There is a problem                           |
            | Summary message | Task reassigned                              |
            | Details header  | Task reassigned                              |
            | Details message | This task has been reassigned to Test 2 user |


        Then I see task event validation error page
            | Summary header  | There is a problem                                                |
            | Details message | Click Continue to reassign the task to you and save your progress |
        Then I see task event validation error page
            | Summary header  | There is a problem                                                                  |
            | Details message | Alternatively, click Cancel to return to the tasks tab without saving your progress |


        When I click cancel in task event validation message page
        Then I see case details page
        Examples:
            | roles                                                                            |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor |



    Scenario Outline: Task one task found assigned to this user, unassigned before submit, continue
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |


        Given I set MOCK task required for event as "true"
        Given I set MOCK tasks required for event
            | id                                   | assignee                             | task_state | jurisdiction |
            | 3db21928-cbbc-task-bd91-137c7031fe17 | 3db21928-cbbc-4364-bd91-137c7031fe17 | assigned   | IA           |

        Given I set MOCK task details
            | id           | 3db21928-cbbc-task-bd91-137c7031fe17 |
            | assignee     | null                                 |
            | task_state   | unassigned                           |
            | jurisdiction | IA                                   |


        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        When I click tab with label "Tasks" in case details page

        Then I validate case details task tab page is displayed

        When I start case next step "Test event"
        When I complete and submit test event "text"

        Then I see case details page
        Examples:
            | roles                                                                            |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor |

    Scenario Outline: Task one task found assigned to this user, task state completed before submit, continue
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |

        Given I set MOCK task required for event as "true"
        Given I set MOCK tasks required for event
            | id                                   | assignee                             | task_state | jurisdiction |
            | 3db21928-cbbc-task-bd91-137c7031fe17 | 3db21928-cbbc-4364-bd91-137c7031fe17 | assigned   | IA           |

        Given I set MOCK task details
            | id           | 3db21928-cbbc-task-bd91-137c7031fe17 |
            | assignee     | 3db21928-cbbc-4364-bd91-137c7031fe17 |
            | task_state   | <task_state>                         |
            | jurisdiction | IA                                   |


        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        When I click tab with label "Tasks" in case details page

        Then I validate case details task tab page is displayed

        When I start case next step "Test event"
        When I complete and submit test event "text"

        Then I see task event validation error page
            | Summary header  | There is a problem                              |
            | Summary message | Task cancelled/marked as done                   |
            | Details header  | Task cancelled/marked as done                   |
            | Details message | This task has been cancelled or marked as done. |


        Then I see task event validation error page
            | Details message | Click Continue to complete the event and save your progress. |
        Then I see task event validation error page
            | Details message | Alternatively, click Cancel to return to the tasks tab without saving your progress. |
        When I click continue in task event validation message page
        Then I see case details page

        Examples:
            | roles                                                                            | task_state |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor | completed  |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor | cancelled   |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor | terminated |

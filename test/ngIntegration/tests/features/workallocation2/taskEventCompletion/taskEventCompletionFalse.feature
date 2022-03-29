@ng  
Feature: WA Release 2: Case events and Task completion and states when task_required is false

    Background: Setup
        Given I set MOCK case details with reference "caseDetails"
        Given I set MOCK case list values
            | case_id          | case_fields.[CASE_REFERENCE] | case_fields_formatted.[CASE_REFERENCE] |
            | 1234567812345678 | 1234567812345678             | 1234567812345678                       |
            | 1234567812345679 | 1234567812345679             | 1234567812345679                       |
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


        Given I set MOCK request "/workallocation2/task/:taskId/:action" intercept with reference "completeTaskRequest"
        Given I set MOCK request "/data/cases/:caseId/events" intercept with reference "submitEvent"



    Scenario Outline: Event with only one task assigned to this user
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |


        Given I set MOCK task required for event as "false"
        Given I set MOCK tasks required for event
            | id                                   | assignee                             | task_state | case_id          |
            | 3db21928-cbbc-task-bd91-137c7031fe17 | 3db21928-cbbc-4364-bd91-137c7031fe17 | assigned   | 1234567812345678 |
            | 3db21928-cbbc-task-bd91-137c7031fe18 | 08a3d216-c6ab-4e92-a7e3-ca3661e6be83 | assigned | 1234567812345678 |

        Given I set MOCK task details
            | id           | 3db21928-cbbc-task-bd91-137c7031fe17 |
            | assignee     | 3db21928-cbbc-4364-bd91-137c7031fe17 |
            | task_state   | assigned                             |
            | jurisdiction | IA                                   |
            | case_id      | 1234567812345678                     |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        When I click tab with label "Tasks" in case details page

        Then I validate case details task tab page is displayed

        When I start case next step "Test event"

        Given I reset reference "completeTaskRequest" value to null
        Given I reset reference "submitEvent" value to null

        When I complete and submit test event "text"

        Then I wait for reference "completeTaskRequest" value not null
        Then I wait for reference "submitEvent" value not null

        Then I see case details page

        Examples:
            | roles                                                                            |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor |


    Scenario Outline: Event with more than one task assigned to this user
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |


        Given I set MOCK task required for event as "false"
        Given I set MOCK tasks required for event
            | id                                   | assignee                             | task_state | case_id          |
            | 3db21928-cbbc-task-bd91-137c7031fe17 | 3db21928-cbbc-4364-bd91-137c7031fe17 | assigned   | 1234567812345678 |
            | 3db21928-cbbc-task-bd91-137c7031fe18 | 3db21928-cbbc-4364-bd91-137c7031fe17 | assigned | 1234567812345678 |

        Given I set MOCK task details
            | id           | 3db21928-cbbc-task-bd91-137c7031fe17 |
            | assignee     | 3db21928-cbbc-4364-bd91-137c7031fe17 |
            | task_state   | assigned                             |
            | jurisdiction | IA                                   |
            | case_id      | 1234567812345678                     |

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


    Scenario Outline: Event with more than one task and none are assigned to this user
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |


        Given I set MOCK task required for event as "false"
        Given I set MOCK tasks required for event
            | id                                   | assignee                             | task_state | case_id          |
            | 3db21928-cbbc-task-bd91-137c7031fe17 | 3db21928-cbbc-4364-bd91-137c7031fe10 | assigned | 1234567812345678 |
            | 3db21928-cbbc-task-bd91-137c7031fe18 | 3db21928-cbbc-4364-bd91-137c7031fe10 | assigned | 1234567812345678 |

        Given I set MOCK task details
            | id           | 3db21928-cbbc-task-bd91-137c7031fe17 |
            | assignee | 3db21928-cbbc-4364-bd91-137c7031fe10 |
            | task_state   | assigned                             |
            | jurisdiction | IA                                   |
            | case_id      | 1234567812345678                     |

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
        Then I wait for reference "submitEvent" value not null
        Then I verify reference "completeTaskRequest" value is null

        Then I see case details page
        Examples:
            | roles                                                                            |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor |

    Scenario Outline: Event no task associated
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |


        Given I set MOCK task required for event as "false"
       
        Given I set MOCK task details
            | id           | 3db21928-cbbc-task-bd91-137c7031fe17 |
            | assignee     | 3db21928-cbbc-4364-bd91-137c7031fe10 |
            | task_state   | assigned                             |
            | jurisdiction | IA                                   |
            | case_id      | 1234567812345678                     |

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
        Then I wait for reference "submitEvent" value not null
        Then I verify reference "completeTaskRequest" value is null

        Then I see case details page
        Examples:
            | roles                                                                            |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor |

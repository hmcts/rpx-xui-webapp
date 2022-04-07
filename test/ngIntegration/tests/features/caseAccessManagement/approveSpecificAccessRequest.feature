
@ng @test
Feature: Case access management: Approve specific access request

    Background:setup
        Given I init MockApp
        Given I set MOCK case details with reference "caseDetails"
        Given I set MOCK case details "caseDetails" property "Jurisdiction" as "IA"
        Given I set MOCK case details "caseDetails" trigger id "text" trigger name "Test event"
        Given I set MOCK case list values
            | case_id          | case_fields.[CASE_REFERENCE] | case_fields_formatted.[CASE_REFERENCE] |
            | 1234567812345678 | 1234567812345678             | 1234567812345678                       |
            | 1234567812345679 | 1234567812345679             | 1234567812345679                       |
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


    Scenario Outline: Approve specific access request page validations 
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK case tasks with userDetails from reference "userDetails"
            | id                                   | task_title | assignee    | assigneeName | created_date | due_date | permissions                          | warnings | description                                                                                                                                                            |
            | 08a3d216-task-4e92-a7e3-ca3661e6be87 | Task 1     | thissession | Test user    | -10          | -1       | Own,Read,Refer,Manage,Execute,Cancel | true     | Click link to proceed to next step [test link next step](/case/case-details/${[case_id]})                                                                              |
            | 18a3d216-task-4e92-a7e3-ca3661e6be87 | Task 2 | thissession | Test 2 user | -10 | 0 | Own,Manage,Execute | true | Click link to proceed [next step 1](/case/case-details/${[case_id]}) or \n Click link to proceed to [next step 2](/case/IA/Asylum/${[case_id]}/trigger/text) |


        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        When I click tab with label "Tasks" in case details page

        Then I validate case details task tab page is displayed
        Then I validate task tab active tasks container displayed

        When I click next step "next step 2" for task with name "Task 2"
        Then I see Approve specific access work flow page "How long do you want to give access to this case for?" with caption "Approve specific access request" is displayed


        When I select duration option "7 days" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        When I select duration option "7 days" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        When I select duration option "7 days" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Examples:
            | roles                                                                            | PriorityIsDisplayed | DuedateIsDisplayed | TaskcreatedIsDisplayed |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor | true                | true               | false                  |
            # | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor   | false               | false              | true                   |

    
    
    Scenario Outline:  Approve specifc access requestion date validations - Happy path 
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK case tasks with userDetails from reference "userDetails"
            | id                                   | task_title | assignee    | assigneeName | created_date | due_date | permissions                          | warnings | description                                                                                                                                                            |
            | 08a3d216-task-4e92-a7e3-ca3661e6be87 | Task 1     | thissession | Test user    | -10          | -1       | Own,Read,Refer,Manage,Execute,Cancel | true     | Click link to proceed to next step [test link next step](/case/case-details/${[case_id]})                                                                              |
            | 18a3d216-task-4e92-a7e3-ca3661e6be87 | Task 2     | thissession | Test 2 user  | -10          | 0        | Own,Manage,Execute                   | true     | Click link to proceed [next step 1](/case/case-details/${[case_id]}) or \n Click link to proceed to [next step 2](/case/case-details/${[case_id]}/${[id]}/testaction2) |


        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        When I click tab with label "Tasks" in case details page

        Then I validate case details task tab page is displayed
        Then I validate task tab active tasks container displayed

        When I click next step "" for task with name ""
        Then I see Approve specific access work flow page "How long do you want to give access to this case for?" with caption "Approve specific access request" is displayed


        When I select duration option "Another period" in work flow
        Then I validate date input field "Access starts" is displayed "Yes" in work flow page
        Then I validate date input field "Access ends" is displayed "Yes" in work flow page


        When I enter duration date for field "Access starts" with current date plus 1 days in work flow
        When I enter duration date for field "Access ends" with current date plus 2 days in work flow

        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your answers" with caption "Allocate a hearing judge" is displayed

        Examples:
            | roles                                                                            | PriorityIsDisplayed | DuedateIsDisplayed | TaskcreatedIsDisplayed |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor | true                | true               | false                  |
# | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor   | false               | false              | true                   |


    Scenario Outline:  Approve specifc access requestion invalid date validations - Unhappy path
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK case tasks with userDetails from reference "userDetails"
            | id                                   | task_title | assignee    | assigneeName | created_date | due_date | permissions                          | warnings | description                                                                                                                                                            |
            | 08a3d216-task-4e92-a7e3-ca3661e6be87 | Task 1     | thissession | Test user    | -10          | -1       | Own,Read,Refer,Manage,Execute,Cancel | true     | Click link to proceed to next step [test link next step](/case/case-details/${[case_id]})                                                                              |
            | 18a3d216-task-4e92-a7e3-ca3661e6be87 | Task 2     | thissession | Test 2 user  | -10          | 0        | Own,Manage,Execute                   | true     | Click link to proceed [next step 1](/case/case-details/${[case_id]}) or \n Click link to proceed to [next step 2](/case/case-details/${[case_id]}/${[id]}/testaction2) |


        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Tasks" is displayed is "true"
        When I click tab with label "Tasks" in case details page

        Then I validate case details task tab page is displayed
        Then I validate task tab active tasks container displayed

        When I click next step "" for task with name ""
        Then I see Approve specific access work flow page "How long do you want to give access to this case for?" with caption "Approve specific access request" is displayed


        Then I validate date input field "Access starts" is displayed "Yes" in work flow page
        Then I validate date input field "Access ends" is displayed "Yes" in work flow page

        When I enter duration date for field "Access starts" with current date plus -1 days in work flow
        When I enter duration date for field "Access ends" with current date plus 2 days in work flow
        When I click continue in work flow page "Duration of role"
        Then I validate another period field "Access starts" validation error displayed is "true"
        Then I validate another period field "Access ends" validation error displayed is "false"
        Then I validate another period field "Access starts" validation error message is "The role start date must not be in the past"

        When I enter duration date for field "Access starts" with current date plus 1 days in work flow
        When I enter duration date for field "Access ends" with current date plus 0 days in work flow
        When I click continue in work flow page "Duration of role"
        Then I validate another period field "Access starts" validation error displayed is "false"
        Then I validate another period field "Access ends" validation error displayed is "true"
        Then I validate another period field "Access ends" validation error message is "The role end date must be after the role start date"

        Examples:
            | roles                                                                            | PriorityIsDisplayed | DuedateIsDisplayed | TaskcreatedIsDisplayed |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor | true                | true               | false                  |
# | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor   | false               | false              | true                   |



@ng

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


    Scenario Outline: Approve specific access request - Review page validations
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK case tasks with userDetails from reference "userDetails"
            | id                                   | task_title | assignee    | assigneeName | created_date | due_date | permissions                          | warnings | description                                                                                                                                     |
            | 08a3d216-task-4e92-a7e3-ca3661e6be87 | Task 1     | thissession | Test user    | -10          | -1       | Own,Read,Refer,Manage,Execute,Cancel | true     | Click link to proceed to next step [test link next step](/case/case-details/${[case_id]})                                                       |
            | 18a3d216-task-4e92-a7e3-ca3661e6be87 | Task 2     | thissession | Test 2 user  | -10          | 0        | Own,Manage,Execute                   | true     | Click link to proceed [next step 1](/case/case-details/${[case_id]}) or \n Click link to proceed to [next step 2](/role-access/specific-access) |


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


        Then I see Review specific access page with header "Review specific access request" is displayed
        Then I validate Review specific access page access request details
            | Case name              | new name       |
            | Case reference         | Test reference |
            | Date submitted         | 01-01-2001     |
            | Request from           | Test user      |
            | Reason for case access | slow Tuesday   |
        Then I validate Review specific access page radio options for actions
            | option                   |
            | Approve request          |
            | Reject request           |
            | Request more information |


        When I click continue in specific access request work flow
        Then I see error message of type "message" displayed with message "Select an option"
        Then I validate SAR page, error message displayed for option to select
        Examples:
            | roles                                                                            | PriorityIsDisplayed | DuedateIsDisplayed | TaskcreatedIsDisplayed |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor | true                | true               | false                  |
    # | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor   | false               | false              | true                   |


    Scenario Outline: Approve specific access request - duration page validations
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK case tasks with userDetails from reference "userDetails"
            | id                                   | task_title | assignee    | assigneeName | created_date | due_date | permissions                          | warnings | description                                                                                                                                     |
            | 08a3d216-task-4e92-a7e3-ca3661e6be87 | Task 1     | thissession | Test user    | -10          | -1       | Own,Read,Refer,Manage,Execute,Cancel | true     | Click link to proceed to next step [test link next step](/case/case-details/${[case_id]})                                                       |
            | 18a3d216-task-4e92-a7e3-ca3661e6be87 | Task 2     | thissession | Test 2 user  | -10          | 0        | Own,Manage,Execute                   | true     | Click link to proceed [next step 1](/case/case-details/${[case_id]}) or \n Click link to proceed to [next step 2](/role-access/specific-access) |


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
        
        Then I see Review specific access page with header "Review specific access request" is displayed
        When I select SAR action radio option "Approve request"
        When I click continue in specific access request work flow
        
        Then I see Approve specific access work flow page "How long do you want to give access to this case for?" with caption "Approve specific access request" is displayed


        When I select duration option "7 days" in approve speific access request work flow
        Then I validate date input field "Access Starts" is displayed "No" in work flow page
        Then I validate date input field "Access Ends" is displayed "No" in work flow page

        When I select duration option "Indefinite" in approve speific access request work flow
        Then I validate date input field "Access Starts" is displayed "No" in SAR work flow page
        Then I validate date input field "Access Ends" is displayed "No" in SAR work flow page

        When I select duration option "Another period" in approve speific access request work flow
        Then I validate date input field "Access Starts" is displayed "Yes" in SAR work flow page
        Then I validate date input field "Access Ends" is displayed "yes" in SAR work flow page

        Examples:
            | roles                                                                            | PriorityIsDisplayed | DuedateIsDisplayed | TaskcreatedIsDisplayed |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor | true                | true               | false                  |
    # | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor   | false               | false              | true                   |


    Scenario Outline:  Approve specifc access requestion date validations - Happy path
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK case tasks with userDetails from reference "userDetails"
            | id                                   | task_title | assignee    | assigneeName | created_date | due_date | permissions                          | warnings | description                                                                                                                                     |
            | 08a3d216-task-4e92-a7e3-ca3661e6be87 | Task 1     | thissession | Test user    | -10          | -1       | Own,Read,Refer,Manage,Execute,Cancel | true     | Click link to proceed to next step [test link next step](/case/case-details/${[case_id]})                                                       |
            | 18a3d216-task-4e92-a7e3-ca3661e6be87 | Task 2     | thissession | Test 2 user  | -10          | 0        | Own,Manage,Execute                   | true     | Click link to proceed [next step 1](/case/case-details/${[case_id]}) or \n Click link to proceed to [next step 2](/role-access/specific-access) |


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

        Then I see Review specific access page with header "Review specific access request" is displayed
        When I select SAR action radio option "Approve request"
        When I click continue in specific access request work flow

        Then I see Approve specific access work flow page "How long do you want to give access to this case for?" with caption "Approve specific access request" is displayed

        When I select duration option "Another period" in approve speific access request work flow
        Then I validate date input field "Access Starts" is displayed "Yes" in SAR work flow page
        Then I validate date input field "Access Ends" is displayed "yes" in SAR work flow page
        
        When I enter duration date for field "Access Starts" with current date plus 1 days in SAR work flow
        When I enter duration date for field "Access Ends" with current date plus 2 days in SAR work flow

        When I click continue in specific access request work flow

        Then I see SAR action "approved" confirmation page

        Examples:
            | roles                                                                            | PriorityIsDisplayed | DuedateIsDisplayed | TaskcreatedIsDisplayed |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor | true                | true               | false                  |
    # | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor   | false               | false              | true                   |


    Scenario Outline:  Approve specifc access requestion invalid date validations - Unhappy path
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK case tasks with userDetails from reference "userDetails"
            | id                                   | task_title | assignee    | assigneeName | created_date | due_date | permissions                          | warnings | description                                                                                                                                     |
            | 08a3d216-task-4e92-a7e3-ca3661e6be87 | Task 1     | thissession | Test user    | -10          | -1       | Own,Read,Refer,Manage,Execute,Cancel | true     | Click link to proceed to next step [test link next step](/case/case-details/${[case_id]})                                                       |
            | 18a3d216-task-4e92-a7e3-ca3661e6be87 | Task 2     | thissession | Test 2 user  | -10          | 0        | Own,Manage,Execute                   | true     | Click link to proceed [next step 1](/case/case-details/${[case_id]}) or \n Click link to proceed to [next step 2](/role-access/specific-access) |

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
        Then I see Review specific access page with header "Review specific access request" is displayed
        When I select SAR action radio option "Approve request"
        When I click continue in specific access request work flow

        Then I see Approve specific access work flow page "How long do you want to give access to this case for?" with caption "Approve specific access request" is displayed
        When I select duration option "Another period" in approve speific access request work flow

        Then I validate date input field "Access Starts" is displayed "Yes" in SAR work flow page
        Then I validate date input field "Access Ends" is displayed "Yes" in SAR work flow page

        When I enter duration date for field "Access Starts" with current date plus -1 days in SAR work flow
        When I enter duration date for field "Access Ends" with current date plus 2 days in SAR work flow
        
        When I click continue in specific access request work flow
        
        Then I validate another period field "Access Starts" validation error displayed is "true" in SAR work flow
        Then I validate another period field "Access Ends" validation error displayed is "false" in SAR work flow
        Then I validate another period field "Access Starts" validation error message is "The access start date must not be in the past" in SAR work flow

        When I enter duration date for field "Access Starts" with current date plus 1 days in SAR work flow
        When I enter duration date for field "Access Ends" with current date plus 0 days in SAR work flow

        When I click continue in specific access request work flow

        Then I validate another period field "Access Starts" validation error displayed is "false" in SAR work flow
        Then I validate another period field "Access Ends" validation error displayed is "true" in SAR work flow
        Then I validate another period field "Access Ends" validation error message is "The access end date must be after the access start date" in SAR work flow

        Examples:
            | roles                                                                            | PriorityIsDisplayed | DuedateIsDisplayed | TaskcreatedIsDisplayed |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor | true                | true               | false                  |
# | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor   | false               | false              | true                   |


    Scenario Outline:  Reject specifc access requestion date validations - Happy path
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK case tasks with userDetails from reference "userDetails"
            | id                                   | task_title | assignee    | assigneeName | created_date | due_date | permissions                          | warnings | description                                                                                                                                     |
            | 08a3d216-task-4e92-a7e3-ca3661e6be87 | Task 1     | thissession | Test user    | -10          | -1       | Own,Read,Refer,Manage,Execute,Cancel | true     | Click link to proceed to next step [test link next step](/case/case-details/${[case_id]})                                                       |
            | 18a3d216-task-4e92-a7e3-ca3661e6be87 | Task 2     | thissession | Test 2 user  | -10          | 0        | Own,Manage,Execute                   | true     | Click link to proceed [next step 1](/case/case-details/${[case_id]}) or \n Click link to proceed to [next step 2](/role-access/specific-access) |


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

        Then I see Review specific access page with header "Review specific access request" is displayed
        When I select SAR action radio option "Reject request"
        When I click continue in specific access request work flow

        Then I see SAR action "Reject" confirmation page

        Examples:
            | roles                                                                            | PriorityIsDisplayed | DuedateIsDisplayed | TaskcreatedIsDisplayed |
            | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor | true                | true               | false                  |
# | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor   | false               | false              | true                   |

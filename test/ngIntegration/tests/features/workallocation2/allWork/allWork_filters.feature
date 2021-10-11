@ng
Feature: WA Release 2: All work - filters

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK tasks with permissions for view "All work" and assigned state ""
            | Permissions | Count |
            | Manage      | 140   |
            | Read        | 10    |
        Given I set MOCK locations for WA release 2
            | id    | locationName |
            | 12345 | Test loc 1   |
            | 12346 | Test loc 2   |
            | 12347 | Test loc 3   |
            | 12348 | Test loc 4   |
            | 12349 | Test loc 5   |

        Given I set MOCK request "/workallocation2/findPerson" response log to report
        Given I set MOCK find person response for jurisdictions
            | domain    | id   | email                   | name           | knownAs       |
            | Judicial  | 1231 | judge_user1@gov.uk      | user1 j        | Lead judge    |
            | Judicial  | 1232 | judge_user2@gov.uk      | user2 j        | Hearing judge |
            | Legal Ops | 1233 | caseworker_user1@gov.uk | caseworker1 cw | Case worker   |
            | Legal Ops | 1234 | caseworker_user2@gov.uk | caseworker2 cw | Case worker   |
            | Admin     | 1235 | admin_user1@gov.uk      | admin1 a       | Case worker   |
            | Admin     | 1236 | admin_user2@gov.uk      | admin2 a       | Case worker   |

        Given I set MOCK persons end point "/workallocation2/caseworker" for WA release 2
            | idamId                               | email | firstName | lastName         |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be89 | fn1   | ln1       | fn_ln_1@test.com |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be81 | fn2   | ln2       | fn_ln_2@test.com |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be87 | fn3   | ln3       | fn_ln_3@test.com |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be86 | fn4   | ln4       | fn_ln_4@test.com |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be85 | fn5   | ln5       | fn_ln_5@test.com |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be84 | fn6   | ln6       | fn_ln_6@test.com |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be83 | fn7   | ln7       | fn_ln_7@test.com |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be82 | fn8   | ln8       | fn_ln_8@test.com |

        Given I set MOCK request "/workallocation2/taskWithPagination/" intercept with reference "taskSearchRequest"
        Given I set MOCK request "/workallocation2/caseWithPagination/" intercept with reference "caseSearchRequest"


    Scenario Outline: Tasks filter selection, with user role "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>" with reference "userDetails"

        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Given I reset reference "taskSearchRequest" value to null

        Then I see filter "Service" is displayed in all work page
        Then I see filter "Service" is enabled in all work page
        Then I validate filter item "Service" select or radio options present in all work page
            | option                 |
            | Immigration and Asylum |

        Then I see filter "Case Location" is displayed in all work page
        Then I see filter "Case Location" is enabled in all work page
        Then I validate filter item "Case Location" select or radio options present in all work page
            | option     |
            | Test loc 1 |
            | Test loc 2 |
            | Test loc 3 |
            | Test loc 4 |
            | Test loc 5 |

        Then I see filter "Person" is displayed in all work page

        Then I see filter "Person role type" is displayed in all work page
        Then I see filter "Person role type" is disabled in all work page


        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is disabled in all work page

        Then I see filter "Task type" is displayed in all work page
        Then I see filter "Task type" is enabled in all work page

        Then I see filter "Priority" is displayed in all work page
        Then I see filter "Priority" is enabled in all work page


        Given I reset reference "taskSearchRequest" value to null
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value     |
            | location     | 12345     |
            | location     | 12346     |
            | location     | 12347     |
            | location     | 12348     |
            | location     | 12349     |
            | person       |           |
            | jurisdiction | IA        |
            | taskCategory | All       |
            | taskType     | Legal Ops |
            | priority     | All       |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Case Location" select or radio option "Test loc 3" in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value     |
            | location     | 12347     |
            | person       |           |
            | jurisdiction | IA        |
            | taskCategory | All       |
            | taskType     | Legal Ops |
            | priority     | All       |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Person" select or radio option "None / Available tasks" in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value                  |
            | location     | 12347                  |
            | person       | unassigned             |
            | jurisdiction | IA                     |
            | taskCategory | None / Available tasks |
            | taskType     | Legal Ops              |
            | priority     | All                    |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Person role type" is enabled in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page
        Then I validate Apply filter button in disabled in all work page


        When I enter find person search input "cas" in work flow
        Then I see find person search results in work flow
            | Person                                  |
            | caseworker1 cw(caseworker_user1@gov.uk) |
            | caseworker2 cw(caseworker_user2@gov.uk) |
        When I select find person result "caseworker1 cw(caseworker_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value           |
            | location     | 12347           |
            | person       | 1233            |
            | jurisdiction | IA              |
            | taskCategory | Specific person |
            | taskType     | Legal Ops       |
            | priority     | All             |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Person role type" is enabled in all work page

        When I select filter item "Person role type" select or radio option "Judicial" in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page
        Then I validate Apply filter button in disabled in all work page


        When I enter find person search input "jud" in work flow
        Then I see find person search results in work flow
            | Person                            |
            | Lead judge(judge_user1@gov.uk)    |
            | Hearing judge(judge_user2@gov.uk) |
        When I select find person result "Lead judge(judge_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value           |
            | location     | 12347           |
            | person       | 1231            |
            | jurisdiction | IA              |
            | taskCategory | Specific person |
            | taskType     | Legal Ops       |
            | priority     | All             |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Person role type" is enabled in all work page

        When I select filter item "Person role type" select or radio option "Admin" in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page
        Then I validate Apply filter button in disabled in all work page


        When I enter find person search input "adm" in work flow
        Then I see find person search results in work flow
            | Person                       |
            | admin1 a(admin_user1@gov.uk) |
            | admin2 a(admin_user2@gov.uk) |
        When I select find person result "admin1 a(admin_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value           |
            | location     | 12347           |
            | person       | 1235            |
            | jurisdiction | IA              |
            | taskCategory | Specific person |
            | taskType     | Legal Ops       |
            | priority     | All             |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Person role type" is enabled in all work page

        When I select filter item "Person role type" select or radio option "Admin" in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page

        When I enter find person search input "adm" in work flow
        Then I see find person search results in work flow
            | Person                       |
            | admin1 a(admin_user1@gov.uk) |
            | admin2 a(admin_user2@gov.uk) |
        When I select find person result "admin1 a(admin_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value           |
            | location     | 12347           |
            | person       | 1235            |
            | jurisdiction | IA              |
            | taskCategory | Specific person |
            | taskType     | Legal Ops       |
            | priority     | All             |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Given I reset reference "taskSearchRequest" value to null

        When I select filter item "Task type" select or radio option "Judicial" in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value           |
            | location     | 12347           |
            | person       | 1235            |
            | jurisdiction | IA              |
            | taskCategory | Specific person |
            | taskType     | Judicial        |
            | priority     | All             |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Given I reset reference "taskSearchRequest" value to null

        When I select filter item "Priority" select or radio option "High" in all work page

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value           |
            | location     | 12347           |
            | person       | 1235            |
            | jurisdiction | IA              |
            | taskCategory | Specific person |
            | taskType     | Judicial        |
            | priority     | High            |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
    # | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |


    Scenario Outline: filter selection, with user role "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>" with reference "userDetails"

        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Given I reset reference "taskSearchRequest" value to null

        Then I see filter "Service" is displayed in all work page
        Then I see filter "Service" is enabled in all work page
        Then I validate filter item "Service" select or radio options present in all work page
            | option                 |
            | Immigration and Asylum |

        Then I see filter "Case Location" is displayed in all work page
        Then I see filter "Case Location" is enabled in all work page
        Then I validate filter item "Case Location" select or radio options present in all work page
            | option     |
            | Test loc 1 |
            | Test loc 2 |
            | Test loc 3 |
            | Test loc 4 |
            | Test loc 5 |

        Then I see filter "Person" is displayed in all work page

        Then I see filter "Person role type" is displayed in all work page
        Then I see filter "Person role type" is disabled in all work page


        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is disabled in all work page

        Then I see filter "Task type" is displayed in all work page
        Then I see filter "Task type" is enabled in all work page

        Then I see filter "Priority" is not displayed in all work page

        Given I reset reference "taskSearchRequest" value to null
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value     |
            | location     | 12345     |
            | location     | 12346     |
            | location     | 12347     |
            | location     | 12348     |
            | location     | 12349     |
            | person       |           |
            | jurisdiction | IA        |
            | taskCategory | All       |
            | taskType     | Judicial |
            | priority     |        |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Case Location" select or radio option "Test loc 3" in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value     |
            | location     | 12347     |
            | person       |           |
            | jurisdiction | IA        |
            | taskCategory | All       |
            | taskType | Judicial |
            | priority     |        |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Person" select or radio option "None / Available tasks" in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value                  |
            | location     | 12347                  |
            | person       | unassigned             |
            | jurisdiction | IA                     |
            | taskCategory | None / Available tasks |
            | taskType | Judicial |
            | priority     |                     |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Person role type" is enabled in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page
        Then I validate Apply filter button in disabled in all work page


        When I enter find person search input "cas" in work flow
        Then I see find person search results in work flow
            | Person                            |
            | Lead judge(judge_user1@gov.uk)    |
            | Hearing judge(judge_user2@gov.uk) |
           
        When I select find person result "Lead judge(judge_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value           |
            | location     | 12347           |
            | person       | 1231            |
            | jurisdiction | IA              |
            | taskCategory | Specific person |
            | taskType | Judicial |
            | priority     |              |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Person role type" is enabled in all work page

        When I select filter item "Person role type" select or radio option "Legal Ops" in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page
        Then I validate Apply filter button in disabled in all work page


        When I enter find person search input "jud" in work flow
        Then I see find person search results in work flow
            | Person                                  |
            | caseworker1 cw(caseworker_user1@gov.uk) |
            | caseworker2 cw(caseworker_user2@gov.uk) |
        When I select find person result "caseworker1 cw(caseworker_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value           |
            | location     | 12347           |
            | person       | 1233            |
            | jurisdiction | IA              |
            | taskCategory | Specific person |
            | taskType | Judicial |
            | priority     |              |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Person role type" is enabled in all work page

        When I select filter item "Person role type" select or radio option "Admin" in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page
        Then I validate Apply filter button in disabled in all work page


        When I enter find person search input "adm" in work flow
        Then I see find person search results in work flow
            | Person                       |
            | admin1 a(admin_user1@gov.uk) |
            | admin2 a(admin_user2@gov.uk) |
        When I select find person result "admin1 a(admin_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value           |
            | location     | 12347           |
            | person       | 1235            |
            | jurisdiction | IA              |
            | taskCategory | Specific person |
            | taskType | Judicial |
            | priority     |              |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Person role type" is enabled in all work page

        When I select filter item "Person role type" select or radio option "Admin" in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page

        When I enter find person search input "adm" in work flow
        Then I see find person search results in work flow
            | Person                       |
            | admin1 a(admin_user1@gov.uk) |
            | admin2 a(admin_user2@gov.uk) |
        When I select find person result "admin1 a(admin_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value           |
            | location     | 12347           |
            | person       | 1235            |
            | jurisdiction | IA              |
            | taskCategory | Specific person |
            | taskType | Judicial |
            | priority     |              |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"

        Given I reset reference "taskSearchRequest" value to null

        When I select filter item "Task type" select or radio option "Legal Ops" in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-task-field"
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value           |
            | location     | 12347           |
            | person       | 1235            |
            | jurisdiction | IA              |
            | taskCategory | Specific person |
            | taskType     | Legal Ops        |
            | priority     |              |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-task-field"


        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |


    Scenario Outline: Cases filter selection, with user role "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>" with reference "userDetails"

        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"

        Then I validate work allocation cases count in page 25

        Given I reset reference "caseSearchRequest" value to null

        Then I see filter "Service" is displayed in all work page
        Then I see filter "Service" is enabled in all work page
        Then I validate filter item "Service" select or radio options present in all work page
            | option                 |
            | Immigration and Asylum |

        Then I see filter "Case Location" is displayed in all work page
        Then I see filter "Case Location" is enabled in all work page
        Then I validate filter item "Case Location" select or radio options present in all work page
            | option     |
            | Test loc 1 |
            | Test loc 2 |
            | Test loc 3 |
            | Test loc 4 |
            | Test loc 5 |

        Then I see filter "Role type" is displayed in all work page

        Then I see filter "Person" is displayed in all work page

        Then I see filter "Person role type" is displayed in all work page
        Then I see filter "Role type" is enabled in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is disabled in all work page

        Given I reset reference "caseSearchRequest" value to null
        Given I set debug text "DEBUG category" in element with css selector "exui-work-field"
        When I click Apply filter button in all work page
        When I wait for reference "caseSearchRequest" value not null
        Then I validate task search request with reference "caseSearchRequest" have search parameters
            | key          | value     |
            | location_id     |      | 
            | actorId |  |
            | jurisdiction | Immigration and Asylum |
            | role     | Legal Ops |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-work-field"

        Given I reset reference "caseSearchRequest" value to null
        When I select filter item "Case Location" select or radio option "Test loc 3" in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-work-field"
        When I click Apply filter button in all work page
        When I wait for reference "caseSearchRequest" value not null
        Then I validate task search request with reference "caseSearchRequest" have search parameters
            | key          | value     |
            | location_id    | 12347     |
            | actorId |  |
            | jurisdiction | Immigration and Asylum |
            | role | Legal Ops |

        Then I validate debug text "DEBUG category" not present in element with css selector "exui-work-field"

        Given I reset reference "caseSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Role type" is enabled in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page
        Then I validate Apply filter button in disabled in all work page


        When I enter find person search input "cas" in work flow
        Then I see find person search results in work flow
            | Person                                  |
            | caseworker1 cw(caseworker_user1@gov.uk) |
            | caseworker2 cw(caseworker_user2@gov.uk) |
        When I select find person result "caseworker1 cw(caseworker_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-work-field"
        When I click Apply filter button in all work page
        When I wait for reference "caseSearchRequest" value not null
        Then I validate task search request with reference "caseSearchRequest" have search parameters
            | key          | value           |
            | location_id    | 12347           |
            | actorId | 1233 |
            | jurisdiction | Immigration and Asylum |
            | role    | Legal Ops       |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-work-field"

        Given I reset reference "caseSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Role type" is enabled in all work page

        When I select filter item "Role type" select or radio option "Judicial" in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page
        Then I validate Apply filter button in disabled in all work page


        When I enter find person search input "jud" in work flow
        Then I see find person search results in work flow
            | Person                            |
            | Lead judge(judge_user1@gov.uk)    |
            | Hearing judge(judge_user2@gov.uk) |
        When I select find person result "Lead judge(judge_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-work-field"
        When I click Apply filter button in all work page
        When I wait for reference "caseSearchRequest" value not null
        Then I validate task search request with reference "caseSearchRequest" have search parameters
            | key          | value           |
            | location_id | 12347 |
            | actorId | 1231 |
            | jurisdiction | Immigration and Asylum |
            | role     | Judicial       |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-work-field"

        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Role type" is enabled in all work page

        When I select filter item "Role type" select or radio option "Admin" in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page
        Then I validate Apply filter button in disabled in all work page


        When I enter find person search input "adm" in work flow
        Then I see find person search results in work flow
            | Person                       |
            | admin1 a(admin_user1@gov.uk) |
            | admin2 a(admin_user2@gov.uk) |
        When I select find person result "admin1 a(admin_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-work-field"
        When I click Apply filter button in all work page
        When I wait for reference "caseSearchRequest" value not null
        Then I validate task search request with reference "caseSearchRequest" have search parameters
            | key          | value           |
            | location_id | 12347 |
            | actorId | 1235 |
            | jurisdiction | Immigration and Asylum |
            | role    | Admin       |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-work-field"

        Given I reset reference "caseSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Role type" is enabled in all work page

        When I select filter item "Role type" select or radio option "Admin" in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page

        When I enter find person search input "adm" in work flow
        Then I see find person search results in work flow
            | Person                       |
            | admin1 a(admin_user1@gov.uk) |
            | admin2 a(admin_user2@gov.uk) |
        When I select find person result "admin1 a(admin_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-work-field"
        When I click Apply filter button in all work page
        When I wait for reference "caseSearchRequest" value not null
        Then I validate task search request with reference "caseSearchRequest" have search parameters
            | key          | value           |
            | location_id | 12347 |
            | actorId | 1235 |
            | jurisdiction | Immigration and Asylum |
            | role     |Admin       |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-work-field"

        Given I reset reference "caseSearchRequest" value to null

        Given I set debug text "DEBUG category" in element with css selector "exui-work-field"
        When I click Apply filter button in all work page
        When I wait for reference "caseSearchRequest" value not null
        Then I validate task search request with reference "caseSearchRequest" have search parameters
            | key          | value           |
            | location_id | 12347 |
            | actorId | 1235 |
            | jurisdiction | Immigration and Asylum |
            | role    | Admin        |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-work-field"

     
        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
# | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |

    Scenario Outline: Cases filter selection, with user role "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>" with reference "userDetails"

        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"

        Then I validate work allocation cases count in page 25

        Given I reset reference "caseSearchRequest" value to null

        Then I see filter "Service" is displayed in all work page
        Then I see filter "Service" is enabled in all work page
        Then I validate filter item "Service" select or radio options present in all work page
            | option                 |
            | Immigration and Asylum |

        Then I see filter "Case Location" is displayed in all work page
        Then I see filter "Case Location" is enabled in all work page
        Then I validate filter item "Case Location" select or radio options present in all work page
            | option     |
            | Test loc 1 |
            | Test loc 2 |
            | Test loc 3 |
            | Test loc 4 |
            | Test loc 5 |

        Then I see filter "Role type" is displayed in all work page

        Then I see filter "Person" is displayed in all work page

        Then I see filter "Person role type" is displayed in all work page
        Then I see filter "Role type" is enabled in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is disabled in all work page

        Given I reset reference "caseSearchRequest" value to null
        Given I set debug text "DEBUG category" in element with css selector "exui-work-field"
        When I click Apply filter button in all work page
        When I wait for reference "caseSearchRequest" value not null
        Then I validate task search request with reference "caseSearchRequest" have search parameters
            | key          | value                  |
            | location_id  |                        |
            | actorId      |                        |
            | jurisdiction | Immigration and Asylum |
            | role         | Judicial              |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-work-field"

        Given I reset reference "caseSearchRequest" value to null
        When I select filter item "Case Location" select or radio option "Test loc 3" in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-work-field"
        When I click Apply filter button in all work page
        When I wait for reference "caseSearchRequest" value not null
        Then I validate task search request with reference "caseSearchRequest" have search parameters
            | key          | value                  |
            | location_id  | 12347                  |
            | actorId      |                        |
            | jurisdiction | Immigration and Asylum |
            | role         | Judicial              |

        Then I validate debug text "DEBUG category" not present in element with css selector "exui-work-field"

        Given I reset reference "caseSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Role type" is enabled in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page
        Then I validate Apply filter button in disabled in all work page


        When I enter find person search input "cas" in work flow
        Then I see find person search results in work flow
            | Person                            |
            | Lead judge(judge_user1@gov.uk)    |
            | Hearing judge(judge_user2@gov.uk) |
           
        When I select find person result "Lead judge(judge_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-work-field"
        When I click Apply filter button in all work page
        When I wait for reference "caseSearchRequest" value not null
        Then I validate task search request with reference "caseSearchRequest" have search parameters
            | key          | value                  |
            | location_id  | 12347                  |
            | actorId      | 1231                   |
            | jurisdiction | Immigration and Asylum |
            | role         | Judicial              |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-work-field"

        Given I reset reference "caseSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Role type" is enabled in all work page

        When I select filter item "Role type" select or radio option "Legal Ops" in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page
        Then I validate Apply filter button in disabled in all work page


        When I enter find person search input "jud" in work flow
        Then I see find person search results in work flow
            | Person                                  |
            | caseworker1 cw(caseworker_user1@gov.uk) |
            | caseworker2 cw(caseworker_user2@gov.uk) |
        When I select find person result "caseworker1 cw(caseworker_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-work-field"
        When I click Apply filter button in all work page
        When I wait for reference "caseSearchRequest" value not null
        Then I validate task search request with reference "caseSearchRequest" have search parameters
            | key          | value                  |
            | location_id  | 12347                  |
            | actorId      | 1233                   |
            | jurisdiction | Immigration and Asylum |
            | role         | Legal Ops               |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-work-field"

        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Role type" is enabled in all work page

        When I select filter item "Role type" select or radio option "Admin" in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page
        Then I validate Apply filter button in disabled in all work page


        When I enter find person search input "adm" in work flow
        Then I see find person search results in work flow
            | Person                       |
            | admin1 a(admin_user1@gov.uk) |
            | admin2 a(admin_user2@gov.uk) |
        When I select find person result "admin1 a(admin_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-work-field"
        When I click Apply filter button in all work page
        When I wait for reference "caseSearchRequest" value not null
        Then I validate task search request with reference "caseSearchRequest" have search parameters
            | key          | value                  |
            | location_id  | 12347                  |
            | actorId      | 1235                   |
            | jurisdiction | Immigration and Asylum |
            | role         | Admin                  |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-work-field"

        Given I reset reference "caseSearchRequest" value to null
        When I select filter item "Person" select or radio option "Specific person" in all work page
        Then I see filter "Role type" is enabled in all work page

        When I select filter item "Role type" select or radio option "Admin" in all work page

        Then I see filter "Person input" is displayed in all work page
        Then I see filter "Person input" is enabled in all work page

        When I enter find person search input "adm" in work flow
        Then I see find person search results in work flow
            | Person                       |
            | admin1 a(admin_user1@gov.uk) |
            | admin2 a(admin_user2@gov.uk) |
        When I select find person result "admin1 a(admin_user1@gov.uk)" in work flow

        Then I validate Apply filter button in enabled in all work page
        Given I set debug text "DEBUG category" in element with css selector "exui-work-field"
        When I click Apply filter button in all work page
        When I wait for reference "caseSearchRequest" value not null
        Then I validate task search request with reference "caseSearchRequest" have search parameters
            | key          | value                  |
            | location_id  | 12347                  |
            | actorId      | 1235                   |
            | jurisdiction | Immigration and Asylum |
            | role         | Admin                  |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-work-field"

        Given I reset reference "caseSearchRequest" value to null

        Given I set debug text "DEBUG category" in element with css selector "exui-work-field"
        When I click Apply filter button in all work page
        When I wait for reference "caseSearchRequest" value not null
        Then I validate task search request with reference "caseSearchRequest" have search parameters
            | key          | value                  |
            | location_id  | 12347                  |
            | actorId      | 1235                   |
            | jurisdiction | Immigration and Asylum |
            | role         | Admin                  |
        Then I validate debug text "DEBUG category" not present in element with css selector "exui-work-field"


        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
| IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |



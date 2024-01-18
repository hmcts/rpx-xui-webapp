@ng 
Feature: WA Release 2: All work - filters (filters to be ignored EUI-4831)

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK tasks with permissions for view "All work" and assigned state ""
            | Permissions | Count |
            | Manage      | 140   |
            | Read        | 10    |
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
            | 12347 | IA Court Taylor House  |

        Given I set MOCK locations with names in service "SSCS"
            | id    | locationName             |
            | 20010 | SSCS Court Aldgate Tower |
            | 20011 | SSCS Court Birmingham    |
            | 20012 | SSCS Court Bradford      |
            | 20013 | SSCS Court Glasgow       |
            | 20014 | SSCS Court Hatton Cross  |
            | 20015 | SSCS Court Newcastle     |
            | 20016 | SSCS Court Newport       |
            | 20017 | SSCS Court North Shields |
            | 20018 | SSCS Court Taylor House  |

        Given I set MOCK find person response for jurisdictions
            | domain   | id   | email                   | name           | knownAs       |
            | Judicial | 1231 | judge_user1@gov.uk      | user1 j        | Lead judge    |
            | Judicial | 1232 | judge_user2@gov.uk      | user2 j        | Hearing judge |
            | legalOps | 1233 | caseworker_user1@gov.uk | caseworker1 cw | Case worker   |
            | legalOps | 1234 | caseworker_user1@gov.uk | caseworker2 cw | Case worker   |
            | Admin    | 1235 | admin_user1@gov.uk      | admin1 a       | Case worker   |
            | Admin    | 1236 | admin_user2@gov.uk      | admin2 a       | Case worker   |

        Given I set MOCK request "/workallocation/findPerson" response log to report
        Given I set MOCK request "/workallocation/findPerson" intercept with reference "findpersonRequest"



        Given I set MOCK caseworkers for service "IA"
            | idamId                               | firstName   | lastName | email                   | roleCategory     |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be89 | caseworker1 | cw       | caseworker_user1@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be81 | caseworker2 | cw       | caseworker_user2@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be87 | caseworker3 | cw       | caseworker_user3@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be86 | caseworker4 | cw       | caseworker_user4@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be85 | caseworker5 | cw       | caseworker_user5@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be84 | caseworker6 | cw       | caseworker_user6@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be83 | caseworker7 | cw       | caseworker_user7@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be82 | caseworker8 | cw       | caseworker_user8@gov.uk | LEGAL_OPERATIONS |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be83 | admin1      | a        | admin_user1@gov.uk      | ADMIN            |
            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be82 | admin2      | a        | admin_user2@gov.uk      | ADMIN            |

        Given I set MOCK request "/workallocation/task" intercept with reference "taskSearchRequest"
        Given I set MOCK request "/workallocation/all-work/cases" intercept with reference "caseSearchRequest"

    Scenario Outline: Tasks filters services displayed based for role assignment on service(s) <roleAssignment_services>
        Given I have workallocation on boarded services "IA,SSCS,CIVIL,PRIVATELAW"

        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator" with reference "userDetails"
        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "<roleAssignment_services>" allow empty service
            | roleName    | task-supervisor |
            | substantive | Y               |

        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        Then I validate tasks count in page 25
        Then I validate filter item "Service" select or radio has option "<Services>" in all work page
        Examples:
            | roleAssignment_services |       Services                   |
            |                         | IA,SSCS,CIVIL,PRIVATELAW |
            | IA                      | IA                       |
            | IA,                     | IA,SSCS,CIVIL,PRIVATELAW |
            | IA,SSCS                 | IA,SSCS                  |



    Scenario: Tasks filters state, with user role "Caseworker"
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator" with reference "userDetails"
        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "IA" allow empty service
            | roleName    | task-supervisor |
            | substantive | Y               |
        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        Then I validate tasks count in page 25
        Given I reset reference "taskSearchRequest" value to null


        Then I see filter "Service" is displayed in all work page
        Then I see filter "Service" is enabled in all work page
        Then I validate filter item "Service" select or radio options present in all work page
            | option |
            | IA     |


        Then I see filter "Location" is displayed in all work page
        Then I validate filter item "Location radios" select or radio options present in all work page
            | option                |
            | All                   |
            | Search for a location |


        Then I see filter "Tasks" is displayed in all work page

        Then I see filter "Tasks by role type" is displayed in all work page

        Then I see filter "Person input" is displayed in all work page

        Then I see filter "Task type" is displayed in all work page
        Then I see filter "Task type" is enabled in all work page

        Then I see filter "Priority" is displayed in all work page
        Then I see filter "Priority" is enabled in all work page

    Scenario Outline: "Caseworker" Tasks filter, filetr role type <Person_Role_Type>
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator,task-supervisor,case-allocator" with reference "userDetails"
        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "" allow empty service
            | roleName    | task-supervisor |
            | substantive | Y               |
        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        Then I validate tasks count in page 25
        Given I reset reference "taskSearchRequest" value to null


        Then I see filter "Service" is displayed in all work page
        Then I see filter "Service" is enabled in all work page
        Then I validate filter item "Service" select or radio options present in all work page
            | option |
            | IA     |

        Then I see filter "Location" is displayed in all work page
        Then I validate filter item "Location radios" select or radio options present in all work page
            | option                |
            | All                   |
            | Search for a location |
        When I select filter item "Location radios" select or radio option "Search for a location" in all work page
        Then I see location search input is enabled in all work filters
        Then I enter location search "Taylor" in all work filter
        Then I see location search results in all work filter
            | location              |
            | Taylor House Tribunal Hearing Centre |
        Then I select location search result "Taylor House Tribunal Hearing Centre" in all work filter
        Then I see location "Taylor House Tribunal Hearing Centre" selected in all work filter

        When I select filter item "Tasks" select or radio option "<Task_Category>" in all work page
        When I select filter item "Tasks by role type" select or radio option "<Person_Role_Type>" in all work page

        When I enter find person search input "<Person_search>" in work flow

        Then I see find person search results in work flow
            | Person        |
            | <Person_name> |

        When I select find person result "<Person_name>" in work flow
        When I select filter item "Task type" select or radio option "<Task_type>" in all work page

        When I select filter item "Priority" select or radio option "<Priority>" in all work page

        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value          |
            | location     | <locationId>   |
            | user         | <person_id>    |
            | jurisdiction | <Jurisdiction> |
            | taskType     | <Task_type>    |
            | priority     | <Priority>     |

        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Tasks" select or radio option "All" in all work page
        When I select filter item "Location radios" select or radio option "All" in all work page
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" does not have search patameter key "user"
        Then I validate task search request with reference "taskSearchRequest" does not have search patameter key "location"
        Examples:
            | Jurisdiction | locationName | locationId | Task_Category        | Person_search | Person_name                              | person_id                            | Person_Role_Type | Task_type | Priority |
            | IA           | Test loc 3   | 12347      | Assigned to a person | cas           | caseworker1 cw (caseworker_user1@gov.uk) | 08a3d216-c6ab-4e92-a7e3-ca3661e6be89 | Legal Ops        | Legal Ops | High     |
            | IA           | Test loc 3   | 12347      | Assigned to a person | user1         | user1 j (judge_user1@gov.uk)             | 1231                                 | Judicial         | Legal Ops | High     |
            | IA           | Test loc 3   | 12347      | Assigned to a person | adm           | admin1 a (admin_user1@gov.uk)            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be83 | Admin            | Admin     | High     |

    Scenario: "Judicial" Tasks filters state
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor,case-allocator,task-supervisor,case-allocator" with reference "userDetails"
        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "" allow empty service
            | roleName    | task-supervisor |
            | substantive | Y               |
        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        Then I validate tasks count in page 25
        Given I reset reference "taskSearchRequest" value to null


        Then I see filter "Service" is displayed in all work page
        Then I see filter "Service" is enabled in all work page
        Then I validate filter item "Service" select or radio options present in all work page
            | option |
            | IA     |

        Then I see filter "Location" is displayed in all work page
        Then I validate filter item "Location radios" select or radio options present in all work page
            | option                |
            | All                   |
            | Search for a location |

        Then I see filter "Tasks" is displayed in all work page

        Then I see filter "Tasks by role type" is displayed in all work page


        Then I see filter "Person input" is displayed in all work page

        Then I see filter "Task type" is displayed in all work page
        Then I see filter "Task type" is enabled in all work page

        Then I see filter "Priority" is not displayed in all work page


    Scenario Outline: "Judicial" Tasks filter selection, with person role type <Person_Role_Type>
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor,case-allocator,task-supervisor,case-allocator" with reference "userDetails"
        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "" allow empty service
            | roleName    | task-supervisor |
            | substantive | Y               |
        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        Then I validate tasks count in page 25
        Given I reset reference "taskSearchRequest" value to null


        Then I see filter "Service" is displayed in all work page
        Then I see filter "Service" is enabled in all work page
        Then I validate filter item "Service" select or radio options present in all work page
            | option |
            | IA     |

        Then I see filter "Location" is displayed in all work page
        Then I validate filter item "Location radios" select or radio options present in all work page
            | option                |
            | All                   |
            | Search for a location |
        When I select filter item "Location radios" select or radio option "Search for a location" in all work page
        Then I see location search input is enabled in all work filters
        Then I enter location search "Taylor" in all work filter
        Then I see location search results in all work filter
            | location              |
            | Taylor House Tribunal Hearing Centre |
        Then I select location search result "Taylor House Tribunal Hearing Centre" in all work filter
        Then I see location "Taylor House Tribunal Hearing Centre" selected in all work filter


        When I select filter item "Tasks" select or radio option "<Task_Category>" in all work page
        When I select filter item "Tasks by role type" select or radio option "<Person_Role_Type>" in all work page

        When I enter find person search input "<Person_search>" in work flow

        Then I see find person search results in work flow
            | Person        |
            | <Person_name> |

        When I select find person result "<Person_name>" in work flow
        When I select filter item "Task type" select or radio option "<Task_type>" in all work page


        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key          | value          |
            | location     | <locationId>   |
            | user         | <person_id>    |
            | jurisdiction | <Jurisdiction> |
            | taskType     | <Task_type>    |


        Given I reset reference "taskSearchRequest" value to null
        When I select filter item "Tasks" select or radio option "All" in all work page
        When I select filter item "Location radios" select or radio option "All" in all work page
        When I click Apply filter button in all work page
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" does not have search patameter key "user"
        Then I validate task search request with reference "taskSearchRequest" does not have search patameter key "location"

        Examples:
            | Jurisdiction | locationName | locationId | Task_Category        | Person_search | Person_name                              | person_id                            | Person_Role_Type | Task_type |
            | IA           | Test loc 3   | 12347      | Assigned to a person | cas           | caseworker1 cw (caseworker_user1@gov.uk) | 08a3d216-c6ab-4e92-a7e3-ca3661e6be89 | Legal Ops        | Legal Ops |
            | IA           | Test loc 3   | 12347      | Assigned to a person | user1         | user1 j (judge_user1@gov.uk)             | 1231                                 | Judicial         | Legal Ops |
            | IA           | Test loc 3   | 12347      | Assigned to a person | adm           | admin1 a (admin_user1@gov.uk)            | 08a3d216-c6ab-4e92-a7e3-ca3661e6be83 | Admin            | Admin     |

    Scenario: "Caseworker" Cases filters state
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "task-supervisor,case-allocator,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator,task-supervisor,case-allocator" with reference "userDetails"
        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "" allow empty service
            | roleName    | task-supervisor |
            | substantive | Y               |
        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"
        Then I see all work cases not loaded and message displayed as "Please select filters and click Apply"

        Then I see filter "Person" is displayed in all work page
        When I enter find person search input "caseworker1" in work flow

        Then I see find person search results in work flow
            | Person                       |
            | caseworker1 cw (caseworker_user1@gov.uk) |

        When I select find person result "caseworker1 cw (caseworker_user1@gov.uk)" in work flow
        When I click Apply filter button in all work page
        Then I validate work allocation cases count in page 25

        Given I am perforing actions to validate "9 default filters"
        Given I reset reference "caseSearchRequest" value to null

        Then I see filter "Service" is displayed in all work page
        Then I see filter "Service" is enabled in all work page
        Then I validate filter item "Service" select or radio options present in all work page
            | option |
            | IA     |

        Then I see filter "Location" is displayed in all work page
        Then I validate filter item "Location radios" select or radio options present in all work page
            | option                |
            | All                   |
            | Search for a location |



        Then I see filter "Select a role type" is displayed in all work page

        Then I see filter "Person" is displayed in all work page

        Then I see filter "Select a role type" is enabled in all work page

        Then I see filter "Person input" is displayed in all work page

    # Scenario Outline: "Caseworker" Case filter selection, with role type <Role_Type>
    #     Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator,task-supervisor,case-allocator" with reference "userDetails"
    #     Given I set Mock user with ref "userDetails", ORGANISATION roles for services "" allow empty service
    #         | roleName    | task-supervisor |
    #         | substantive | Y               |
    #     Given I start MockApp

    #     Given I navigate to home page
    #     When I click on primary navigation header tab "All work", I see selected tab page displayed
    #     When I navigate to All work sub navigation tab "Cases"

    #     Then I validate work allocation cases count in page 25

    #     Given I reset reference "caseSearchRequest" value to null

    #     Then I see filter "Service" is displayed in all work page
    #     Then I see filter "Service" is enabled in all work page
    #     Then I validate filter item "Service" select or radio options present in all work page
    #         | option |
    #         | IA     |

    #     Then I see filter "Location" is displayed in all work page
    #     Then I validate filter item "Location radios" select or radio options present in all work page
    #         | option                |
    #         | All                   |
    #         | Search for a location |
    #     When I select filter item "Location radios" select or radio option "Search for a location" in all work page
    #     Then I see location search input is enabled in all work filters
    #     Then I enter location search "Taylor" in all work filter
    #     Then I see location search results in all work filter
    #         | location              |
    #         | Taylor House Tribunal Hearing Centre |
    #     Then I select location search result "Taylor House Tribunal Hearing Centre" in all work filter
    #     Then I see location "Taylor House Tribunal Hearing Centre" selected in all work filter


    #     When I select filter item "Person" select or radio option "<Person_radio>" in all work page
    #     When I select filter item "Role type" select or radio option "<Role_Type>" in all work page

    #     When I enter find person search input "<Person_search>" in work flow

    #     Then I see find person search results in work flow
    #         | Person        |
    #         | <Person_name> |

    #     When I select find person result "<Person_name>" in work flow


    #     When I click Apply filter button in all work page
    #     When I wait for reference "caseSearchRequest" value not null
    #     Then I validate task search request with reference "caseSearchRequest" have search parameters
    #         | key          | value          |
    #         | location_id  | <locationId>   |
    #         | actorId      | <person_id>    |
    #         | jurisdiction | <Jurisdiction> |
    #         | role         | <Role_Type>    |
    #     Examples:
    #         | Jurisdiction | locationName | locationId | Person_radio    | Person_search | Person_name                   | person_id                            | Role_Type |
    #         | IA           | Test loc 3   | 12347      | Specific person | user1         | user1 j (judge_user1@gov.uk)  | 1231                                 | Judicial  |
    #         | IA           | Test loc 3   | 12347      | Specific person | adm           | admin1 a (admin_user1@gov.uk) | 08a3d216-c6ab-4e92-a7e3-ca3661e6be83 | Admin     |

    # Scenario Outline: "Judicial" Case filter selection, with role type <Role_Type>
    #     Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor,case-allocator,task-supervisor,case-allocator" with reference "userDetails"
    #     Given I set Mock user with ref "userDetails", ORGANISATION roles for services "" allow empty service
    #         | roleName    | task-supervisor |
    #         | substantive | Y               |
    #     Given I start MockApp

    #     Given I navigate to home page
    #     When I click on primary navigation header tab "All work", I see selected tab page displayed
    #     When I navigate to All work sub navigation tab "Cases"

    #     Then I validate work allocation cases count in page 25

    #     Given I reset reference "caseSearchRequest" value to null

    #     Then I see filter "Service" is displayed in all work page
    #     Then I see filter "Service" is enabled in all work page
    #     Then I validate filter item "Service" select or radio options present in all work page
    #         | option |
    #         | IA     |

    #     Then I see filter "Location" is displayed in all work page
    #     Then I validate filter item "Location radios" select or radio options present in all work page
    #         | option                |
    #         | All                   |
    #         | Search for a location |
    #     When I select filter item "Location radios" select or radio option "Search for a location" in all work page
    #     Then I see location search input is enabled in all work filters
    #     Then I enter location search "Taylor" in all work filter
    #     Then I see location search results in all work filter
    #         | location              |
    #         | Taylor House Tribunal Hearing Centre |
    #     Then I select location search result "Taylor House Tribunal Hearing Centre" in all work filter
    #     Then I see location "Taylor House Tribunal Hearing Centre" selected in all work filter



    #     When I select filter item "Person" select or radio option "<Person_radio>" in all work page
    #     When I select filter item "Role type" select or radio option "<Role_Type>" in all work page

    #     When I enter find person search input "<Person_search>" in work flow

    #     Then I see find person search results in work flow
    #         | Person        |
    #         | <Person_name> |

    #     When I select find person result "<Person_name>" in work flow


    #     When I click Apply filter button in all work page
    #     When I wait for reference "caseSearchRequest" value not null
    #     Then I validate task search request with reference "caseSearchRequest" have search parameters
    #         | key          | value          |
    #         | location_id  | <locationId>   |
    #         | actorId      | <person_id>    |
    #         | jurisdiction | <Jurisdiction> |
    #         | role         | <Role_Type>    |
    #     Examples:
    #         | Jurisdiction | locationName | locationId | Person_radio    | Person_search | Person_name                   | person_id                            | Role_Type |
    #         | IA           | Test loc 3   | 12347      | Specific person | user1         | user1 j (judge_user1@gov.uk)  | 1231                                 | Judicial  |
    #         | IA           | Test loc 3   | 12347      | Specific person | adm           | admin1 a (admin_user1@gov.uk) | 08a3d216-c6ab-4e92-a7e3-ca3661e6be83 | Admin     |

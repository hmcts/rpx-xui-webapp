@ng @test
Feature: WA Release 2: All work - filters

    Background: Mock and browser setup
        Given I init MockApp

    Scenario Outline: filter selection, with user role "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK tasks with permissions for view "All work" and assigned state ""
            | Permissions | Count |
            | Manage      | 140    |
            | Read        | 10    |
        Given I set MOCK locations for WA release 2
            | id    | locationName |
            | 12345 | Test loc 1   |
            | 12346 | Test loc 2   |
            | 12347 | Test loc 3   |
            | 12348 | Test loc 4   |
            | 12349 | Test loc 5   |

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
        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Given I reset reference "taskSearchRequest" value to null
        When I select all work tasks filter "location" with value "Test loc 1"
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            |key|value|
            | location | 12345 |

        Given I reset reference "taskSearchRequest" value to null
        When I select all work tasks filter "location" with value "Test loc 2"
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key      | value |
            | location | 12346 |
        Then I validate task search request with reference "taskSearchRequest" does not have search parameters
            | key      | value |
            | location | 12345 |

        Given I reset reference "taskSearchRequest" value to null
        When I select all work tasks filter "person" with value "fn_ln_1@test.com"
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key      | value |
            | location | 12346 |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be89 |


        Given I reset reference "taskSearchRequest" value to null
        When I select all work tasks filter "person" with value "fn_ln_2@test.com"
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key      | value                                |
            | location | 12346                                |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be81 |
        Then I validate task search request with reference "taskSearchRequest" does not have search parameters
            | key      | value                                |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be89 |
       

        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |



    Scenario Outline: All location filter selection, with user role "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
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
        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Given I reset reference "taskSearchRequest" value to null
        When I select all work tasks filter "location" with value "Test loc 1"
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key      | value |
            | location | 12345 |

        Given I reset reference "taskSearchRequest" value to null
        When I select all work tasks filter "location" with value "All locations"
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key      | value |
            | location | 12345 |
            | location | 12346 |
            | location | 12347 |
            | location | 12348 |
            | location | 12349 |

        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |

    Scenario Outline: All persons filter selection, with user role "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
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
        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Given I reset reference "taskSearchRequest" value to null
        When I select all work tasks filter "person" with value "fn_ln_1@test.com"
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key      | value                                |
            | location | 12346                                |
            | user     | 08a3d216-c6ab-4e92-a7e3-ca3661e6be89 |

        Given I reset reference "taskSearchRequest" value to null
        When I select all work tasks filter "person" with value "All caseworkers"
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" have search parameters
            | key      | value |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be89 |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be81 |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be87 |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be86 |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be865 |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be864 |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be863 |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be862 |

        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |


    Scenario Outline: All persons filter selection, select None option, with user role "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
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
        Given I start MockApp

        Given I navigate to home page
        When I click on primary navigation header tab "All work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Given I reset reference "taskSearchRequest" value to null
        When I select all work tasks filter "person" with value "None (unassigned tasks)"
        When I wait for reference "taskSearchRequest" value not null
        Then I validate task search request with reference "taskSearchRequest" does not have search parameters
            | key  | value                                 |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be89  |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be81  |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be87  |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be86  |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be865 |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be864 |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be863 |
            | user | 08a3d216-c6ab-4e92-a7e3-ca3661e6be862 |


        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |


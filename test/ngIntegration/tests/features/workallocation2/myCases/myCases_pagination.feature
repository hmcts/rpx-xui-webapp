# https://tools.hmcts.net/jira/browse/EUI-3886
@ng
Feature: WA Release 2: My work to  My cases to pagination sorting

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK request "/workallocation/my-work/cases" intercept with reference "caseSearchRequest"


    Scenario Outline: pagnation and sorting for user type "<UserType>" with roles "<Roles>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation |
            | IA           | Y           | ORGANISATION | 20001        |
            | SSCS         | Y           | ORGANISATION | 20001        |

        Given I set MOCK workallocation cases with permissions for view "My cases"
            | Roles          | Count |
            | case-allocator | 40 |
            | case-allocator | 100 |

        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "My cases"

        Then I validate work allocation cases count in page 140

        Then I validate work allocation cases table pagination controls, is displayed state is "false"

        Then I validate work allocation table "cases" columns sortability
            | Columnheader | isSortable |
            | Person       | No         |
            | Case name    | No        |
            | Case category | No |

        # Then I see work allocation table "cases" reset sort button state isDisplayed is "false"
        # Then I see work allocation table "cases" reset sort button state isDisplayed is "true"
        # When I click work allocation table "cases" reset sort button
        # Then I see work allocation table "cases" reset sort button state isDisplayed is "false"
        # Then I see work allocation table "cases" reset sort button state isDisplayed is "true"


        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |

    Scenario Outline: pagnation control display with only 1 page of items
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation |
            | IA           | Y           | ORGANISATION | 20001        |
            | SSCS         | Y           | ORGANISATION | 20001        |

        Given I set MOCK workallocation cases with permissions for view "My cases"
            | Roles          | Count |
            | case-allocator | 20 |

        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "My cases"

        Then I validate task table pagination controls, is displayed state is "false"
        Then I validate work allocation cases count in page 20

        Then I validate work allocation cases table pagination controls, is displayed state is "false"
        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |

    # For EUI-4366
    @ignore
    Scenario Outline: pagnation control display 0 items
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation |
            | IA           | Y           | ORGANISATION | 20001        |
            | SSCS         | Y           | ORGANISATION | 20001        |

        Given I set MOCK workallocation cases with permissions for view "My cases"
            | Roles          | Count |
            | case-allocator | 0 |

        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "My cases"

        Then I validate work allocation cases table pagination controls, is displayed state is "false"

        Then I validate WA cases table footer displayed status is "true"
        Then I validate WA cases table footer message is "You have no assigned cases"

        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |


    Scenario Outline: My cases sorting
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation |
            | IA           | Y           | ORGANISATION | 20001        |
            | SSCS         | Y           | ORGANISATION | 20001        |

        Given I set MOCK workallocation cases with permissions for view "My cases"
            | Roles          | Count |
            | case-allocator | 10    |
            | case-allocator | 90    |

        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "My cases"

        Then I validate work allocation cases table pagination controls, is displayed state is "false"

        Then I validate "My work" tasks columns sorting with taskRequest url "workallocation/my-work/cases" on page 3 for user type "<UserType>"
            | ColumnHeader  | Caseworker | Judge | FieldId      |
            | Hearing date | Yes | Yes | hearing_date |

        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |


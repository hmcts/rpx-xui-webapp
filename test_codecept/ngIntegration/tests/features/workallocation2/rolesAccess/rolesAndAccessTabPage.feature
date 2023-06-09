@ng @known_bug @EUI-4837 
Feature: WA Release 2: Roles and access tab (EUI-4837)
        https://tools.hmcts.net/jira/browse/EUI-3782 ???
        known bug EUI-4837


    Background: Case details setup
        Given I set MOCK case details with reference "caseDetails"
        Given I set MOCK case details "caseDetails" property "Jurisdiction" as "IA"


        Given I add MOCK judicial user
            | idamId                               | firstName | lastName | email                   |
            | 38eb0c5e-29c7-453e-b92d-f2029aaed6c3 | user1     | judge    | caseworker_user1@gov.uk |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be81 | user2     | judge    | caseworker_user2@gov.uk |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be87 | Test 4    | user     | caseworker_user3@gov.uk |
            | 1db21928-cbbc-4364-bd91-137c7031fe17 | XUI test  | auto     | caseworker_user6@gov.uk |

    Scenario: Case with roles - 0 judicial, 0 LegalOps, 0 Exclusions

        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | baseLocation |
            | true            | IA           | 12345           |

        Given I set MOCK case roles
            | name        | roleCategory | roleName     | email                 | start | end |
            | user1 judge | XXX          | Lead judge   | judge_lead_1@gov.uk   | 1     | 2   |
            | user1 legal | XXX          | Case manager | case_manager_1@gov.uk | 10    | 10  |

        Given I set MOCK case role exclusions
            | name | userType | type | notes | added |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed

        Then I validate add link for role category "Judicial" is displayed in Roles and access page
        Then I validate add link for role category "Legal Ops" is displayed in Roles and access page

        Then I validate for role category "Judicial" case roles table displayed status is "false" in case roles and access page
        Then I validate for role category "LegalOps" case roles table displayed status is "false" in case roles and access page
        Then I validate for role category "Exclusions" case roles table displayed status is "false" in case roles and access page


        Then I validate for role category "Judicial" case roles no data message displayed status is "true" in case roles and access page
        Then I validate for role category "Legal Ops" case roles no data message displayed status is "true" in case roles and access page
        Then I validate for role category "Exclusions" case roles no data message displayed status is "true" in case roles and access page


        Then I validate for role category "Judicial" in case roles and access message displayed as "There are no judicial roles for this case."
        Then I validate for role category "Legal Ops" in case roles and access message displayed as "There are no legal Ops roles for this case."
        Then I validate for role category "Exclusions" in case roles and access message displayed as "There are no exclusions for this case."

    Scenario: Case with roles - 1 judicial, 1 LegalOps, 1 Exclusion

        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | baseLocation |
            | true            | IA           | 12345           |

        Given I set MOCK case roles
            | name        | roleCategory     | roleName     | email                 | start | end |
            | user1 judge | JUDICIAL         | Lead judge   | judge_lead_1@gov.uk   | 1     | 2   |
            | user1 legal | LEGAL_OPERATIONS | Case manager | case_manager_1@gov.uk | 10    | 10  |

        Given I set MOCK case role exclusions
            | name    | userType | type | notes            | added |
            | judge 1 | Judicial | lead | Test exclusion 1 | -5    |


        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed

        Then I validate add link for role category "Judicial" is displayed in Roles and access page
        Then I validate add link for role category "Legal Ops" is not displayed in Roles and access page
        Then I validate add link for role category "Exclusion" is displayed in Roles and access page


        Then I validate for role category "Judicial" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "LegalOps" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "Exclusions" case roles table displayed status is "true" in case roles and access page

        Then I validate for role category "Judicial" case roles no data message displayed status is "false" in case roles and access page
        Then I validate for role category "Legal Ops" case roles no data message displayed status is "false" in case roles and access page
        Then I validate for role category "Exclusions" case roles no data message displayed status is "false" in case roles and access page


    Scenario: Case with roles - Multiple judicial, 1 LegalOps and multiple Exclusions

        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | baseLocation |
            | true            | IA           | 12345           |

        Given I set MOCK case roles
            | name        | roleCategory     | roleName     | email                 | start | end |
            | user1 judge | JUDICIAL         | Lead judge   | judge_lead_1@gov.uk   |       |     |
            | user1 judge | JUDICIAL         | Lead judge   | judge_lead_1@gov.uk   |       |     |
            | user1 judge | JUDICIAL         | Lead judge   | judge_lead_1@gov.uk   |       |     |
            | user1 judge | JUDICIAL         | Lead judge   | judge_lead_1@gov.uk   |       |     |
            | user1 judge | JUDICIAL         | Lead judge   | judge_lead_1@gov.uk   |       |     |
            | user1 judge | JUDICIAL         | Lead judge   | judge_lead_1@gov.uk   |       |     |
            | user1 judge | JUDICIAL         | Lead judge   | judge_lead_1@gov.uk   |       |     |
            | user1 judge | JUDICIAL         | Lead judge   | judge_lead_1@gov.uk   |       |     |
            | user1 legal | LEGAL_OPERATIONS | Case manager | case_manager_1@gov.uk |       |     |

        Given I set MOCK case role exclusions
            | name    | userType | notes            | added |
            | judge 1 | Judicial | Test exclusion 1 | -5    |
            | judge 2 | Judicial | Test exclusion 2 | -5    |
            | judge 3 | Judicial | Test exclusion 3 | -15   |
            | judge 4 | Judicial | Test exclusion 4 | -55   |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed

        Then I validate add link for role category "Judicial" is displayed in Roles and access page
        Then I validate add link for role category "Legal Ops" is not displayed in Roles and access page
        Then I validate add link for role category "exclusions" is displayed in Roles and access page

        Then I validate for role category "Judicial" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "LegalOps" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "Exclusions" case roles table displayed status is "true" in case roles and access page


        Then I validate for role category "Judicial" case roles no data message displayed status is "false" in case roles and access page
        Then I validate for role category "Legal Ops" case roles no data message displayed status is "false" in case roles and access page
        Then I validate for role category "Exclusions" case roles no data message displayed status is "false" in case roles and access page

    Scenario: Case with roles - Validate columns and data displayed

        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | baseLocation |
            | true            | IA           | 12345           |

        Given I set MOCK case roles
            | actorId                              | name        | roleCategory     | roleName      | email                 | start | end |
            | 38eb0c5e-29c7-453e-b92d-f2029aaed6c3 | user1 judge | JUDICIAL         | Lead judge    | judge_lead_1@gov.uk   | 2     | 4   |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be81 | user1 judge | JUDICIAL         | Hearing judge | judge_lead_1@gov.uk   | 6     | 6   |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be87 | user1 legal | LEGAL_OPERATIONS | Case manager  | case_manager_1@gov.uk | 10    | 100 |

        Given I set MOCK case role exclusions
            | idamId                               | name    | userType | type | notes            | added |
            | 38eb0c5e-29c7-453e-b92d-f2029aaed6c3 | judge 1 | Judicial | lead | Test exclusion 1 | -5    |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be81 | judge 2 | Judicial | lead | Test exclusion 2 | -5    |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be87 | judge 3 | Judicial | lead | Test exclusion 3 | -15   |
            | 1db21928-cbbc-4364-bd91-137c7031fe17 | judge 4 | Judicial | lead | Test exclusion 4 | -55   |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed

        Then I validate add link for role category "Judicial" is displayed in Roles and access page
        Then I validate add link for role category "Legal Ops" is not displayed in Roles and access page
        Then I validate add link for role category "exclusions" is displayed in Roles and access page

        Then I validate case roles table has headers for role category "Judicial" in case roles and access page
            | headerName |
            | Name       |
            | Role       |
            | Start      |
            | End        |

        Then I validate case roles table for role category "Judicial" has data
            | Name        | Role          | Start | End |
            | user1 judge | Lead judge    | 2     | 4   |
            | user2 judge | Hearing judge | 6     | 6   |

        Then I validate case roles table has headers for role category "Legal Ops" in case roles and access page
            | headerName |
            | Name       |
            | Role       |
            | Start      |
            | End        |

        Then I validate case roles table for role category "Legal Ops" has data
            | Name        | Role         | Start | End |
            | user1 legal | Case manager | 10    | 100 |

        Then I validate case roles table has headers for role category "Exclusions" in case roles and access page
            | headerName |
            | Name       |
            | User type  |
            | Notes      |
            | Added      |

        Then I validate case roles table for role category "Exclusions" has data
            | Name | User type | Notes            | Added |
            | someJudgefn_1 judicialln_1 | Judicial | Test exclusion 1 | -5 |
            | someJudgefn_2 judicialln_2 | Judicial | Test exclusion 2 | -5 |
            | someJudgefn_3 judicialln_3 | Judicial | Test exclusion 3 | -15 |
            | someJudgefn_4 judicialln_4 | Judicial | Test exclusion 4 | -55 |


        Then I validate case roles "Manage" link displayed status is "true" for category "Judicial"
        Then I validate case roles "Manage" link displayed status is "true" for category "Legal Ops"
        Then I validate case roles "Delete" link displayed status is "true" for category "Exclusions"



    # Then I validate case roles table has headers for role category "Exclusions" in case roles and access page
    #     | headerName |
    #     | Name       |
    #     | Role       |
    #     | Location   |
    #     | Start      |
    #     | End        |

    Scenario: Case with roles - Validate non case allocator user - columns and data displayed

        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | baseLocation |
            | false           | IA           | 12345           |

        Given I set MOCK case roles
            | actorId                              | name        | roleCategory     | roleName      | email                 | start | end |
            | 38eb0c5e-29c7-453e-b92d-f2029aaed6c3 | user1 judge | JUDICIAL         | Lead judge    | judge_lead_1@gov.uk   | 1     | 1   |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be81 | user1 judge | JUDICIAL         | Hearing judge | judge_lead_1@gov.uk   | 10    | 10  |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be87 | user1 legal | LEGAL_OPERATIONS | Case manager | case_manager_1@gov.uk | 10 | 20 |

        Given I set MOCK case role exclusions

            | idamId                               | name    | userType | type | notes            | added |
            | 38eb0c5e-29c7-453e-b92d-f2029aaed6c3 | judge 1 | Judicial | lead | Test exclusion 1 | -5    |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be81 | judge 2 | Judicial | lead | Test exclusion 2 | -5    |
            | 18a3d216-c6ab-4e92-a7e3-ca3661e6be87 | judge 3 | Judicial | lead | Test exclusion 3 | -15   |
            | 1db21928-cbbc-4364-bd91-137c7031fe17 | judge 4 | Judicial | lead | Test exclusion 4 | -55   |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed

        Then I validate add link for role category "Judicial" is not displayed in Roles and access page
        Then I validate add link for role category "Legal Ops" is not displayed in Roles and access page
        Then I validate add link for role category "Exclusion" is displayed in Roles and access page

        Then I validate case roles table has headers for role category "Judicial" in case roles and access page
            | headerName |
            | Name       |
            | Role       |
            | Start      |
            | End        |

        Then I validate case roles table for role category "Judicial" has data
            | Name        | Role          | Start | End |
            | user1 judge | Lead judge    | 1     | 1   |
            | user2 judge | Hearing judge | 10    | 10  |

        Then I validate case roles table has headers for role category "Legal Ops" in case roles and access page
            | headerName |
            | Name       |
            | Role       |
            | Start      |
            | End        |

        Then I validate case roles table for role category "Legal Ops" has data
            | Name        | Role         | Start | End |
            | user1 legal | Case manager | 10    | 20  |

        Then I validate case roles table has headers for role category "Exclusions" in case roles and access page
            | headerName |
            | Name       |
            | User type  |
            | Notes      |
            | Added      |

        Then I validate case roles table for role category "Exclusions" has data
            | Name | User type | Notes            | Added |
            | someJudgefn_1 judicialln_1 | Judicial | Test exclusion 1 | -5 |
            | someJudgefn_2 judicialln_2 | Judicial | Test exclusion 2 | -5 |
            | someJudgefn_3 judicialln_3 | Judicial | Test exclusion 3 | -15 |
            | someJudgefn_4 judicialln_4 | Judicial | Test exclusion 4 | -55 |

        Then I validate case roles "Manage" link displayed status is "false" for category "Judicial"
        Then I validate case roles "Manage" link displayed status is "false" for category "Legal Ops"
        Then I validate case roles "Delete" link displayed status is "false" for category "Exclusions"

# Then I validate case roles table has headers for role category "Exclusions" in case roles and access page
#     | headerName |
#     | Name       |
#     | Role       |
#     | Location   |
#     | Start      |
#     | End        |


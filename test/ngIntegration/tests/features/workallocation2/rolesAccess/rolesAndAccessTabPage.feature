@ng  @wa2 
Feature: WA Release 2: Roles and access tab

    Background: Case details setup
        Given I set MOCK case details with reference "caseDetails"
        Given I set MOCK case details "caseDetails" property "Jurisdiction" as "IA"


    Scenario: Case with roles - 0 judicial, 0 LegalOps, 0 Exclusions

        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker " with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |

        Given I set MOCK case roles
            | name        | roleCategory     | roleName     | email                 | start | end |
            | user1 judge | XXX         | Lead judge   | judge_lead_1@gov.uk   | 1     | 2   |
            | user1 legal | XXX | Case manager | case_manager_1@gov.uk | 10    | 10  |

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
        Then I validate for role category "Legal Ops" in case roles and access message displayed as "There are no legal ops roles for this case."
        Then I validate for role category "Exclusions" in case roles and access message displayed as "There are no exclusions for this case."

    Scenario: Case with roles - 1 judicial, 1 LegalOps, 1 Exclusion

        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker " with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
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

        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker " with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
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
            | name    | userType | type | notes            | added |
            | judge 1 | Judicial | lead | Test exclusion 1 | -5    |
            | judge 2 | Judicial | lead | Test exclusion 2 | -5    |
            | judge 3 | Judicial | lead | Test exclusion 3 | -15   |
            | judge 4 | Judicial | lead | Test exclusion 4 | -55   |

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

        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker " with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | true            | IA           | 12345           |

        Given I set MOCK case roles
            | name        | roleCategory     | roleName      | email                 | start | end |
            | user1 judge | JUDICIAL         | Lead judge    | judge_lead_1@gov.uk   | 2     | 4   |
            | user1 judge | JUDICIAL         | Hearing judge | judge_lead_1@gov.uk   | 6     | 6   |
            | user1 legal | LEGAL_OPERATIONS | Case manager  | case_manager_1@gov.uk | 10    | 100 |

        Given I set MOCK case role exclusions
            | name    | userType | type | notes            | added |
            | judge 1 | Judicial | lead | Test exclusion 1 | -5    |
            | judge 2 | Judicial | lead | Test exclusion 2 | -5    |
            | judge 3 | Judicial | lead | Test exclusion 3 | -15   |
            | judge 4 | Judicial | lead | Test exclusion 4 | -55   |

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
            | Location   |
            | Start      |
            | End        |

        Then I validate case roles table for role category "Judicial" has data
            | Name        | Role          | Start | End |
            | user1 judge | Lead judge    | 2     | 4   |
            | user1 judge | Hearing judge | 6     | 6   |

        Then I validate case roles table has headers for role category "Legal Ops" in case roles and access page
            | headerName |
            | Name       |
            | Role       |
            | Location   |
            | Start      |
            | End        |

        Then I validate case roles table for role category "Legal Ops" has data
            | Name        | Role         | Start | End |
            | user1 legal | Case manager | 10    | 100 |

        Then I validate case roles table has headers for role category "Exclusions" in case roles and access page
            | headerName |
            | Type       |
            | Name       |
            | User type  |
            | Notes      |
            | Added      |

        Then I validate case roles table for role category "Exclusions" has data
            | Name    | User type | Type | Notes            | Added |
            | judge 1 | Judicial  | lead | Test exclusion 1 | -5    |
            | judge 2 | Judicial  | lead | Test exclusion 2 | -5    |
            | judge 3 | Judicial  | lead | Test exclusion 3 | -15   |
            | judge 4 | Judicial  | lead | Test exclusion 4 | -55   |


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


    Scenario: Case with roles - Validate non case-allocator user - columns and data displayed

        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker " with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | primaryLocation |
            | false           | IA           | 12345           |

        Given I set MOCK case roles
            | name        | roleCategory     | roleName      | email                 | start | end |
            | user1 judge | JUDICIAL         | Lead judge    | judge_lead_1@gov.uk   | 1     | 1   |
            | user1 judge | JUDICIAL         | Hearing judge | judge_lead_1@gov.uk   | 10    | 10  |
            | user1 legal | LEGAL_OPERATIONS | Case manager  | case_manager_1@gov.uk | 10    | 20  |

        Given I set MOCK case role exclusions
            | name    | userType | type | notes            | added |
            | judge 1 | Judicial | lead | Test exclusion 1 | -5    |
            | judge 2 | Judicial | lead | Test exclusion 2 | -5    |
            | judge 3 | Judicial | lead | Test exclusion 3 | -15   |
            | judge 4 | Judicial | lead | Test exclusion 4 | -55   |

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
            | Location   |
            | Start      |
            | End        |

        Then I validate case roles table for role category "Judicial" has data
            | Name        | Role          | Start | End |
            | user1 judge | Lead judge    | 1     | 1   |
            | user1 judge | Hearing judge | 10    | 10  |

        Then I validate case roles table has headers for role category "Legal Ops" in case roles and access page
            | headerName |
            | Name       |
            | Role       |
            | Location   |
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
            | Name    | User type | Type | Notes            | Added |
            | judge 1 | Judicial  | lead | Test exclusion 1 | -5    |
            | judge 2 | Judicial  | lead | Test exclusion 2 | -5    |
            | judge 3 | Judicial  | lead | Test exclusion 3 | -15   |
            | judge 4 | Judicial  | lead | Test exclusion 4 | -55   |

        Then I validate case roles "Manage" link displayed status is "false" for category "Judicial"
        Then I validate case roles "Manage" link displayed status is "false" for category "Legal Ops"
        Then I validate case roles "Delete" link displayed status is "true" for category "Exclusions"

# Then I validate case roles table has headers for role category "Exclusions" in case roles and access page
#     | headerName |
#     | Name       |
#     | Role       |
#     | Location   |
#     | Start      |
#     | End        |


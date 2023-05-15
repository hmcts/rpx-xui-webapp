@ng  
Feature: WA Release 2:  Roles and access - case role  manage links and actions

    Background: User and mock data setup
        Given I set MOCK request "/workallocation/findPerson" response log to report
        Given I set MOCK request "/api/role-access/roles/post" response log to report

        Given I set MOCK case details with reference "caseDetails"
        Given I set MOCK case details "caseDetails" property "Jurisdiction" as "IA"
        Given I set MOCK case details "caseDetails" property "CaseType" as "Asylum"


        Given I set MOCK case workers
            | email                   | firstName   | lastName | roleCategory     |
            | caseworker_user1@gov.uk | caseworker1 | cw       | LEGAL_OPERATIONS |
            | caseworker_user2@gov.uk | caseworker2 | cw       | LEGAL_OPERATIONS |


        Given I set MOCK find person response for jurisdictions
            | domain    | id   | email                   | name           | knownAs       |
            | Judicial  | 1231 | judge_user1@gov.uk      | user1 j        | Lead judge    |
            | Judicial  | 1232 | judge_user2@gov.uk      | user2 j        | Hearing judge |
            | Legal Ops | 1233 | caseworker_user1@gov.uk | caseworker1 cw | Case worker   |
            | Legal Ops | 1234 | caseworker_user2@gov.uk | caseworker2 cw | Case worker   |
            | Admin     | 1235 | admin_user1@gov.uk      | admin1 a       | Case worker   |
            | Admin     | 1236 | admin_user2@gov.uk      | admin2 a       | Case worker   |


        Given I set MOCK case roles
            | name        | roleCategory     | roleName     | email                   | start | end | type | userType         |
            | user1 judge | JUDICIAL         | lead-judge   | judge_lead_1@gov.uk     | 1     | 2   | CASE | JUDICIAL         |
            | user1 judge | JUDICIAL         | lead-judge   | judge_lead_1@gov.uk     | 2     | 2   | CASE | JUDICIAL         |
            | user1 judge | JUDICIAL         | lead-judge   | judge_lead_1@gov.uk     | 3     | 4   | CASE | JUDICIAL         |
            | user1 judge | JUDICIAL         | lead-judge   | judge_lead_1@gov.uk     | 4     | 4   | CASE | JUDICIAL         |
            | user1 judge | JUDICIAL         | lead-judge   | judge_lead_1@gov.uk     | 5     | 8   | CASE | JUDICIAL         |
            | user1 judge | JUDICIAL         | lead-judge   | judge_lead_1@gov.uk     | 6     | 8   | CASE | JUDICIAL         |
            | user1 judge | JUDICIAL         | lead-judge   | judge_lead_1@gov.uk     | 7     | 8   | CASE | JUDICIAL         |
            | user1 judge | JUDICIAL         | lead-judge   | judge_lead_1@gov.uk     | 8     | 8   | CASE | JUDICIAL         |
            | admin1 a    | LEGAL_OPERATIONS | case-manager | caseworker_user1@gov.uk | 9     | 20  | CASE | LEGAL_OPERATIONS |
            | admin1 b    | LEGAL_OPERATIONS | case-manager | caseworker_user2@gov.uk | 9     | 20  | CASE | LEGAL_OPERATIONS |


        Given I set MOCK case role exclusions
            | name    | userType | type | notes            | added |
            | judge 1 | Judicial | lead | Test exclusion 1 | -5    |
            | judge 2 | Judicial | lead | Test exclusion 2 | -5    |
            | judge 3 | Judicial | lead | Test exclusion 3 | -15   |
            | judge 4 | Judicial | lead | Test exclusion 4 | -55   |


    Scenario: Manage link display and actions listed
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | baseLocation |
            | true            | IA           | 12345           |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed

        Then I validate for role category "Judicial" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "LegalOps" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "Exclusions" case roles table displayed status is "true" in case roles and access page

        Then I validate case roles "Manage" link displayed status is "true" for category "Judicial"
        Then I validate case roles "Manage" link displayed status is "true" for category "Legal Ops"

        When I click manage link for role category "Judiciary" at row 1 in Roles and access page
        Then I validate actions row for role category "Judiciary" at row 1 is "displayed" in Roles and access page

        Then I validate actions row for role category "Judiciary" has action links in Roles and access page
            | ActionLinks |
            | Reallocate  |
            | Remove      |

        When I click action row link "Remove" for role category "Judiciary" in Roles and access page

    Scenario: Judicial user Reallocate a Judiciary role
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | baseLocation |
            | true            | IA           | 12345           |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed

        Then I validate for role category "Judicial" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "LegalOps" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "Exclusions" case roles table displayed status is "true" in case roles and access page

        Then I validate case roles "Manage" link displayed status is "true" for category "Judicial"
        Then I validate case roles "Manage" link displayed status is "true" for category "Legal Ops"

        When I click manage link for role category "Judiciary" at row 1 in Roles and access page
        Then I validate actions row for role category "Judiciary" at row 1 is "displayed" in Roles and access page

        Then I validate actions row for role category "Judiciary" has action links in Roles and access page
            | ActionLinks |
            | Reallocate  |
            | Remove      |

        When I click action row link "Reallocate" for role category "Judiciary" in Roles and access page

        # Then I see Allocate role work flow page "Choose how to allocate the role" with caption "Reallocate a hearing judge" is displayed
        # When I select Choose how to allocate option "Reserve to me" in work flow
        # When I click continue in work flow page "Choose how to allocate the role"

        Then I see Allocate role work flow page "Find the person" with caption "Reallocate a lead judge" is displayed
        When I enter find person search input "user1" in work flow
        Then I see find person search results in work flow
            | Person                      |
            | user1 j (judge_user1@gov.uk) |
        When I select find person result "user1 j (judge_user1@gov.uk)" in work flow
        When I click continue in work flow page "Find the person"

        Then I see Allocate role work flow page "Duration of role" with caption "Reallocate a lead judge" is displayed
        When I select duration option "Indefinite" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your changes" with caption "Reallocate a lead judge" is displayed

        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                          | Answer                      |
            | Who the role will be allocated to | Allocate to another person  |
            | Person                            | user1 j (judge_user1@gov.uk) |
            | Duration of role                  | Indefinite                  |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        Then I see case details page displayed with tab "Roles and access" selected
        Then I see case details page with message banner "You've reallocated a role"

    Scenario: Judicial user Reallocate a Legal Ops role
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | baseLocation |
            | true            | IA           | 12345           |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed

        Then I validate for role category "Judicial" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "LegalOps" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "Exclusions" case roles table displayed status is "true" in case roles and access page

        Then I validate case roles "Manage" link displayed status is "true" for category "Judicial"
        Then I validate case roles "Manage" link displayed status is "true" for category "Legal Ops"

        When I click manage link for role category "Legal Ops" at row 1 in Roles and access page
        Then I validate actions row for role category "Legal Ops" at row 1 is "displayed" in Roles and access page

        Then I validate actions row for role category "Legal Ops" has action links in Roles and access page
            | ActionLinks |
            | Reallocate  |
            | Remove      |

        When I click action row link "Reallocate" for role category "Legal Ops" in Roles and access page


        Then I see Allocate role work flow page "Find the person" with caption "Reallocate a legal ops case manager" is displayed
        When I enter find person search input "cas" in work flow
        Then I see find person search results in work flow
            | Person                                  |
            | caseworker1 cw (caseworker_user1@gov.uk) |
            | caseworker2 cw (caseworker_user2@gov.uk) |
        When I select find person result "caseworker_user1@gov.uk" in work flow
        When I click continue in work flow page "Find the person"

        Then I see Allocate role work flow page "Duration of role" with caption "Reallocate a legal ops case manager" is displayed
        When I select duration option "Indefinite" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your changes" with caption "Reallocate a legal ops case manager" is displayed

        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                          | Answer                     |
            | Who the role will be allocated to | Allocate to another person |
            | Person                            | caseworker_user1@gov.uk    |
            | Duration of role                  | Indefinite                 |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        Then I see case details page displayed with tab "Roles and access" selected
        Then I see case details page with message banner "You've reallocated a role"


    Scenario: Legal Ops user Reallocate a Legal Ops role
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | baseLocation |
            | true            | IA           | 12345           |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed

        Then I validate for role category "Judicial" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "LegalOps" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "Exclusions" case roles table displayed status is "true" in case roles and access page

        Then I validate case roles "Manage" link displayed status is "true" for category "Judicial"
        Then I validate case roles "Manage" link displayed status is "true" for category "Legal Ops"

        When I click manage link for role category "Legal Ops" at row 1 in Roles and access page
        Then I validate actions row for role category "Legal Ops" at row 1 is "displayed" in Roles and access page

        Then I validate actions row for role category "Legal Ops" has action links in Roles and access page
            | ActionLinks |
            | Reallocate  |
            | Remove      |

        When I click action row link "Reallocate" for role category "Legal Ops" in Roles and access page

        # Then I see Allocate role work flow page "Choose how to allocate the role" with caption "Reallocate a legal ops case manager" is displayed
        # When I select Choose how to allocate option "Allocate to another person" in work flow
        # When I click continue in work flow page "Choose how to allocate the role"

        Then I see Allocate role work flow page "Find the person" with caption "Reallocate a legal ops case manager" is displayed
        When I enter find person search input "cas" in work flow
        Then I see find person search results in work flow
            | Person                                  |
            | caseworker1 cw (caseworker_user1@gov.uk) |
            | caseworker2 cw (caseworker_user2@gov.uk) |
        When I select find person result "caseworker_user1@gov.uk" in work flow
        When I click continue in work flow page "Find the person"

        Then I see Allocate role work flow page "Duration of role" with caption "Reallocate a legal ops case manager" is displayed
        When I select duration option "Indefinite" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your changes" with caption "Reallocate a legal ops case manager" is displayed

        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                          | Answer                                  |
            | Who the role will be allocated to | Allocate to another person              |
            | Person                            | caseworker1 cw (caseworker_user1@gov.uk) |
            | Duration of role                  | Indefinite                              |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        Then I see case details page displayed with tab "Roles and access" selected
        Then I see case details page with message banner "You've reallocated a role"

    Scenario: Legal ops user Reallocate a Judicial role
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | baseLocation |
            | true            | IA           | 12345           |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed

        Then I validate for role category "Judicial" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "LegalOps" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "Exclusions" case roles table displayed status is "true" in case roles and access page

        Then I validate case roles "Manage" link displayed status is "true" for category "Judicial"
        Then I validate case roles "Manage" link displayed status is "true" for category "Legal Ops"

        When I click manage link for role category "Judicial" at row 1 in Roles and access page
        Then I validate actions row for role category "Judicial" at row 1 is "displayed" in Roles and access page

        Then I validate actions row for role category "Judicial" has action links in Roles and access page
            | ActionLinks |
            | Reallocate  |
            | Remove      |

        When I click action row link "Reallocate" for role category "Judicial" in Roles and access page


        Then I see Allocate role work flow page "Find the person" with caption "Reallocate a lead judge" is displayed
        When I enter find person search input "user1" in work flow
        Then I see find person search results in work flow
            | Person                      |
            | user1 j (judge_user1@gov.uk) |
        When I select find person result "judge_user1@gov.uk" in work flow
        When I click continue in work flow page "Find the person"

        Then I see Allocate role work flow page "Duration of role" with caption "Reallocate a lead judge" is displayed
        When I select duration option "Indefinite" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your changes" with caption "Reallocate a lead judge" is displayed

        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                          | Answer                      |
            | Who the role will be allocated to | Allocate to another person  |
            | Person                            | user1 j (judge_user1@gov.uk) |
            | Duration of role                  | Indefinite                  |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        Then I see case details page displayed with tab "Roles and access" selected
        Then I see case details page with message banner "You've reallocated a role"


    Scenario: Judicial user Removes judicial role
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | baseLocation |
            | true            | IA           | 12345           |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed

        Then I validate for role category "Judicial" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "LegalOps" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "Exclusions" case roles table displayed status is "true" in case roles and access page

        Then I validate case roles "Manage" link displayed status is "true" for category "Judicial"
        Then I validate case roles "Manage" link displayed status is "true" for category "Legal Ops"

        When I click manage link for role category "Judiciary" at row 1 in Roles and access page
        Then I validate actions row for role category "Judiciary" at row 1 is "displayed" in Roles and access page

        Then I validate actions row for role category "Judiciary" has action links in Roles and access page
            | ActionLinks       |
            | Reallocate        |
            | Remove Allocation |

        When I click action row link "Remove Allocation" for role category "Judiciary" in Roles and access page

        Then I see Remove allocation page with caption "Remove allocation" is displayed
        Then I see Remove allocation page with hint text "This will remove the role allocation. You may need to unassign or reassign associated tasks too" is displayed

        Then I see Check your answers page has total 2 questions
        Then I see Check your answers page has questions and answers without change link
            | Question     | Answer                      |
            | Type of role | Lead judge                  |
            | Person       | user1 j (judge_user1@gov.uk) |

        When I click button with label "Remove allocation" in work flow  Check your answers page
        Then I see case details page displayed with tab "Roles and access" selected
        Then I see case details page with message banner "You've removed a role allocation. You may need to unassign or reassign associated tasks too."

    Scenario: Judicial user Removes Legal ops role
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | isCaseAllocator | jurisdiction | baseLocation |
            | true            | IA           | 12345           |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed

        Then I validate for role category "Judicial" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "LegalOps" case roles table displayed status is "true" in case roles and access page
        Then I validate for role category "Exclusions" case roles table displayed status is "true" in case roles and access page

        Then I validate case roles "Manage" link displayed status is "true" for category "Judicial"
        Then I validate case roles "Manage" link displayed status is "true" for category "Legal Ops"

        When I click manage link for role category "Legal Ops" at row 1 in Roles and access page
        Then I validate actions row for role category "Legal Ops" at row 1 is "displayed" in Roles and access page

        Then I validate actions row for role category "Legal Ops" has action links in Roles and access page
            | ActionLinks       |
            | Reallocate        |
            | Remove Allocation |

        When I click action row link "Remove Allocation" for role category "Legal Ops" in Roles and access page

        Then I see Remove allocation page with caption "Remove allocation" is displayed
        Then I see Remove allocation page with hint text "This will remove the role allocation. You may need to unassign or reassign associated tasks too" is displayed

        Then I see Check your answers page has total 2 questions
        Then I see Check your answers page has questions and answers without change link
            | Question     | Answer                  |
            | Type of role | Case manager            |
            | Person       | caseworker_user1@gov.uk |

        When I click button with label "Remove allocation" in work flow  Check your answers page
        Then I see case details page displayed with tab "Roles and access" selected
        Then I see case details page with message banner "You've removed a role allocation. You may need to unassign or reassign associated tasks too."

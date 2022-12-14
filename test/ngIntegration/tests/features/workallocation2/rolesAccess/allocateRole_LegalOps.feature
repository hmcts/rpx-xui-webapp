@ng @known_bug @EUI-4803
Feature: WA Release 2: Roles and access - Allocate and Remove Role Legal Ops (EUI-4803)
    https://tools.hmcts.net/jira/browse/EUI-3800

    Background: Case details setup
        Given I set MOCK case details with reference "caseDetails"
        Given I set MOCK case details "caseDetails" property "Jurisdiction" as "IA"
        Given I set MOCK request "/workallocation/findPerson" response log to report
        Given I set MOCK find person response for jurisdictions
            | domain    | id   | email                   | name           | knownAs       |
            | Judicial  | 1231 | judge_user1@gov.uk      | user1 j        | Lead judge    |
            | Judicial  | 1232 | judge_user2@gov.uk      | user2 j        | Hearing judge |
            | Legal Ops | 1233 | caseworker_user1@gov.uk | caseworker1 cw | Case worker   |
            | Legal Ops | 1234 | caseworker_user2@gov.uk | caseworker2 cw | Case worker   |
            | Admin     | 1235 | admin_user1@gov.uk      | admin1 a       | Case worker   |
            | Admin     | 1236 | admin_user2@gov.uk      | admin2 a       | Case worker   |

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

        Given I set MOCK case roles
            | name | roleCategory | roleName | email | start | end |

    Scenario: Roles and access - LegalOps user allocates role - Allocate role, reserve to me for duration Indefinite

        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,task-supervisor,case-allocator" with reference "userDetails"
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
        Then I validate add link for role category "Legal Ops" is displayed in Roles and access page
        When I click add link for role category "Legal Ops" in case roles and access page

        Then I see Allocate role work flow page "Choose a role" with caption "Allocate a legal ops role" is displayed
        When I select Choose a role option "Case manager" in work flow
        When I click continue in work flow page "Choose a role"

        Then I see Allocate role work flow page "Choose how to allocate the role" with caption "Allocate a legal ops case manager" is displayed
        When I select Choose how to allocate option "Reserve to me" in work flow
        When I click continue in work flow page "Choose how to allocate the role"


        Then I see Allocate role work flow page "Duration of role" with caption "Allocate a legal ops case manager" is displayed
        When I select duration option "Indefinite" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your answers" with caption "Allocate a legal ops case manager" is displayed

        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                          | Answer        |
            | Type of role                      | Case manager  |
            | Who the role will be allocated to | Reserve to me |
            | Duration of role                  | Indefinite    |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        Then I see case details page displayed with tab "Roles and access" selected
        Then I see case details page with message banner "You've allocated a role"


    Scenario: Roles and access - LegalOps user allocates role - Allocate role, Allocate to another person for duration 7 Days

        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator" with reference "userDetails"
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
        Then I validate add link for role category "Legal Ops" is displayed in Roles and access page
        When I click add link for role category "Legal Ops" in case roles and access page

        Then I see Allocate role work flow page "Choose a role" with caption "Allocate a legal ops role" is displayed
        When I select Choose a role option "Case manager" in work flow
        When I click continue in work flow page "Choose a role"

        Then I see Allocate role work flow page "Choose how to allocate the role" with caption "Allocate a legal ops case manager" is displayed
        When I select Choose how to allocate option "Allocate to another person" in work flow
        When I click continue in work flow page "Choose how to allocate the role"

        Then I see Allocate role work flow page "Find the person" with caption "Allocate a legal ops case manager" is displayed
        When I enter find person search input "case" in work flow
        Then I see find person search results in work flow
            | Person                                  |
            | caseworker1 cw (caseworker_user1@gov.uk) |
            | caseworker2 cw (caseworker_user2@gov.uk) |
        When I select find person result "caseworker_user1@gov.uk" in work flow
        When I click continue in work flow page "Find the person"

        Then I see Allocate role work flow page "Duration of role" with caption "Allocate a legal ops case manager" is displayed
        When I select duration option "7 days" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your answers" with caption "Allocate a legal ops case manager" is displayed

        Then I see Check your answers page has total 4 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                          | Answer                     |
            | Type of role                      | Case manager               |
            | Who the role will be allocated to | Allocate to another person |
            | Duration of role                  | 7 days                     |
            | Person                            | caseworker_user1@gov.uk    |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        Then I see case details page displayed with tab "Roles and access" selected
        Then I see case details page with message banner "You've allocated a role"

    Scenario: Roles and access - LegalOps user allocates role - Allocate role, reserve to me for duration Another period

        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator" with reference "userDetails"
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
        Then I validate add link for role category "Legal Ops" is displayed in Roles and access page
        When I click add link for role category "Legal Ops" in case roles and access page

        Then I see Allocate role work flow page "Choose a role" with caption "Allocate a legal ops role" is displayed
        When I select Choose a role option "Case manager" in work flow
        When I click continue in work flow page "Choose a role"

        Then I see Allocate role work flow page "Choose how to allocate the role" with caption "Allocate a legal ops case manager" is displayed
        When I select Choose how to allocate option "Reserve to me" in work flow
        When I click continue in work flow page "Choose how to allocate the role"


        Then I see Allocate role work flow page "Duration of role" with caption "Allocate a legal ops case manager" is displayed
        When I select duration option "Another period" in work flow
        Then I validate date input field "Access starts" is displayed "Yes" in work flow page
        Then I validate date input field "Access ends" is displayed "Yes" in work flow page


        When I enter duration date for field "Access starts" with current date plus 1 days in work flow
        When I enter duration date for field "Access ends" with current date plus 2 days in work flow

        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your answers" with caption "Allocate a legal ops case manager" is displayed

        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                          | Answer        |
            | Type of role                      | Case manager  |
            | Who the role will be allocated to | Reserve to me |
            | Duration of role                  | 1 to 2        |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        Then I see case details page displayed with tab "Roles and access" selected
        Then I see case details page with message banner "You've allocated a role"


    Scenario: Roles and access - LegalOps user allocates role - Allocate role, reserve to me for duration Another period - invalid dates

        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator" with reference "userDetails"
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
        Then I validate add link for role category "Legal Ops" is displayed in Roles and access page
        When I click add link for role category "Legal Ops" in case roles and access page

        Then I see Allocate role work flow page "Choose a role" with caption "Allocate a legal ops role" is displayed
        When I select Choose a role option "Case manager" in work flow
        When I click continue in work flow page "Choose a role"

        Then I see Allocate role work flow page "Choose how to allocate the role" with caption "Allocate a legal ops case manager" is displayed
        When I select Choose how to allocate option "Reserve to me" in work flow
        When I click continue in work flow page "Choose how to allocate the role"
        Then I see Allocate role work flow page "Duration of role" with caption "Allocate a legal ops case manager" is displayed
        When I select duration option "Another period" in work flow
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

    Scenario: Roles and access - Judge user allocates LegalOps role

        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker ,task-supervisor,case-allocator" with reference "userDetails"
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
        Then I validate add link for role category "Legal Ops" is displayed in Roles and access page
        When I click add link for role category "Legal Ops" in case roles and access page

        Then I see Allocate role work flow page "Choose a role" with caption "Allocate a legal ops role" is displayed
        When I select Choose a role option "Case manager" in work flow
        When I click continue in work flow page "Choose a role"


        Then I see Allocate role work flow page "Find the person" with caption "Allocate a legal ops case manager" is displayed
        When I enter find person search input "cas" in work flow
        Then I see find person search results in work flow
            | Person                                  |
            | caseworker1 cw (caseworker_user1@gov.uk) |
            | caseworker2 cw (caseworker_user2@gov.uk) |
        When I select find person result "caseworker_user1@gov.uk" in work flow
        When I click continue in work flow page "Find the person"

        Then I see Allocate role work flow page "Duration of role" with caption "Allocate a legal ops case manager" is displayed
        When I select duration option "Indefinite" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your answers" with caption "Allocate a legal ops case manager" is displayed

        Then I see Check your answers page has total 4 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                          | Answer                     |
            | Type of role                      | Case manager               |
            | Who the role will be allocated to | Allocate to another person |
            | Duration of role                  | Indefinite                 |
            | Person                            | caseworker_user1@gov.uk    |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        Then I see case details page displayed with tab "Roles and access" selected
        Then I see case details page with message banner "You've allocated a role"

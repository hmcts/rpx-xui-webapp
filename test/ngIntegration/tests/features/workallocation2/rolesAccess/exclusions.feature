@ng  
Feature: WA Release 2: Exclusions
    Background: Setup
        Given I set MOCK case details with reference "caseDetails"
        Given I set MOCK case details "caseDetails" property "Jurisdiction" as "IA"
        Given I set MOCK request "/workallocation/findPerson" response log to report
        Given I set MOCK find person response for jurisdictions
            | domain   | id   | email                   | name           | knownAs       |
            | Judicial | 1231 | judge_user1@gov.uk      | user1 j        | Lead judge    |
            | Judicial | 1232 | judge_user2@gov.uk      | user2 j        | Hearing judge |
            | legalOps | 1233 | caseworker_user1@gov.uk | caseworker1 cw | Case worker   |
            | legalOps | 1234 | caseworker_user1@gov.uk | caseworker2 cw | Case worker   |
            | Admin    | 1235 | admin_user1@gov.uk      | admin1 a       | Case worker   |
            | Admin    | 1236 | admin_user2@gov.uk      | admin2 a       | Case worker   |

        Given I set MOCK case role exclusions
            | name    | userType | type | notes            | added |
            | judge 1 | Judicial | lead | Test exclusion 1 | -5    |
            | judge 2 | Judicial | lead | Test exclusion 2 | -5    |
            | judge 3 | Judicial | lead | Test exclusion 3 | -15   |
            | judge 4 | Judicial | lead | Test exclusion 4 | -55   |

    Scenario Outline: Roles and access - "<Useridentifier>" - Exclusion work flow with option "Exclude another person"
        Given I set MOCK with user "<Useridentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"


        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed
        When I click add link for role category "Exclusions" in case roles and access page

        Then I see Add an exclusion work flow page "Choose who the exclusion is for" is displayed
        When I select Choose who the exclusion is for option "Exclude another person" in add exclusion work flow
        When I click continue in add exclusion work flow page "Choose who the exclusion is for"
        Then I see Add an exclusion work flow page "Choose the person's role" is displayed
        When I select Choose the person's role option "<ExclusionRole>" in add exclusion work flow
        When I click continue in add exclusion work flow page "Choose the person's role"
        Then I see Add an exclusion work flow page "Find the person" is displayed
        When I search with text "<findPersonSearchWith>" in Find the person page of exclusion work flow
        Then I see following options returned to Select in Find person search result of exclusions work flow
            | Person              |
            | <findPersonResult1> |
        When I select Person "<findPersonResult1>" from Find person search result in exclusions work flow
        When I click continue in add exclusion work flow page "Find the person"
        Then I see Add an exclusion work flow page "Describe the exclusion" is displayed
        When I enter description "<ExclusionDescription>" in add exclusion Describe the exclusion page
        When I click continue in add exclusion work flow page "Describe the exclusion"
        Then I see Add an exclusion work flow page "Check your answers" is displayed
        Then I see Check your answers page has total 4 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                 | Answer                 |
            | Who is the exclusion for | Exclude another person |
            | What's the person's role | <ExclusionRole>        |
            | Person                   | <findPersonResult1>    |
            | Describe the exclusion   | <ExclusionDescription> |

        When I click button with label "Confirm exclusion" in add exclusion work Check your answers page
        # Then I see case details page displayed with tab "Role and access" selected
        Then I see case details page with message banner "You've added an exclusion."


        Examples:
            | Useridentifier     | Roles                                              | ExclusionRole | findPersonSearchWith | findPersonResult1  | findPersonResult2  | ExclusionDescription         |
            | IAC_CaseOfficer_R2 | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer | Judicial | user1 | judge_user1@gov.uk | judge_user2@gov.uk | Judicial role user exclusion |
# | IAC_Judge_WA_R2    | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker    | Legal Ops     | caseworker           | caseworker_user1@gov.uk | caseworker_user2@gov.uk | caseworker role user exclusion |
# | IAC_CaseOfficer_R2 | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer | Admin         | admin                | admin_user1@gov.uk      | admin_user2@gov.uk      | admin role user exclusion      |

    Scenario Outline: Exclusion with option "Exclude me" - "<Useridentifier>"
        Given I set MOCK with user "<Useridentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation |
            | IA           | Y           | ORGANISATION | 20001        |
            | SSCS         | Y           | ORGANISATION | 20001        |
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed
        When I click add link for role category "Exclusions" in case roles and access page

        Then I see Add an exclusion work flow page "Choose who the exclusion is for" is displayed
        When I select Choose who the exclusion is for option "Exclude me" in add exclusion work flow
        When I click continue in add exclusion work flow page "Choose who the exclusion is for"

        Then I see Add an exclusion work flow page "Describe the exclusion" is displayed
        When I enter description "<ExclusionDescription>" in add exclusion Describe the exclusion page
        When I click continue in add exclusion work flow page "Describe the exclusion"
        Then I see Add an exclusion work flow page "Check your answers" is displayed
        Then I see Check your answers page has total 2 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                 | Answer                 |
            | Who is the exclusion for | Exclude me             |
            | Describe the exclusion   | <ExclusionDescription> |

        When I click button with label "Confirm exclusion" in add exclusion work Check your answers page
        Then I see case details page with message banner "You've excluded yourself from a case."
           
        Examples:
            | Useridentifier  | Roles                                           | ExclusionDescription |
# | IAC_CaseOfficer_R2 | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer | Caseworker excluding me |
            | IAC_Judge_WA_R2 | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker | Judge excluding me |

    Scenario Outline: Delete exclusion
        Given I set MOCK with user "<Useridentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation |
            | IA           | Y           | ORGANISATION | 20001        |
            | SSCS         | Y           | ORGANISATION | 20001        |
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed
        When I click delete link at row 1 for exclusion in roles and access page

        Then I see delete exclusion page with header "Check your answers" and caption "Delete an exclusion"
        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers without change link
            | Question               | Answer           |
            | Person                 | judge 1          |
            | Descrive the exclusion | Test exclusion 1 |
            | Added                  | -5               |


        Given I set MOCK api method "get" endpoint "/data/internal/cases/1602078503323954" with error response code 404
        Given I restart MockApp

        When I click button with label "Delete exclusion" in add exclusion work Check your answers page
        Then I see case details page with message banner "You've deleted an exclusion."

        Examples:
            | Useridentifier  | Roles                                           | ExclusionDescription |
# | IAC_CaseOfficer_R2 | caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer | Caseworker excluding me |
            | IAC_Judge_WA_R2 | caseworker-ia,caseworker-ia-iacjudge,caseworker-ia,caseworker | Judge excluding me |

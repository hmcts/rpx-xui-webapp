@ng @wa2 @wa 
Feature: WA Release 2: My cases - Manage links

    Background: Mock and browser setup
        Given I init MockApp
       

    Scenario Outline:  My cases, colums and column links for "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,case-allocator,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | roleName|baseLocation |
            | IA           | Y           | ORGANISATION |case-allocator |20001        |
            | SSCS | Y | ORGANISATION | case-allocator | 20001 |

 
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | caseType | substantive | roleType | caseId           |
            | IA           | Asylum   | Y           | CASE     | 1234567812345670 |
            | SSCS         | Asylum   | Y           | CASE     | 1234567812345671 |


        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "My work", I see selected tab page displayed
        When I navigate to My work sub navigation tab "My cases"

        Then I validate work allocation cases count in page 2

        Then I validate manage link actions for cases
            | index | actions           |
            | 1     | Reallocate,Remove |
            | 2    | Reallocate,Remove |

        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |


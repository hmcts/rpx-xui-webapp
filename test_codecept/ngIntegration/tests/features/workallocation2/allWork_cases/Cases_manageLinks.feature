@ng @wa2 @wa
Feature: WA Release 2: All work > cases - Manage links

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK workallocation cases with permissions for view "AllWorkCases"
            | Roles          | Count |
            | case-allocator | 10    |
            | case-allocator | 90    |
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
            | 12347 | IA Court Center 1  |

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

    Scenario Outline:  My cases, colums and column links for "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "IA" allow empty service
            | roleName    | task-supervisor |
            | substantive | Y               |

        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"
        Then I see all work cases not loaded and message displayed as "Please select filters and click Apply"

        Then I see filter "Person" is displayed in all work page
        When I enter find person search input "user1" in work flow

        Then I see find person search results in work flow
            | Person                       |
            | user1 j (judge_user1@gov.uk) |

        When I select find person result "user1 j (judge_user1@gov.uk)" in work flow
        When I click Apply filter button in all work page
        Then I validate work allocation cases count in page 25

        Then I validate manage link actions for cases
            | index | actions           |
            | 1     | Reallocate,Remove |
            | 12    | Reallocate,Remove |

        Examples:
            | UserIdentifier  | UserType | Roles                                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer,,task-supervisor |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor |


@ferdi @functional_debug

Feature: Hearings: Create a non-paper hearing case

  Background: Setup
    Given I init MockApp

  Scenario Outline: Set user with correct privileges
    Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "<roles>,caseworker-privatelaw,caseworker" with reference "userDetails"

    Given I set MOCK case "defaultCase" details with reference "PRLAPPS"
        # Given I set MOCK case details with reference "caseDetails"

    Given I set MOCK case list values
      | case_id          | case_fields.[CASE_REFERENCE] | case_fields_formatted.[CASE_REFERENCE] |
      | 1234567812345678 | 1234567812345678             | 1234567812345678                       |
      | 1234567812345679 | 1234567812345679             | 1234567812345679                       |

    Given I set MOCK case details "PRLAPPS" property "jurisdiction.id" as "PRIVATELAW"
    Given I set MOCK case details "PRLAPPS" property "case_type.id" as "PRLAPPS"

    Examples:
      | roles                                                                                     |
      | caseworker-privatelaw,caseworker-privatelaw-courtadmin,caseworker-privatelaw-judge        |

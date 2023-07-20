 @mockbrowser
Feature: Mock browser for debug


    Scenario: Primanry nav headers for user "<roleType>" "<useridentifier>" and roles "<rolesIdentifiers>"
        Given I set MOCK browser cookies
        Given I set debug browser user details
            | roles | caseworker, caseworker-ia,caseworker-ia-admin,task-supervisor,case-allocator |
            | roleCategory | LEGAL_OPERATIONS                                                 |

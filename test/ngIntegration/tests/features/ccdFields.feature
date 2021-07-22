@ng
Feature: Case fields

    Background: Mock event setup
        Given I init MockApp
        Given I create mock Case event "CaseFieldsProperties"
        Given I add page to event "CaseFieldsProperties"
            | reference | id    | label                 |
            | page1     | page1 | Page 1 for mock event |
        Given I add fields to page "page1" in event "CaseFieldsProperties"
            | id                       | type            | label                   |
            | text                     | Text            | Text                    |
            | postcode                 | Postcode        | Postcode                |
            | testArea                 | TextArea        | TextArea                |
            | number                   | Number          | Number                  |
            | radioYesNo               | YesOrNo         | YesOrNo                 |
            | email                    | Email           | Email                   |
            | phoneUK                  | PhoneUK         | PhoneUK                 |
            | date                     | Date            | Date                    |
            | dateTime                 | DateTime        | DateTime                |
            | moneyGBP                 | MoneyGBP        | MoneyGBP                |
            | dynamicList              | DynamicList     | DynamicList             |
            | fixedList                | FixedList       | FixedList               |
            | fixedRadioList           | FixedRadioList  | FixedRadioList          |
            | addressGlobalUK          | AddressGlobalUK | AddressGlobalUK         |
            | addressUK                | AddressUK       | AddressUK               |
            | caseLink                 | CaseLink        | CaseLink                |
            | organisation             | Organisation    | Organisation            |
            | multiselectList          | MultiSelectList | MultiSelectList         |
            | document                 | Document        | Document                |
            | complexTestField         | Complex         | Test complex field      |
            | complexTestField.text    | Text            | Textfield in complex    |
            | collectionTestField      | Collection      | Test collection field   |
            | collectionTestField.text | Text            | Textfield in collection |

        Given I set fixed list ietms to field "fixedList" in event "CaseFieldsProperties"
            | code  | label  |
            | item1 | Item 1 |
            | item2 | Item 2 |
            | item3 | Item 3 |
        Given I set fixed list ietms to field "fixedRadioList" in event "CaseFieldsProperties"
            | code  | label  |
            | item1 | Item 1 |
            | item2 | Item 2 |
            | item3 | Item 3 |
        Given I set fixed list ietms to field "multiselectList" in event "CaseFieldsProperties"
            | code  | label  |
            | item1 | Item 1 |
            | item2 | Item 2 |
            | item3 | Item 3 |


    Scenario Outline: Mandatory case field validation non complex fields  "<fieldId>""
        Given I set field properties for field with id "<fieldId>" in event "CaseFieldsProperties"
            | key             | value     |
            | display_context | MANDATORY |

        Given I set case event "CaseFieldsProperties" in mock

        Given I start MockApp
        Given I navigate page route "cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage"
        Then I see case edit page displayed
        When I click continue in case edit page
        Then I see validation error for field with id "<fieldId>"
        Then I see case event validation alert error summary messages
            | message             |
            | <validationMessage> |

        Examples:
            | fieldId             | fieldLabel            | validationMessage                 |
            | text                | Text                  | Text is required                  |
            | postcode            | Postcode              | Postcode is required              |
            | testArea            | TextArea              | TextArea is required              |
            | number              | Number                | Number is required                |
            | radioYesNo          | YesOrNo               | YesOrNo is required               |
            | email               | Email                 | Email is required                 |
            | phoneUK             | PhoneUK               | PhoneUK is required               |
            | date                | Date                  | Date is required                  |
            | dateTime            | DateTime              | DateTime is required              |
            | moneyGBP            | MoneyGBP              | MoneyGBP is not valid             |
            # | document            | Document           | Select or fill the required Document field |
            | caseLink            | CaseLink              | CaseLink is required              |
            # | dynamicList     |  DynamicList     | is required|
            | fixedList           | FixedList             | FixedList is required             |
            | fixedRadioList      | FixedRadioList        | FixedRadioList is required        |
            | multiselectList     | MultiSelectList       | MultiSelectList is required       |
            | collectionTestField | Test collection field | Test collection field is required |

    Scenario Outline: Mandatory case field validation complex fields  "<fieldId>""
        Given I set field properties for field with id "<fieldId>" in event "CaseFieldsProperties"
            | key             | value     |
            | display_context | MANDATORY |
        Given I set complex field overrides for case field "<fieldId>" in event "CaseFieldsProperties"
            | complex_field_element_id | display_context |
            | <complexElementId>       | MANDATORY       |

        Given I set case event "CaseFieldsProperties" in mock

        Given I start MockApp
        Given I navigate page route "cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage"
        Then I see case edit page displayed
        When I click continue in case edit page
        Then I see validation error for field with id "<fieldId>"
        Then I see case event validation alert error summary messages
            | message             |
            | <validationMessage> |

        Examples:
            | fieldId          | fieldLabel           | complexElementId                       | validationMessage                |
            | addressGlobalUK  | AddressGlobalUK      | addressGlobalUK.PostCode               | Building and Street is required  |
            | addressUK        | AddressUK            | addressUK.PostCode                     | Building and Street is required  |
            | organisation     | Organisation         | organisation.OrgPolicyCaseAssignedRole | Case Assigned Role is required   |
            | complexTestField | Textfield in complex | complexTestField.text                  | Textfield in complex is required |


@all
Feature: Case fields

    Background: Mock event setup
        Given I init MockApp
        Given I create mock Case event "CaseFieldsProperties"
        Given I add page to event "CaseFieldsProperties"
            | reference | id    | label                 |
            | page1     | page1 | Page 1 for mock event |
        Given I add fields to page "page1" in event "CaseFieldsProperties"
            | id              | type            | label           |
            | text            | Text            | Text            |
            | postcode        | Postcode        | Postcode        |
            | testArea        | TextArea        | TextArea        |
            | number          | Number          | Number          |
            | radioYesNo      | YesOrNo         | YesOrNo         |
            | email           | Email           | Email           |
            | phoneUK         | PhoneUK         | PhoneUK         |
            | date            | Date            | Date            |
            | dateTime        | DateTime        | DateTime        |
            | moneyGBP        | MoneyGBP        | MoneyGBP        |
            # | dynamicList     | DynamicList     | DynamicList     |
            | fixedList       | FixedList       | FixedList       |
            | fixedRadioList  | FixedRadioList  | FixedRadioList  |
            | addressGlobalUK | AddressGlobalUK | AddressGlobalUK |
            | addressUK       | AddressUK       | AddressUK       |
            | caseLink        | CaseLink        | CaseLink        |
            | organisation    | Organisation    | Organisation    |
            | multiselectList | MultiSelectList | MultiSelectList |
            | document        | Document        | Document        |
            |complexTestField|Complex|Test complex field|
            | complexTestField.text | Text | Textfield in complex  |
            | collectionTestField      | Collection | Test collection field   |
            | collectionTestField.text | Text | Textfield in collection |


        Given I set fixed list ietms to field "fixedList" in event "CaseFieldsProperties"
            |code|label|
            |item1|Item 1|
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


@test
    Scenario Outline: Mandatory case field validation "<fieldId>""
         
        Given I set field properties for field with id "<fieldId>" in event "CaseFieldsProperties"
            | key                       | value                   |
            | display_context | MANDATORY |
        Given I set case event "CaseFieldsProperties" in mock

        Given I start MockApp
        Given I navigate page route "cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage"
        Then I see case edit page displayed
        When I click continue in case edit page
        Then I see validation error for field with id "<fieldId>"
        Then I see case event error summary messages
            |message|
            | <fieldLabel> is required |

        Examples:
            | fieldId              | fieldLabel           |
            | text            |  Text            |
            | postcode        | Postcode        |
            | testArea        |  TextArea        |
            | number          |  Number          |
            | radioYesNo      |  YesOrNo         |
            | email           |  Email           |
            | phoneUK         | PhoneUK         |
            | date            |  Date            |
            | dateTime        | DateTime        |
            | moneyGBP        |  MoneyGBP        |
            # | dynamicList     |  DynamicList     |
            | fixedList       |  FixedList       |
            | fixedRadioList  |  FixedRadioList  |
            | addressGlobalUK |  AddressGlobalUK |
            | addressUK       |  AddressUK       |
            | caseLink        | CaseLink        |
            | organisation    |  Organisation    |
            | multiselectList |  MultiSelectList |
            | document        |  Document        |
            | complexTestField |  Test complex field |
            | collectionTestField |  Test complex field |
      
   
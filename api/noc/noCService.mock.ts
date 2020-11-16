import MockAdapter from 'axios-mock-adapter'
import * as faker from 'faker/locale/en_GB'
import { httpMock } from './httpMock'
import { NoCQuestion } from './models/noCQuestion.interface'

// random generator
export const generator = (schema, min = 1, max) => {
  max = max || min
  return Array.from({
    length: faker.random.number({
      min,
      // tslint:disable-next-line:object-literal-sort-keys
      max,
    }),
  }).map(() => {
    const innerGen = anySchema => Object.keys(anySchema).reduce((entity, key) => {
      if (anySchema[key] instanceof Array || anySchema[key] === null) {
        entity[key] = anySchema[key]
        return entity
      }
      if (Object.prototype.toString.call(anySchema[key]) === '[object Object]') {
        entity[key] = innerGen(anySchema[key])
        return entity
      }
      entity[key] = faker.fake(anySchema[key])
      return entity
    }, {})

    return innerGen(schema)
  })
}

export const init = () => {
  const mock = new MockAdapter(httpMock)

  // schema
  // tslint:disable:object-literal-sort-keys
  // tslint:disable:max-line-length
  const questionsSchema: NoCQuestion[] = [
    {
      case_type_id: 'AAT',
      order: '{{random.number}}',
      question_text: 'What is their first name?',
      answer_field_type: {
        id: 'Text',
        type: 'Text',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: '1',
      challenge_question_id: 'NoC',
      // tslint:disable-next-line:max-line-length
      answer_field: null,
      question_id: 'QuestionId{{random.number}}',
    },
    {
      case_type_id: 'AAT',
      order: '{{random.number}}',
      question_text: 'What is their last name?',
      answer_field_type: {
        id: 'Text',
        type: 'Text',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: '1',
      challenge_question_id: 'NoC',
      // tslint:disable-next-line:max-line-length
      answer_field: null,
      question_id: 'QuestionId{{random.number}}',
    },
    {
      case_type_id: 'AAT',
      order: '{{random.number}}',
      question_text: 'Do they have children?',
      answer_field_type: {
        id: 'YesOrNo',
        type: 'YesOrNo',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: '1',
      challenge_question_id: 'NoC',
      // tslint:disable-next-line:max-line-length
      answer_field: null,
      question_id: 'QuestionId{{random.number}}',
    },
    {
      case_type_id: 'AAT',
      order: '{{random.number}}',
      question_text: 'How many children do they have?',
      answer_field_type: {
        id: 'Number',
        type: 'Number',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: '1',
      challenge_question_id: 'NoC',
      answer_field: null,
      question_id: 'QuestionId{{random.number}}',
    },
    {
      case_type_id: 'AAT',
      order: '{{random.number}}',
      question_text: 'What is their telephone number?',
      answer_field_type: {
        id: 'PhoneUK',
        type: 'PhoneUK',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: '1',
      challenge_question_id: 'NoC',
      answer_field: null,
      question_id: 'QuestionId{{random.number}}',
    },
    {
      case_type_id: 'AAT',
      order: '{{random.number}}',
      question_text: 'What is their postcode?',
      answer_field_type: {
        id: 'Postcode',
        type: 'Postcode',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: '1',
      challenge_question_id: 'NoC',
      answer_field: null,
      question_id: 'QuestionId{{random.number}}',
    },
    {
      case_type_id: 'AAT',
      order: '{{random.number}}',
      question_text: 'What is their Email?',
      answer_field_type: {
        id: 'Email',
        type: 'Email',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: '1',
      challenge_question_id: 'NoC',
      // tslint:disable-next-line:max-line-length
      answer_field: null,
      question_id: 'QuestionId{{random.number}}',
    },
  ]
  // tslint:enable:object-literal-sort-keys
  // tslint:enable:max-line-length

  const getNoCQuestionsUrl = /\/api\/NoCQuestions\?caseId/
  const validateNoCQuestionsUrl = /\/api\/ValidateNoCQuestions/
  const postNoCEventsUrl = /\/api\/NoCEvents/

  // simulate some error if needed
  // mock.onGet(url).networkErrorOnce()
  // mock.onGet(getNoCQuestionsUrl).timeoutOnce()

  mock.onGet(getNoCQuestionsUrl).reply(() => {

    let questions = []

    questionsSchema.map(schema => {
      questions = [...questions, ...generator(schema, 1, 1)]
    })

    questions.sort((a, b) => a.order > b.order ? 1 : -1)

    // return an array in the form of [status, data, headers]
    return [
      200,
      questions,
    ]
  })
  // success
  .onPost(validateNoCQuestionsUrl).reply(200, {
      OrganisationPolicy: {
          Organisation: 'orgId',
      },
      status_message: 'success',
  })
  // EUI-2397: scenario 1
  // answers are incomplete/invalid
/*  .onPost(validateNoCQuestionsUrl).reply(400, {
    errorCode: 'answersIncomplete',
    errorMessage: 'Answers are incorrect and do not match system record.',
  })*/
  // EUI-2397: scenario 2
  // matched more than one party
/*  .onPost(validateNoCQuestionsUrl).reply(400, {
    errorCode: 'moreThanOneParty',
    errorMessage: 'Answers match more than one party on the case',
  })*/
  // EUI-2397: scenario 3
  // invalid case reference
/*  .onPost(validateNoCQuestionsUrl).reply(400, {
    errorCode: 'invalidCaseRef',
    errorMessage: 'invalid case reference',
  })*/
  // EUI-2397: scenario 4
  // organisation already has access to this case
/*  .onPost(validateNoCQuestionsUrl).reply(400, {
    errorCode: 'organisationHasAccess',
    errorMessage: 'Your organisation already has access to this case',
  })*/
  // EUI-2397: scenario 5
  // noc in progress
/*  .onPost(validateNoCQuestionsUrl).reply(400, {
      errorCode: 'nocInProgress',
      errorMessage: 'The case has an ongoing NoC Request',
  })*/
  .onPost(postNoCEventsUrl).reply(200, {
    approval_status: 'APPROVED',
    case_role: 'Claimant',
    status_message: 'success',
  })

}

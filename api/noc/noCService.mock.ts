import MockAdapter from 'axios-mock-adapter'
import * as faker from 'faker/locale/en_GB'
import {httpMock} from './httpMock'
import {NoCQuestion} from './models/noCQuestion.interface'

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

    const url = /\/api\/NoCQuestions\?caseId/

    // schema
    // tslint:disable:object-literal-sort-keys
    // tslint:disable:max-line-length
    const questionsSchema: NoCQuestion[] = [
        {
            case_type_id: 'AAT',
            order: '{{random.number}}',
            question_text: '{{hacker.phrase}}',
            answer_field_type: {
                id: "Number",
                type: "Number",
                min: null,
                max: null,
                regular_expression: null,
                fixed_list_items: [],
                complex_fields: [],
                collection_field_type: null,
            },
            display_context_parameter: "1",
            challenge_question_id: "NoC",
            answer_field: `{{name.findName}}|{{company.companyName}}|{{name.firstName}}:Applicant,{{name.findName}}|{{company.companyName}}|{{name.firstName}}:Respondent`,
            question_id: "QuestionId{{random.number}}",
        },
        {
            case_type_id: "AAT",
            order: '{{random.number}}',
            question_text: '{{hacker.phrase}}',
            answer_field_type: {
                id: "YesOrNo",
                type: "YesOrNo",
                min: null,
                max: null,
                regular_expression: null,
                fixed_list_items: [],
                complex_fields: [],
                collection_field_type: null,
            },
            display_context_parameter: "1",
            challenge_question_id: "NoC",
            // tslint:disable-next-line:max-line-length
            answer_field: `{{name.findName}}|{{company.companyName}}|{{name.firstName}}:Applicant,{{name.findName}}|{{company.companyName}}|{{name.firstName}}:Respondent`,
            question_id: "QuestionId{{random.number}}",
        },
        {
            case_type_id: "AAT",
            order: '{{random.number}}',
            question_text: "What's their Postcode?",
            answer_field_type: {
                id: "Email",
                type: "Email",
                min: null,
                max: null,
                regular_expression: null,
                fixed_list_items: [],
                complex_fields: [],
                collection_field_type: null,
            },
            display_context_parameter: "1",
            challenge_question_id: "NoC",
            // tslint:disable-next-line:max-line-length
            answer_field: `{{address.zipCode}}|{{address.zipCode}}|{{address.zipCode}}:Applicant,{{address.zipCode}}|{{address.zipCode}}|{{address.zipCode}}:Respondent`,
            question_id: "QuestionId{{random.number}}",
        },
    ]
    // tslint:enable:object-literal-sort-keys
    // tslint:enable:max-line-length

    // simulate some error if needed
    // mock.onGet(url).networkErrorOnce()
    mock.onGet(url).timeoutOnce()

    mock.onGet(url).reply(() => {

        let questions = []

        questionsSchema.map( schema => { questions = [...questions, ...generator(schema, 5, 20)] })

        questions.sort((a, b) => a.order > b.order ? 1 : -1 )

        // return an array in the form of [status, data, headers]
        return [
            200,
            questions,
        ]
    })

}

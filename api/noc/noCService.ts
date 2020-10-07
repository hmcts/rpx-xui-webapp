import {AxiosResponse} from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {http} from '../lib/http'
import * as log4jui from '../lib/log4jui'
import {EnhancedRequest, JUILogger} from '../lib/models'
import {setHeaders} from '../lib/proxy'
import * as faker from 'faker'

const logger: JUILogger = log4jui.getLogger('noc-service')

/**
 * Get NoC Questions
 *
 * @returns {Promise<AxiosResponse>}
 * @param noCPath
 * @param req
 */
export async function handleGet(noCPath: string, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('getting noc questions', noCPath)
        const headers = setHeaders(req)
        return await http.get(noCPath, {headers})
    } catch (e) {
        e.message ? logger.error(e.message) : logger.error('Error in get response')
        throw e
    }

}

/**
 * Post Redaction
 *
 * @param noCPath
 * @param body
 * @returns {Promise<AxiosResponse>}
 */
export async function handlePost(noCPath: string, body: any, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('posting redaction', noCPath)
        const headers = setHeaders(req)
        return await http.post(noCPath, body, {headers})
    } catch (e) {
        e.message ? logger.error(e.message) : logger.error('Error in post response')
        throw e
    }

}

export const mock = new MockAdapter(http)

const url = /\/api\/NoCQuestions\?caseId/
mock.onGet(url)
    .networkErrorOnce()
mock.onGet(url).reply(200, {
    "questions": [
    {
        "case_type_id": "AAT",
        "order": 1,
        "question_text": "What's the name of the party you wish to represent?",
        "answer_field_type": {
            "id": "Number",
            "type": "Number",
            "min": null,
            "max": null,
            "regular_expression": null,
            "fixed_list_items": [],
            "complex_fields": [],
            "collection_field_type": null
        },
        "display_context_parameter": "1",
        "challenge_question_id": "NoC",
        "answer_field": `
        ${applicant.individual.fullname}|${applicant.company.name}|${applicant.soletrader.name}:Applicant,
        ${respondent.individual.fullname}|${respondent.company.name}{|${respondent.soletrader.name}:Respondent`,
        "question_id": "QuestionId1"
    },
    {
        "case_type_id": "AAT",
        "order": 1,
        "question_text": "QuestionText3",
        "answer_field_type": {
            "id": "YesOrNo",
            "type": "YesOrNo",
            "min": null,
            "max": null,
            "regular_expression": null,
            "fixed_list_items": [],
            "complex_fields": [],
            "collection_field_type": null
        },
        "display_context_parameter": "1",
        "challenge_question_id": "NoC",
        "answer_field": `
        ${applicant.individual.fullname}|${applicant.company.name}|${applicant.soletrader.name}:Applicant,
        ${respondent.individual.fullname}|${respondent.company.name}{|${respondent.soletrader.name}:Respondent`,
        "question_id": "QuestionId3"
    },
    {
        "case_type_id": "AAT",
        "order": 1,
        "question_text": "What's their Postcode?",
        "answer_field_type": {
            "id": "Email",
            "type": "Email",
            "min": null,
            "max": null,
            "regular_expression": null,
            "fixed_list_items": [],
            "complex_fields": [],
            "collection_field_type": null
        },
        "display_context_parameter": "1",
        "challenge_question_id": "NoC",
        "answer_field": `
        ${applicant.individual.PostCode}|${applicant.company.PostCode}|${applicant.soletrader.PostCode}:Applicant,
        ${respondent.individual.PostCode}|${respondent.company.PostCode}|${respondent.soletrader.name:PostCode}:Respondent`,
        "question_id": "QuestionId2"
    },
],
})

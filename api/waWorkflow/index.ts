import { getConfigValue } from '../configuration';
import { SERVICES_WA_WORKFLOW_API_URL } from '../configuration/references';
import { NextFunction, Response } from 'express';
import { EnhancedRequest } from '../lib/models';
import { v4 as uuidv4 } from 'uuid';
import { http } from '../lib/http';
import { setHeaders } from '../lib/proxy';

export async function postCreateTask(req: EnhancedRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        const waWorkFlowApi = getConfigValue(SERVICES_WA_WORKFLOW_API_URL);
        const id = uuidv4();
        console.log('id is ', id)
        const url = `${waWorkFlowApi}/workflow/message`;
        const body = {
            messageName: 'createTaskMessage',
            processVariables: {
                idempotencyKey: {
                    value: id,
                    type: 'String'
                },
                'dueDate': {
                    'value': '2022-01-22T16:21:41.320086',
                    'type': 'String'
                },
                'jurisdiction': {
                    'value': req.body.jurisdiction,
                    'type': 'String'
                },
                'caseId': {
                    'value': req.body.caseId,
                    'type': 'String'
                },
                'name': {
                    'value': 'Process Application',
                    'type': 'String'
                },
                'taskType': {
                    'value': 'followUpOverdueRespondentEvidence',
                    'type': 'String'
                },
                'caseType': {
                    'value': req.body.caseType,
                    'type': 'String'
                }
            },
            'correlationKeys': null,
            'all': false
        }
        const headers = setHeaders(req);
        const response = await http.post(url, body, {headers});
        console.log('response.data', response.data)
        console.log('response.status', response.status)
        return res.status(response.status).send(response.data)
        } catch (error) {
        console.log(error)
        next(error);
        }
    }
  
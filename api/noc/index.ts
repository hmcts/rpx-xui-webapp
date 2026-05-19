import { NextFunction, Response } from 'express';
import { getConfigValue } from '../configuration';
import { SERVICES_CCD_CASE_ASSIGNMENT_API_PATH, SERVICES_PCS_NOC_API_PATH } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import { generateErrorMessageWithCode } from './errorCodeConverter';
import { NoCQuestions } from './models/noCQuestions.interface';
import { handleGet, handlePost } from './noCService';

const caseAssignmentUrl: string = getConfigValue(SERVICES_CCD_CASE_ASSIGNMENT_API_PATH);
const pcsNocUrl: string = getConfigValue(SERVICES_PCS_NOC_API_PATH);

/**
 * getNoCQuestions
 */
export async function getNoCQuestions(req: EnhancedRequest, res: Response, next: NextFunction) {
  const caseId = req.query.caseId;
  const pcsPath: string = `${pcsNocUrl}/noc/noc-questions?case_id=${caseId}`;
  const caseAssignmentPath: string = `${caseAssignmentUrl}/noc/noc-questions?case_id=${caseId}`;

  try {
    const { status, data }: { status: number; data: NoCQuestions } = await handleGetWithPcsFallback(
      pcsPath,
      caseAssignmentPath,
      req
    );
    res.status(status).send(data);
  } catch (error) {
    next(generateErrorMessageWithCode(error));
  }
}

export async function validateNoCQuestions(req: EnhancedRequest, res: Response, next: NextFunction) {
  const pcsPath: string = `${pcsNocUrl}/noc/verify-noc-answers`;
  const caseAssignmentPath: string = `${caseAssignmentUrl}/noc/verify-noc-answers`;
  const body: any = req.body;

  try {
    const { status, data }: { status: number; data: NoCQuestions } = await handlePostWithPcsFallback(
      pcsPath,
      caseAssignmentPath,
      body,
      req
    );
    res.status(status).send(data);
  } catch (error) {
    next(generateErrorMessageWithCode(error));
  }
}

export async function submitNoCEvents(req: EnhancedRequest, res: Response, next: NextFunction) {
  const pcsPath: string = `${pcsNocUrl}/noc/noc-requests`;
  const caseAssignmentPath: string = `${caseAssignmentUrl}/noc/noc-requests`;
  const body: any = req.body;

  try {
    const { status, data }: { status: number; data: NoCQuestions } = await handlePostWithPcsFallback(
      pcsPath,
      caseAssignmentPath,
      body,
      req
    );
    res.status(status).send(data);
  } catch (error) {
    next(generateErrorMessageWithCode(error));
  }
}

async function handleGetWithPcsFallback(pcsPath: string, caseAssignmentPath: string, req: EnhancedRequest) {
  try {
    return await handleGet(pcsPath, req);
  } catch (error) {
    if (shouldFallbackToCaseAssignment(error)) {
      return handleGet(caseAssignmentPath, req);
    }
    throw error;
  }
}

async function handlePostWithPcsFallback(
  pcsPath: string,
  caseAssignmentPath: string,
  body: any,
  req: EnhancedRequest
) {
  try {
    return await handlePost(pcsPath, body, req);
  } catch (error) {
    if (shouldFallbackToCaseAssignment(error)) {
      return handlePost(caseAssignmentPath, body, req);
    }
    throw error;
  }
}

function shouldFallbackToCaseAssignment(error: any): boolean {
  const status = error?.response?.status ?? error?.status;
  const code = error?.response?.data?.code ?? error?.data?.code;

  return status === 404 || code === 'case-not-found';
}

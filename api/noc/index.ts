import { NextFunction, Response } from 'express';
import { getConfigValue } from '../configuration';
import { DECENTRALISED_CASE_TYPE_CONFIG, SERVICES_CCD_CASE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import { generateErrorMessageWithCode } from './errorCodeConverter';
import { NoCQuestions } from './models/noCQuestions.interface';
import { handleGet, handlePost } from './noCService';
import { resolveDecentralisedCaseTypeConfig } from '../../shared/decentralised-case-type-config.util';

const caseAssignmentUrl: string = getConfigValue(SERVICES_CCD_CASE_ASSIGNMENT_API_PATH);
const NOC_CASE_TYPE_SESSION_KEY = 'nocCaseTypesByCaseId';

type DecentralisedCaseTypeConfig = {
  webUrl?: string;
  nocBaseUrl?: string;
};

type DecentralisedCaseTypeConfigMap = Record<string, DecentralisedCaseTypeConfig>;

/**
 * getNoCQuestions
 */
export async function getNoCQuestions(req: EnhancedRequest, res: Response, next: NextFunction) {
  const caseId = req.query.caseId;
  const caseAssignmentPath: string = buildNoCQuestionsPath(caseAssignmentUrl, caseId);

  try {
    const { status, data }: { status: number; data: NoCQuestions } = await handleGet(caseAssignmentPath, req);
    cacheNoCCaseType(req, caseId, data);
    res.status(status).send(data);
  } catch (error) {
    next(generateErrorMessageWithCode(error));
  }
}

export async function validateNoCQuestions(req: EnhancedRequest, res: Response, next: NextFunction) {
  const body = req.body;

  try {
    const baseUrl = getNoCBaseUrl(body?.case_id, req);
    const { status, data }: { status: number; data: NoCQuestions } = await handlePost(
      `${baseUrl}/noc/verify-noc-answers`,
      body,
      req
    );
    res.status(status).send(data);
  } catch (error) {
    next(generateErrorMessageWithCode(error));
  }
}

export async function submitNoCEvents(req: EnhancedRequest, res: Response, next: NextFunction) {
  const body = req.body;

  try {
    const baseUrl = getNoCBaseUrl(body?.case_id, req);
    const { status, data }: { status: number; data: NoCQuestions } = await handlePost(`${baseUrl}/noc/noc-requests`, body, req);
    res.status(status).send(data);
  } catch (error) {
    next(generateErrorMessageWithCode(error));
  }
}

function getNoCBaseUrl(caseId: unknown, req: EnhancedRequest): string {
  const caseType = getCachedNoCCaseType(req, caseId);
  if (!caseType) {
    return caseAssignmentUrl;
  }

  const decentralisedNocBaseUrl = getDecentralisedNoCBaseUrl(caseType);
  return decentralisedNocBaseUrl || caseAssignmentUrl;
}

function getDecentralisedNoCBaseUrl(caseType: string): string | null {
  const config = getDecentralisedCaseTypeConfig(caseType);
  if (!config?.nocBaseUrl) {
    return null;
  }

  return config.nocBaseUrl;
}

function getDecentralisedCaseTypeConfig(caseType: string): DecentralisedCaseTypeConfig | null {
  const caseTypeConfig = getConfigValue<DecentralisedCaseTypeConfigMap>(DECENTRALISED_CASE_TYPE_CONFIG);
  return resolveDecentralisedCaseTypeConfig({
    caseTypeConfig,
    caseType,
    urlKey: 'nocBaseUrl',
    urlLabel: 'NoC base URL',
  });
}

function buildNoCQuestionsPath(baseUrl: string, caseId: unknown): string {
  const searchParams = new URLSearchParams({ case_id: String(caseId) });
  return `${baseUrl}/noc/noc-questions?${searchParams.toString()}`;
}

function cacheNoCCaseType(req: EnhancedRequest, caseId: unknown, data: NoCQuestions): void {
  const caseIdKey = getCaseIdKey(caseId);
  const caseType = data?.questions?.[0]?.case_type_id;
  if (!req.session || !caseIdKey || !caseType) {
    return;
  }

  req.session[NOC_CASE_TYPE_SESSION_KEY] = {
    ...(isObject(req.session[NOC_CASE_TYPE_SESSION_KEY]) ? req.session[NOC_CASE_TYPE_SESSION_KEY] : {}),
    [caseIdKey]: caseType,
  };
}

function getCachedNoCCaseType(req: EnhancedRequest, caseId: unknown): string | null {
  const caseIdKey = getCaseIdKey(caseId);
  if (!req.session || !caseIdKey || !isObject(req.session[NOC_CASE_TYPE_SESSION_KEY])) {
    return null;
  }

  const caseType = req.session[NOC_CASE_TYPE_SESSION_KEY][caseIdKey];
  return typeof caseType === 'string' && caseType.trim().length > 0 ? caseType : null;
}

function getCaseIdKey(caseId: unknown): string | null {
  if (caseId === undefined || caseId === null) {
    return null;
  }

  const caseIdKey = String(caseId);
  return caseIdKey.length > 0 ? caseIdKey : null;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

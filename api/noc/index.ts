import { NextFunction, Response } from 'express';
import { getConfigValue } from '../configuration';
import { DECENTRALISED_CASE_TYPE_CONFIG, SERVICES_CCD_CASE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import { generateErrorMessageWithCode } from './errorCodeConverter';
import { NoCQuestions } from './models/noCQuestions.interface';
import { handleGet, handlePost } from './noCService';

const caseAssignmentUrl: string = getConfigValue(SERVICES_CCD_CASE_ASSIGNMENT_API_PATH);
const NOC_CASE_TYPE_SESSION_KEY = 'nocCaseTypesByCaseId';
const TEMPLATE_PLACEHOLDER = '%s';

type DecentralisedCaseTypeConfig = {
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
  const caseTypeConfig = getConfigValue<DecentralisedCaseTypeConfigMap>(DECENTRALISED_CASE_TYPE_CONFIG) || {};
  const configuredCaseType = getConfiguredCaseType(caseTypeConfig, caseType);
  if (!configuredCaseType) {
    return null;
  }

  const nocBaseUrl = caseTypeConfig[configuredCaseType].nocBaseUrl;
  return nocBaseUrl ? resolveUrl(nocBaseUrl, configuredCaseType, caseType) : null;
}

function buildNoCQuestionsPath(baseUrl: string, caseId: unknown): string {
  const searchParams = new URLSearchParams({ case_id: String(caseId) });
  return `${baseUrl}/noc/noc-questions?${searchParams.toString()}`;
}

function cacheNoCCaseType(req: EnhancedRequest, caseId: unknown, data: NoCQuestions): void {
  const caseType = data?.questions?.[0]?.case_type_id;
  if (!req.session || caseId === undefined || caseId === null || !caseType) {
    return;
  }

  const caseIdKey = String(caseId);
  if (!caseIdKey) {
    return;
  }

  const caseTypesByCaseId = req.session[NOC_CASE_TYPE_SESSION_KEY] || {};
  caseTypesByCaseId[caseIdKey] = caseType;
  req.session[NOC_CASE_TYPE_SESSION_KEY] = caseTypesByCaseId;
}

function getCachedNoCCaseType(req: EnhancedRequest, caseId: unknown): string | null {
  if (!req.session || caseId === undefined || caseId === null) {
    return null;
  }

  const caseType = req.session[NOC_CASE_TYPE_SESSION_KEY]?.[String(caseId)];
  return caseType || null;
}

function getConfiguredCaseType(caseTypeConfig: DecentralisedCaseTypeConfigMap, caseType: string): string | null {
  const lowerCaseType = caseType.toLowerCase();
  return (
    Object.keys(caseTypeConfig)
      .filter((configuredCaseType) => lowerCaseType.startsWith(configuredCaseType.toLowerCase()))
      .sort((first, second) => second.length - first.length)[0] || null
  );
}

function resolveUrl(url: string, configuredCaseType: string, caseType: string): string {
  let resolvedUrl = url.replace(TEMPLATE_PLACEHOLDER, caseType.substring(configuredCaseType.length));
  while (resolvedUrl.endsWith('/')) {
    resolvedUrl = resolvedUrl.slice(0, -1);
  }
  return resolvedUrl;
}

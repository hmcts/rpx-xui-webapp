import { Response } from 'express';

type ValidationError = {
  code: string;
  message: string;
};

const INVALID_REQUEST_CODE = 'WA_INVALID_REQUEST_BODY';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function getSearchRequest(body: unknown): Record<string, unknown> | null {
  if (!isPlainObject(body) || !isPlainObject(body.searchRequest)) {
    return null;
  }
  return body.searchRequest;
}

function validationError(message: string): ValidationError {
  return {
    code: INVALID_REQUEST_CODE,
    message,
  };
}

export function sendValidationError(res: Response, error: ValidationError): Response {
  return res.status(400).send(error);
}

export function validateSearchTaskBody(body: unknown): ValidationError | null {
  const searchRequest = getSearchRequest(body);
  if (!searchRequest) {
    return validationError('Invalid request payload: searchRequest object is required');
  }
  if (!Array.isArray(searchRequest.sorting_parameters)) {
    return validationError('Invalid request payload: searchRequest.sorting_parameters must be an array');
  }
  return null;
}

export function validateSearchForCompletableBody(body: unknown): ValidationError | null {
  const searchRequest = getSearchRequest(body);
  if (!searchRequest) {
    return validationError('Invalid request payload: searchRequest object is required');
  }
  if (searchRequest.ccdId === undefined || searchRequest.ccdId === null) {
    return validationError('Invalid request payload: searchRequest.ccdId is required');
  }
  if (typeof searchRequest.jurisdiction !== 'string' || !searchRequest.jurisdiction.trim()) {
    return validationError('Invalid request payload: searchRequest.jurisdiction must be a non-empty string');
  }
  if (typeof searchRequest.caseTypeId !== 'string' || !searchRequest.caseTypeId.trim()) {
    return validationError('Invalid request payload: searchRequest.caseTypeId must be a non-empty string');
  }
  if (typeof searchRequest.eventId !== 'string' || !searchRequest.eventId.trim()) {
    return validationError('Invalid request payload: searchRequest.eventId must be a non-empty string');
  }
  return null;
}

export function validateMyCasesBody(body: unknown): ValidationError | null {
  const searchRequest = getSearchRequest(body);
  if (!searchRequest) {
    return validationError('Invalid request payload: searchRequest object is required');
  }
  if (!Array.isArray(searchRequest.search_parameters)) {
    return validationError('Invalid request payload: searchRequest.search_parameters must be an array');
  }
  return null;
}

export function validateAllCasesBody(body: unknown): ValidationError | null {
  const searchRequest = getSearchRequest(body);
  if (!searchRequest) {
    return validationError('Invalid request payload: searchRequest object is required');
  }
  if (!Array.isArray(searchRequest.search_parameters)) {
    return validationError('Invalid request payload: searchRequest.search_parameters must be an array');
  }
  if (
    searchRequest.pagination_parameters !== undefined &&
    searchRequest.pagination_parameters !== null &&
    !isPlainObject(searchRequest.pagination_parameters)
  ) {
    return validationError('Invalid request payload: searchRequest.pagination_parameters must be an object');
  }
  return null;
}

export function validateGetUsersByServiceNameBody(body: unknown): ValidationError | null {
  if (!isPlainObject(body)) {
    return validationError('Invalid request payload: body must be an object');
  }
  if (!Array.isArray(body.services)) {
    return validationError('Invalid request payload: services must be an array');
  }
  return null;
}

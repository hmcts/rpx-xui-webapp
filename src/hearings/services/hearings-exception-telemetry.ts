import { ITelemetryItem } from '@microsoft/applicationinsights-web';
import { hearingTelemetryIdentifiers } from '../../../common/hearings/telemetry-correlation';

export const HEARINGS_OPERATIONS = [
  'getAllHearings',
  'loadHearingValues',
  'loadServiceLinkedCases',
  'loadLinkedCasesWithHearings',
  'loadCaseLinkingReasonCodes',
  'cancelHearingRequest',
  'loadHearingRequest',
  'submitHearingRequest',
  'updateHearingRequest',
  'getHearingActuals',
  'updateHearingActuals',
  'submitHearingActuals',
  'getLinkedHearingGroup',
  'postLinkedHearingGroup',
  'putLinkedHearingGroup',
  'deleteLinkedHearingGroup',
  'getListOfValues',
  'getCaseFlagsRefData',
  'getLocationById',
  'searchJudicialUserByPersonalCodes',
  'navigate',
  'browser',
] as const;
export type HearingsOperation = (typeof HEARINGS_OPERATIONS)[number];

/** Sanitize the SDK's serialized copy, never the original application exception. */
export function sanitizeHearingsException(item: ITelemetryItem): boolean {
  if (item.baseType !== 'ExceptionData' || item.baseData?.properties?.telemetryArea !== 'Hearings') {
    return true;
  }
  try {
    const properties = item.baseData.properties;
    const safeProperties = { ...hearingTelemetryIdentifiers(properties) };
    for (const key of [
      'telemetryArea',
      'operation',
      'journeyId',
      'journeyType',
      'step',
      'page',
      'httpStatus',
      'operationId',
      'operationParentId',
    ]) {
      if (properties[key] !== undefined) {
        safeProperties[key] = properties[key];
      }
    }
    const message = `${properties.operation} failed`;
    const exceptions = (item.baseData.exceptions || []).map((detail) => {
      const parsedStack = (detail.parsedStack || []).map((frame) => {
        const source = typeof frame.fileName === 'string' ? frame.fileName.split(/[?#]/)[0].split(/[\\/]/).pop() : '';
        const fileName = /^[\w.-]+\.(?:[cm]?js|ts)$/.test(source) ? source : '[redacted-location]';
        const method =
          fileName !== '[redacted-location]' && typeof frame.method === 'string' && /^[\w$.]+$/.test(frame.method)
            ? frame.method
            : 'anonymous';
        const line = Number.isSafeInteger(frame.line) && frame.line >= 0 ? frame.line : 0;
        const level = Number.isSafeInteger(frame.level) && frame.level >= 0 ? frame.level : 0;
        const column = typeof frame.assembly === 'string' ? frame.assembly.match(/:\d+:(\d+)\)?$/)?.[1] : undefined;
        return { level, method, fileName, line, assembly: `at ${method} (${fileName}:${line}${column ? `:${column}` : ''})` };
      });
      const typeName = [
        'Error',
        'TypeError',
        'RangeError',
        'ReferenceError',
        'SyntaxError',
        'URIError',
        'EvalError',
        'HttpErrorResponse',
      ].includes(detail.typeName)
        ? detail.typeName
        : 'Error';
      return {
        id: typeof detail.id === 'number' ? detail.id : undefined,
        outerId: typeof detail.outerId === 'number' ? detail.outerId : undefined,
        typeName,
        message,
        hasFullStack: parsedStack.length > 0,
        parsedStack,
        stack: [message, ...parsedStack.map((frame) => frame.assembly)].join('\n'),
      };
    });
    item.baseData = { ver: item.baseData.ver, exceptions, properties: safeProperties };
    item.data = {};
    if (item.ext?.trace) {
      item.ext.trace.name = properties.page || 'Hearings';
      if (typeof properties.operationId === 'string' && /^[a-f\d]{32}$/i.test(properties.operationId)) {
        item.ext.trace.traceID = properties.operationId;
      }
      if (typeof properties.operationParentId === 'string' && /^[a-f\d]{16}$/i.test(properties.operationParentId)) {
        item.ext.trace.parentID = properties.operationParentId;
      }
    }
    return true;
  } catch {
    // Fail closed if the SDK supplies an unexpected shape; never send an unredacted exception.
    return false;
  }
}

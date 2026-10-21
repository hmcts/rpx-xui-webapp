import { sanitizeHearingsException } from './hearings-exception-telemetry';

describe('Hearings exception privacy filter', () => {
  it('should retain stack frames, line/column numbers and HTTP status without private message/response data', () => {
    const item = {
      name: 'test',
      baseType: 'ExceptionData',
      data: { response: 'private-response' },
      baseData: {
        properties: {
          telemetryArea: 'Hearings',
          operation: 'loadHearingRequest',
          page: '/hearings/request/hearing-stage',
          httpStatus: 406,
          caseId: '1234567890123456',
          hearingId: '20000001',
          jurisdiction: 'SSCS',
          caseName: 'private-name',
          formValue: 'private-value',
          response: 'private-response',
        },
        exceptions: [
          {
            typeName: 'HttpErrorResponse',
            message: 'private-case private-name',
            stack: 'private-stack-header',
            parsedStack: [
              {
                level: 0,
                method: 'HearingComponent.submit',
                fileName: 'https://host/main.js?caseId=private-case#private-name',
                line: 42,
                assembly: 'at HearingComponent.submit (https://host/main.js?caseId=private-case:42:7)',
              },
              { level: 1, method: 'private-name', fileName: '/cases/private-case', line: 10, assembly: 'private-response' },
            ],
          },
        ],
      },
      ext: { trace: { name: '/hearings/private-hearing' } },
    };
    sanitizeHearingsException(item);
    expect(item.baseData.properties.httpStatus).toBe(406);
    expect(item.baseData.properties as Record<string, unknown>).toEqual({
      telemetryArea: 'Hearings',
      operation: 'loadHearingRequest',
      page: '/hearings/request/hearing-stage',
      httpStatus: 406,
      caseId: '1234567890123456',
      hearingId: '20000001',
      jurisdiction: 'SSCS',
    });
    expect(item.baseData.exceptions[0].parsedStack[0]).toEqual({
      level: 0,
      method: 'HearingComponent.submit',
      fileName: 'main.js',
      line: 42,
      assembly: 'at HearingComponent.submit (main.js:42:7)',
    });
    expect(item.ext.trace.name).toBe('/hearings/request/hearing-stage');
    expect(JSON.stringify(item)).not.toContain('private-');
  });

  it('should leave exceptions outside Hearings unchanged', () => {
    const item = { name: 'test', baseType: 'ExceptionData', baseData: { properties: {}, exceptions: [{ message: 'original' }] } };
    const before = JSON.stringify(item);
    sanitizeHearingsException(item);
    expect(JSON.stringify(item)).toBe(before);
  });

  it('should reject malformed Hearings exception payloads instead of sending private data', () => {
    const item = {
      name: 'test',
      baseType: 'ExceptionData',
      baseData: { properties: { telemetryArea: 'Hearings', operation: 'navigate' }, exceptions: 'private-response' },
    };
    expect(sanitizeHearingsException(item)).toBeFalse();
  });

  it('should restore the originating native operation IDs rather than the current SDK context', () => {
    const item = {
      name: 'test',
      baseType: 'ExceptionData',
      baseData: {
        properties: {
          telemetryArea: 'Hearings',
          operation: 'navigate',
          operationId: 'a'.repeat(32),
          operationParentId: 'b'.repeat(16),
          page: '/hearings/request',
        },
        exceptions: [],
      },
      ext: { trace: { name: '/cases/private-case', traceID: 'c'.repeat(32), parentID: 'd'.repeat(16) } },
    };
    expect(sanitizeHearingsException(item)).toBeTrue();
    expect(item.ext.trace).toEqual({ name: '/hearings/request', traceID: 'a'.repeat(32), parentID: 'b'.repeat(16) });
  });
});

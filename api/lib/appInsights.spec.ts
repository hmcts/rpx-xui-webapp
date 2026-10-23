import { expect } from 'chai';
import 'mocha';
import { fineGrainedSampling, redactTelemetryIdentifiers } from './appInsights';

describe('Application Insights telemetry processor', () => {
  it('redacts access-token query values from remote dependency data', () => {
    const accessToken = 'PRIVATE_ACCESS_TOKEN';
    const dependency: any = {
      data: {
        baseType: 'RemoteDependencyData',
        baseData: { data: `https://wa.example/users?access_token=${accessToken}` },
      },
    };

    expect(fineGrainedSampling(dependency)).to.equal(true);
    expect(dependency.data.baseData.data).to.equal('https://wa.example/users?access_token=[REDACTED]');
    expect(dependency.data.baseData.data).not.to.contain(accessToken);
  });

  it('redacts access-token values before identifier query values', () => {
    const accessToken = 'PRIVATE_ACCESS_TOKEN';
    const caseId = 'PRIVATE_CASE_ID';
    const dependency: any = {
      data: {
        baseType: 'RemoteDependencyData',
        baseData: {
          data: `https://wa.example/users?access_token=${accessToken}&case_id=${caseId}`,
        },
      },
    };

    expect(fineGrainedSampling(dependency)).to.equal(true);
    expect(dependency.data.baseData.data).to.equal('https://wa.example/users?access_token=[REDACTED]&case_id=[REDACTED]');
    expect(dependency.data.baseData.data).not.to.contain(accessToken);
    expect(dependency.data.baseData.data).not.to.contain(caseId);
  });

  it('redacts identifiers from telemetry fields without masking static task endpoints', () => {
    const taskId = 'PRIVATE_TASK_ID';
    const caseId = 'PRIVATE_CASE_ID';
    const eventId = 'PRIVATE_EVENT_ID';
    const dependency: any = {
      data: {
        baseType: 'RemoteDependencyData',
        baseData: {
          data: `https://wa.example/task/${taskId}/assign?taskId=${taskId}`,
          name: `POST /task/${taskId}/assign`,
          properties: { taskId },
        },
      },
    };
    const request: any = {
      data: {
        baseType: 'RequestData',
        baseData: {
          url: `https://wa.example/case/tasks/${caseId}/event/${eventId}/caseType/Case/jurisdiction/IA`,
          properties: { caseId, eventId },
        },
      },
    };
    const trace: any = {
      data: {
        baseType: 'MessageData',
        baseData: {
          message: `Work Allocation failed caseId: ${caseId} eventId=${eventId}`,
          properties: { caseId, eventId },
        },
      },
    };
    const staticEndpoint: any = {
      data: {
        baseType: 'RemoteDependencyData',
        baseData: { name: 'POST /task/search-for-completable', data: '/task/task-types?jurisdiction=IA' },
      },
    };

    expect(fineGrainedSampling(dependency)).to.equal(true);
    expect(fineGrainedSampling(request)).to.equal(true);
    expect(fineGrainedSampling(trace)).to.equal(true);
    expect(fineGrainedSampling(staticEndpoint)).to.equal(true);
    expect(JSON.stringify([dependency, request, trace])).not.to.contain(taskId);
    expect(JSON.stringify([dependency, request, trace])).not.to.contain(caseId);
    expect(JSON.stringify([dependency, request, trace])).not.to.contain(eventId);
    expect(dependency.data.baseData.data).to.contain('/task/[REDACTED]/assign');
    expect(request.data.baseData.url).to.contain('/case/tasks/[REDACTED]/event/[REDACTED]');
    expect(staticEndpoint.data.baseData.name).to.equal('POST /task/search-for-completable');
    expect(staticEndpoint.data.baseData.data).to.equal('/task/task-types?jurisdiction=IA');
  });

  it('redacts IDAM actor identifiers from Application Insights dependency fields', () => {
    const actorId = 'PRIVATE-IDAM-ACTOR-ID-CANARY';
    const dependency: any = {
      data: {
        baseType: 'RemoteDependencyData',
        baseData: {
          data: `https://role-assignment.example/am/role-assignments/actors/${actorId}`,
          name: `GET /am/role-assignments/actors/${actorId}`,
          url: `https://role-assignment.example/am/role-assignments/actors/${actorId}`,
        },
      },
    };

    expect(fineGrainedSampling(dependency)).to.equal(true);
    expect(JSON.stringify(dependency)).not.to.contain(actorId);
    expect(dependency.data.baseData.data).to.equal('https://role-assignment.example/am/role-assignments/actors/[REDACTED]');
    expect(dependency.data.baseData.name).to.equal('GET /am/role-assignments/actors/[REDACTED]');
    expect(dependency.data.baseData.url).to.equal('https://role-assignment.example/am/role-assignments/actors/[REDACTED]');
  });

  it('redacts existing hearing identifiers from shared dependency telemetry', () => {
    const hearingId = 'PRIVATE_HEARING_ID';
    const sessionId = 'PRIVATE_SESSION_ID';
    const dependency: any = {
      data: {
        baseType: 'RemoteDependencyData',
        baseData: {
          data: `https://hmc.example/hearings/${hearingId}`,
          name: `GET /hearingActuals/${hearingId}`,
          url: `https://hmc.example/hearingActualsCompletion/${hearingId}`,
          message: `POST /hearings/sessions/${sessionId}`,
        },
      },
    };

    expect(fineGrainedSampling(dependency)).to.equal(true);
    expect(JSON.stringify(dependency)).not.to.contain(hearingId);
    expect(JSON.stringify(dependency)).not.to.contain(sessionId);
    expect(dependency.data.baseData.data).to.equal('https://hmc.example/hearings/[REDACTED]');
    expect(dependency.data.baseData.name).to.equal('GET /hearingActuals/[REDACTED]');
    expect(dependency.data.baseData.url).to.equal('https://hmc.example/hearingActualsCompletion/[REDACTED]');
    expect(dependency.data.baseData.message).to.equal('POST /hearings/sessions/[REDACTED]');
  });

  it('redacts linked hearing group identifiers from telemetry paths and fields', () => {
    const groupId = 'PRIVATE_HEARING_GROUP_ID';
    const dependency: any = {
      data: {
        baseType: 'RemoteDependencyData',
        baseData: {
          data: `https://hmc.example/linkedHearingGroup/${groupId}`,
          properties: { hearingGroupId: groupId },
        },
      },
    };

    expect(fineGrainedSampling(dependency)).to.equal(true);
    expect(JSON.stringify(dependency)).not.to.contain(groupId);
    expect(dependency.data.baseData.data).to.equal('https://hmc.example/linkedHearingGroup/[REDACTED]');
    expect(dependency.data.baseData.properties.hearingGroupId).to.equal('[REDACTED]');
  });

  it('redacts identifiers in nested exception messages and stacks', () => {
    const caseId = 'PRIVATE_EXCEPTION_CASE_ID';
    const exception: any = {
      data: {
        baseType: 'ExceptionData',
        baseData: {
          exceptions: [
            {
              message: `Failed caseId: ${caseId}`,
              stack: `Error: failed\n    at handler (/case/tasks/${caseId}/event/${caseId})`,
              parsedStack: [{ fileName: `/case/tasks/${caseId}/event/${caseId}` }],
            },
          ],
        },
      },
    };

    expect(fineGrainedSampling(exception)).to.equal(true);
    expect(exception.data.baseData.exceptions[0].message).to.equal('Failed caseId: [REDACTED]');
    expect(exception.data.baseData.exceptions[0].stack).to.contain('/case/tasks/[REDACTED]/event/[REDACTED]');
    expect(JSON.stringify(exception)).not.to.contain(caseId);
  });

  it('redacts caseRef fields from telemetry', () => {
    const caseRef = 'PRIVATE_CASE_REF';

    expect(redactTelemetryIdentifiers(`{"caseRef":"${caseRef}"}`)).to.equal('{"caseRef":"[REDACTED]"}');
  });

  it('redacts plural case_ids from dependency URLs and structured telemetry fields', () => {
    const firstCaseId = 'PRIVATE_CASE_ID_ONE';
    const secondCaseId = 'PRIVATE_CASE_ID_TWO';
    const dependency: any = {
      data: {
        baseType: 'RemoteDependencyData',
        baseData: {
          data: `https://ccd.example/case-assignments?CASE_IDS=${firstCaseId},${secondCaseId}&jurisdiction=IA`,
          message: `query={"CASE_IDS":["${firstCaseId}","${secondCaseId}"],"jurisdiction":"IA"}`,
          properties: { CASE_IDS: [firstCaseId, secondCaseId], jurisdiction: 'IA' },
        },
      },
    };

    expect(fineGrainedSampling(dependency)).to.equal(true);
    expect(dependency.data.baseData.data).to.equal('https://ccd.example/case-assignments?CASE_IDS=[REDACTED]&jurisdiction=IA');
    expect(dependency.data.baseData.message).not.to.contain(firstCaseId);
    expect(dependency.data.baseData.message).not.to.contain(secondCaseId);
    expect(dependency.data.baseData.message).to.contain('"jurisdiction":"IA"');
    expect(dependency.data.baseData.properties.CASE_IDS).to.equal('[REDACTED]');
    expect(dependency.data.baseData.properties.jurisdiction).to.equal('IA');
    expect(JSON.stringify(dependency)).not.to.contain(firstCaseId);
    expect(JSON.stringify(dependency)).not.to.contain(secondCaseId);
  });

  it('redacts the case identifier from case-details telemetry paths only', () => {
    const caseId = 'PRIVATE_CASE_DETAILS_ID';
    const expectedUrl = 'https://ccd.example/cases/case-details/IA/Asylum/[REDACTED]/events/submit?jurisdiction=IA&view=summary';
    const request: any = {
      data: {
        baseType: 'RequestData',
        baseData: {
          url: `https://ccd.example/cases/case-details/IA/Asylum/${caseId}/events/submit?jurisdiction=IA&view=summary`,
        },
      },
    };

    expect(redactTelemetryIdentifiers(request.data.baseData.url)).to.equal(expectedUrl);
    expect(fineGrainedSampling(request)).to.equal(true);
    expect(request.data.baseData.url).to.equal(expectedUrl);
    expect(JSON.stringify(request)).not.to.contain(caseId);
  });

  it('redacts case IDs of any length in the single-id case-details route and preserves its suffix', () => {
    for (const caseId of ['1234567890', '123456789012345', '1234567890123456', '12345678901234567']) {
      const request: any = {
        data: {
          baseType: 'RequestData',
          baseData: {
            url: `https://ccd.example/cases/case-details/${caseId}/tasks?view=summary#task-list`,
          },
        },
      };

      expect(fineGrainedSampling(request)).to.equal(true);
      expect(request.data.baseData.url).to.equal(
        'https://ccd.example/cases/case-details/[REDACTED]/tasks?view=summary#task-list'
      );
      expect(JSON.stringify(request)).not.to.contain(caseId);
      expect(redactTelemetryIdentifiers(`https://ccd.example/cases/case-details/${caseId}?tab=overview`)).to.equal(
        'https://ccd.example/cases/case-details/[REDACTED]?tab=overview'
      );
    }
  });
});

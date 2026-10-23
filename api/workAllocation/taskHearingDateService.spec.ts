import { expect } from 'chai';
import * as sinon from 'sinon';
import { mockReq } from 'sinon-express-mock';
import { Task } from './interfaces/task';
import { setTaskHearingDatesFromCases } from './taskHearingDateService';
import * as util from './util';

describe('setTaskHearingDatesFromCases', () => {
  let searchCases: sinon.SinonStub;
  const req = mockReq();
  const task = (id: string, caseId: string, caseType: string = 'PRLAPPS'): Task =>
    ({
      id,
      case_id: caseId,
      case_type_id: caseType,
      case_name: 'Task case name',
      due_date: '2026-10-21',
      assignee: 'user-1',
      next_hearing_date: '2020-01-01',
    }) as Task;
  const caseWithDate = (id: string, date: string) => ({
    id,
    case_data: { nextHearingDetails: { hearingDateTime: date } },
  });

  beforeEach(() => {
    searchCases = sinon.stub(util, 'searchCasesById');
  });

  afterEach(() => sinon.restore());

  it('replaces only the hearing date, matches cases by ID and deduplicates lookups', async () => {
    const tasks = [task('task-1', '1'), task('task-2', '2'), task('task-3', '1')];
    searchCases.resolves({ cases: [caseWithDate('2', '2026-11-02'), caseWithDate('1', '2026-11-01')] });

    const result = await setTaskHearingDatesFromCases(tasks, req);

    expect(searchCases.callCount).to.equal(1);
    expect(searchCases.firstCall.args[0]).to.equal('PRLAPPS');
    expect(searchCases.firstCall.args[1].native_es_query.query.terms.reference).to.deep.equal(['1', '2']);
    expect(searchCases.firstCall.args[2]).to.equal(req);
    expect(result).to.deep.equal(
      tasks.map((item) => ({
        ...item,
        next_hearing_date: item.case_id === '1' ? '2026-11-01' : '2026-11-02',
      }))
    );
    expect(tasks[0].next_hearing_date).to.equal('2020-01-01');
  });

  it('keeps lookups and dates separate for different case types', async () => {
    searchCases.withArgs('PRLAPPS').resolves({ cases: [caseWithDate('1', '2026-11-01')] });
    searchCases.withArgs('Asylum').resolves({ cases: [caseWithDate('1', '2026-12-01')] });

    const result = await setTaskHearingDatesFromCases([task('a', '1'), task('b', '1', 'Asylum')], req);

    expect(searchCases.callCount).to.equal(2);
    expect(result.map((item) => item.next_hearing_date)).to.deep.equal(['2026-11-01', '2026-12-01']);
  });

  it('leaves the date blank for missing dates, missing cases and missing case identifiers', async () => {
    searchCases.resolves({ cases: [{ id: '1', case_data: {} }, { id: '2' }] });
    const tasks = [task('a', '1'), task('b', '2'), task('c', '3'), task('d', null), task('e', '4', null)];

    const result = await setTaskHearingDatesFromCases(tasks, req);

    expect(result).to.deep.equal(tasks.map((item) => ({ ...item, next_hearing_date: null })));
    expect(searchCases.firstCall.args[1].native_es_query.query.terms.reference).to.deep.equal(['1', '2', '3']);
  });

  it('keeps tasks available when a CCD lookup fails and preserves successful dates', async () => {
    searchCases.withArgs('PRLAPPS').rejects(new Error('CCD unavailable'));
    searchCases.withArgs('Asylum').resolves({ cases: [caseWithDate('2', '2026-12-01')] });
    const tasks = [task('a', '1'), task('b', '2', 'Asylum')];

    const result = await setTaskHearingDatesFromCases(tasks, req);

    expect(result).to.deep.equal([
      { ...tasks[0], next_hearing_date: null },
      { ...tasks[1], next_hearing_date: '2026-12-01' },
    ]);
  });

  it('handles a null CCD response without using the task API date', async () => {
    searchCases.resolves(null);
    const result = await setTaskHearingDatesFromCases([task('a', '1')], req);
    expect(result[0].next_hearing_date).to.equal(null);
  });

  it('splits large case lists into batches of at most 200', async () => {
    searchCases.resolves({ cases: [] });
    const tasks = Array.from({ length: 201 }, (_, i) => task(String(i), String(i)));

    await setTaskHearingDatesFromCases(tasks, req);

    expect(searchCases.callCount).to.equal(2);
    expect(searchCases.firstCall.args[1].native_es_query.query.terms.reference.length).to.equal(200);
    expect(searchCases.secondCall.args[1].native_es_query.query.terms.reference).to.deep.equal(['200']);
  });

  it('does not call CCD for an empty task list', async () => {
    expect(await setTaskHearingDatesFromCases([], req)).to.deep.equal([]);
    expect(searchCases.called).to.equal(false);
  });
});

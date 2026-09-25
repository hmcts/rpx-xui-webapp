import { Params } from '@angular/router';
import { DecentralisedEvent } from './decentralised-event';

describe('DecentralisedEvent', () => {
  it('creates a general event for a case', () => {
    const event = DecentralisedEvent.forCase('E_ID', 'CT_ID', 'C_ID');
    expect(event.getEventId()).toEqual('E_ID');
    expect(event.getCaseType()).toEqual('CT_ID');
    expect(event.getAbsoluteUrl('http://localhost', 'USER_ID')).toEqual(
      'http://localhost/cases/C_ID/event/E_ID?expected_sub=USER_ID'
    );
  });

  it('creates a general event for a case with IDs that have characters to encode', () => {
    const event = DecentralisedEvent.forCase('E ID', 'CT ID', 'C ID');
    expect(event.getEventId()).toEqual('E ID');
    expect(event.getCaseType()).toEqual('CT ID');
    expect(event.getAbsoluteUrl('http://localhost', 'USER ID')).toEqual(
      'http://localhost/cases/C%20ID/event/E%20ID?expected_sub=USER+ID'
    );
  });

  it('creates a general event for a case with query parameters', () => {
    const queryParams = {
      QP1: 'QP1_V',
      QP2: 'QP2_V',
    } as Params;
    const event = DecentralisedEvent.forCase('E_ID', 'CT_ID', 'C_ID', queryParams);
    expect(event.getEventId()).toEqual('E_ID');
    expect(event.getCaseType()).toEqual('CT_ID');
    expect(event.getAbsoluteUrl('http://localhost', 'USER_ID')).toEqual(
      'http://localhost/cases/C_ID/event/E_ID?QP1=QP1_V&QP2=QP2_V&expected_sub=USER_ID'
    );
  });

  it('creates an event for creating a case', () => {
    const event = DecentralisedEvent.forCreateCase('E_ID', 'CT_ID', 'J_ID');
    expect(event.getEventId()).toEqual('E_ID');
    expect(event.getCaseType()).toEqual('CT_ID');
    expect(event.getAbsoluteUrl('http://localhost', 'USER_ID')).toEqual(
      'http://localhost/cases/case-create/J_ID/CT_ID/E_ID?expected_sub=USER_ID'
    );
  });

  it('creates an event for creating a case with IDs that have characters to encode', () => {
    const event = DecentralisedEvent.forCreateCase('E ID', 'CT ID', 'J ID');
    expect(event.getEventId()).toEqual('E ID');
    expect(event.getCaseType()).toEqual('CT ID');
    expect(event.getAbsoluteUrl('http://localhost', 'USER ID')).toEqual(
      'http://localhost/cases/case-create/J%20ID/CT%20ID/E%20ID?expected_sub=USER+ID'
    );
  });

  it('creates an event for creating a case with query parameters', () => {
    const queryParams = {
      QP1: 'QP1_V',
      QP2: 'QP2_V',
    } as Params;
    const event = DecentralisedEvent.forCreateCase('E_ID', 'CT_ID', 'J_ID', queryParams);
    expect(event.getEventId()).toEqual('E_ID');
    expect(event.getCaseType()).toEqual('CT_ID');
    expect(event.getAbsoluteUrl('http://localhost', 'USER_ID')).toEqual(
      'http://localhost/cases/case-create/J_ID/CT_ID/E_ID?QP1=QP1_V&QP2=QP2_V&expected_sub=USER_ID'
    );
  });
});

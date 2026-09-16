import { Params } from '@angular/router';
import { DecentralisedEvent } from './decentralised-event';
import { DecentralisedEventGuard } from './decentralised-event.guard';
import { DecentralisedRedirectService } from './decentralised-redirect.service';

describe('DecentralisedEventGuard', () => {
  let decentralisedEventGuard: DecentralisedEventGuard;

  let decentralisedRedirectService: any;
  const queryParams = {
    QP1: 'QP1_V',
    QP2: 'QP2_V',
  } as Params;

  beforeEach(() => {
    decentralisedRedirectService = jasmine.createSpyObj('decentralisedRedirectService', [
      'isDecentralisedEvent',
      'tryRedirectEvent',
    ]);

    decentralisedEventGuard = new DecentralisedEventGuard(decentralisedRedirectService);
  });

  describe('canActivate', () => {
    it('activates events that are not decentralised', () => {
      const route = {
        paramMap: new Map([['eid', 'E_ID']]),
      } as any;
      expect(decentralisedEventGuard.canActivate(route)).toBeTruthy();
      expect(decentralisedRedirectService.isDecentralisedEvent).toHaveBeenCalledWith('E_ID');
    });

    it('activates events that are decentralised but have no case type', () => {
      decentralisedRedirectService.isDecentralisedEvent.and.returnValue(true);
      const route = {
        paramMap: new Map([['eid', 'E_ID']]),
      } as any;
      expect(decentralisedEventGuard.canActivate(route)).toBeTruthy();
      expect(decentralisedRedirectService.isDecentralisedEvent).toHaveBeenCalledWith('E_ID');
    });

    it('activates events that are decentralised and have a case type but have no case ID or jurisdiction ID', () => {
      decentralisedRedirectService.isDecentralisedEvent.and.returnValue(true);
      const route = {
        paramMap: new Map([
          ['eid', 'E_ID'],
          ['ctid', 'CT_ID'],
        ]),
      } as any;
      expect(decentralisedEventGuard.canActivate(route)).toBeTruthy();
      expect(decentralisedRedirectService.isDecentralisedEvent).toHaveBeenCalledWith('E_ID');
    });

    it('does not activate events that are decentralised and have a case ID', () => {
      decentralisedRedirectService.isDecentralisedEvent.and.returnValue(true);
      const route = {
        paramMap: new Map([
          ['eid', 'E_ID'],
          ['ctid', 'CT_ID'],
          ['cid', 'C_ID'],
        ]),
        queryParams: queryParams,
      } as any;
      expect(decentralisedEventGuard.canActivate(route)).toBeFalsy();
      expect(decentralisedRedirectService.isDecentralisedEvent).toHaveBeenCalledWith('E_ID');
      expect(decentralisedRedirectService.tryRedirectEvent).toHaveBeenCalledWith(
        DecentralisedEvent.forCase('E_ID', 'CT_ID', 'C_ID', queryParams)
      );
    });

    it('does not activate events that are decentralised and have a case ID using case type from caseType', () => {
      decentralisedRedirectService.isDecentralisedEvent.and.returnValue(true);
      const route = {
        paramMap: new Map([
          ['eid', 'E_ID'],
          ['caseType', 'CT_ID'],
          ['cid', 'C_ID'],
        ]),
        queryParams: queryParams,
      } as any;
      expect(decentralisedEventGuard.canActivate(route)).toBeFalsy();
      expect(decentralisedRedirectService.isDecentralisedEvent).toHaveBeenCalledWith('E_ID');
      expect(decentralisedRedirectService.tryRedirectEvent).toHaveBeenCalledWith(
        DecentralisedEvent.forCase('E_ID', 'CT_ID', 'C_ID', queryParams)
      );
    });

    it('does not activate events that are decentralised and have a jurisdiction ID', () => {
      decentralisedRedirectService.isDecentralisedEvent.and.returnValue(true);
      const route = {
        paramMap: new Map([
          ['eid', 'E_ID'],
          ['ctid', 'CT_ID'],
          ['jid', 'J_ID'],
        ]),
        queryParams: queryParams,
      } as any;
      expect(decentralisedEventGuard.canActivate(route)).toBeFalsy();
      expect(decentralisedRedirectService.isDecentralisedEvent).toHaveBeenCalledWith('E_ID');
      expect(decentralisedRedirectService.tryRedirectEvent).toHaveBeenCalledWith(
        DecentralisedEvent.forCreateCase('E_ID', 'CT_ID', 'J_ID', queryParams)
      );
    });

    it('does not activate child events that are decentralised and have a jurisdiction ID', () => {
      decentralisedRedirectService.isDecentralisedEvent.and.returnValue(true);
      const route = {
        paramMap: new Map([
          ['eid', 'E_ID'],
          ['ctid', 'CT_ID'],
          ['jid', 'J_ID'],
        ]),
        queryParams: queryParams,
      } as any;
      expect(decentralisedEventGuard.canActivateChild(route)).toBeFalsy();
      expect(decentralisedRedirectService.isDecentralisedEvent).toHaveBeenCalledWith('E_ID');
      expect(decentralisedRedirectService.tryRedirectEvent).toHaveBeenCalledWith(
        DecentralisedEvent.forCreateCase('E_ID', 'CT_ID', 'J_ID', queryParams)
      );
    });
  });
});

import { TestBed } from '@angular/core/testing';

import { ExuiCaseSearchService } from './exui-case-search.service';

describe('ExuiCaseSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExuiCaseSearchService = TestBed.get(ExuiCaseSearchService);
    expect(service).toBeTruthy();
  });
});

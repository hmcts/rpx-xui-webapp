import { TestBed } from '@angular/core/testing';

import { ExuiOrganisationService } from './exui-organisation.service';

describe('ExuiOrganisationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExuiOrganisationService = TestBed.get(ExuiOrganisationService);
    expect(service).toBeTruthy();
  });
});

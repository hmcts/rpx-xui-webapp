import { SharedCase } from '../../../src/cases/models/case-share/case-share.module';
import { OrganisationModule } from '../../../src/cases/models/organisation/organisation.module';

export class DataBaseModule {
  organisations: OrganisationModule[];
  sharedCases: SharedCase[];
}

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceHearingValuesModel } from '../models/serviceHearingValues.model';
import * as fromHearingStore from '../store';

export class ServiceIdResolverResolve {
  public serviceId: string = '';

  constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>
  ) {}

  public getServiceId$(): Observable<string> {
    return this.hearingStore.pipe(select(fromHearingStore.getHearingValuesModel)).pipe(
      map((serviceHearingValuesModel: ServiceHearingValuesModel) => serviceHearingValuesModel && serviceHearingValuesModel.hmctsServiceID ? serviceHearingValuesModel.hmctsServiceID : '')
    );
  }
}

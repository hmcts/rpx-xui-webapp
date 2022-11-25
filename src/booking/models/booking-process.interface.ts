import { LocationByEPIMMSModel } from '@hmcts/rpx-xui-common-lib/lib/models/location.model';

export interface BookingProcess {
  selectedBookingOption: number;
  location: LocationByEPIMMSModel;
  selectedBookingLocationIds: [];
  selectedDateOption: number;
  startDate: Date;
  endDate: Date;
}

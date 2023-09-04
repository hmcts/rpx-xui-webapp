import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AbstractAppConfig } from '../../../app.config';
import { HttpService } from '../http';
import { AddressParser } from './address-parser';
import { AddressType } from './address-type.enum';
import * as i0 from "@angular/core";
import * as i1 from "../http";
import * as i2 from "../../../app.config";
export class AddressesService {
    constructor(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
    }
    getAddressesForPostcode(postcode) {
        return this.http
            .get(this.appConfig.getPostcodeLookupUrl()
            .replace('${postcode}', postcode), undefined, false)
            .pipe(map(res => res.results))
            .pipe(map(output => output.map(addresses => this.format(new AddressParser().parse(addresses[AddressType.DPA])))));
    }
    format(addressModel) {
        return this.formatAddressLines(this.shiftAddressLinesUp(addressModel));
    }
    formatAddressLines(addressModel) {
        ['AddressLine1', 'AddressLine2', 'AddressLine3', 'PostTown'].forEach(value => {
            addressModel[value] = this.toCapitalCase(addressModel[value]);
        });
        return addressModel;
    }
    shiftAddressLinesUp(addressModel) {
        if (addressModel.AddressLine2 === '') {
            addressModel.AddressLine2 = addressModel.AddressLine3;
            addressModel.AddressLine3 = '';
        }
        if (addressModel.AddressLine1 === '') {
            addressModel.AddressLine1 = addressModel.AddressLine2;
            addressModel.AddressLine2 = '';
        }
        return addressModel;
    }
    toCapitalCase(sentence) {
        sentence = sentence.toLowerCase();
        sentence.split(' ').forEach((value, index) => {
            sentence = sentence.replace(value, value.charAt(0).toUpperCase() + value.substr(1));
        });
        return sentence;
    }
}
AddressesService.ɵfac = function AddressesService_Factory(t) { return new (t || AddressesService)(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.AbstractAppConfig)); };
AddressesService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AddressesService, factory: AddressesService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddressesService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpService }, { type: i2.AbstractAppConfig }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzc2VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL3NlcnZpY2VzL2FkZHJlc3Nlcy9hZGRyZXNzZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFHbEQsTUFBTSxPQUFPLGdCQUFnQjtJQUUzQixZQUE2QixJQUFpQixFQUFtQixTQUE0QjtRQUFoRSxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQW1CLGNBQVMsR0FBVCxTQUFTLENBQW1CO0lBQzdGLENBQUM7SUFFTSx1QkFBdUIsQ0FBQyxRQUFnQjtRQUM3QyxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUU7YUFDdkMsT0FBTyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDO2FBQ3JELElBQUksQ0FDSCxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDekIsSUFBSSxDQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDbkUsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRU8sTUFBTSxDQUFDLFlBQTBCO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxZQUEwQjtRQUNuRCxDQUFDLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzRSxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxZQUEwQjtRQUNwRCxJQUFJLFlBQVksQ0FBQyxZQUFZLEtBQUssRUFBRSxFQUFFO1lBQ3BDLFlBQVksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztZQUN0RCxZQUFZLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztTQUNoQztRQUNELElBQUksWUFBWSxDQUFDLFlBQVksS0FBSyxFQUFFLEVBQUU7WUFDcEMsWUFBWSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO1lBQ3RELFlBQVksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVPLGFBQWEsQ0FBQyxRQUFnQjtRQUNwQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3pDLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RixDQUFDLENBQ0YsQ0FBQztRQUNGLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7O2dGQWhEVSxnQkFBZ0I7c0VBQWhCLGdCQUFnQixXQUFoQixnQkFBZ0I7dUZBQWhCLGdCQUFnQjtjQUQ1QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWJzdHJhY3RBcHBDb25maWcgfSBmcm9tICcuLi8uLi8uLi9hcHAuY29uZmlnJztcbmltcG9ydCB7IEFkZHJlc3NNb2RlbCB9IGZyb20gJy4uLy4uL2RvbWFpbi9hZGRyZXNzZXMnO1xuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICcuLi9odHRwJztcbmltcG9ydCB7IEFkZHJlc3NQYXJzZXIgfSBmcm9tICcuL2FkZHJlc3MtcGFyc2VyJztcbmltcG9ydCB7IEFkZHJlc3NUeXBlIH0gZnJvbSAnLi9hZGRyZXNzLXR5cGUuZW51bSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBZGRyZXNzZXNTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGh0dHA6IEh0dHBTZXJ2aWNlLCBwcml2YXRlIHJlYWRvbmx5IGFwcENvbmZpZzogQWJzdHJhY3RBcHBDb25maWcpIHtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBZGRyZXNzZXNGb3JQb3N0Y29kZShwb3N0Y29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBZGRyZXNzTW9kZWxbXT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQodGhpcy5hcHBDb25maWcuZ2V0UG9zdGNvZGVMb29rdXBVcmwoKVxuICAgICAgICAucmVwbGFjZSgnJHtwb3N0Y29kZX0nLCBwb3N0Y29kZSksIHVuZGVmaW5lZCwgZmFsc2UpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKHJlcyA9PiByZXMucmVzdWx0cykpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKG91dHB1dCA9PiBvdXRwdXQubWFwKGFkZHJlc3NlcyA9PlxuICAgICAgICAgIHRoaXMuZm9ybWF0KG5ldyBBZGRyZXNzUGFyc2VyKCkucGFyc2UoYWRkcmVzc2VzW0FkZHJlc3NUeXBlLkRQQV0pKVxuICAgICAgICApKVxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0KGFkZHJlc3NNb2RlbDogQWRkcmVzc01vZGVsKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0QWRkcmVzc0xpbmVzKHRoaXMuc2hpZnRBZGRyZXNzTGluZXNVcChhZGRyZXNzTW9kZWwpKTtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0QWRkcmVzc0xpbmVzKGFkZHJlc3NNb2RlbDogQWRkcmVzc01vZGVsKSB7XG4gICAgWydBZGRyZXNzTGluZTEnLCAnQWRkcmVzc0xpbmUyJywgJ0FkZHJlc3NMaW5lMycsICdQb3N0VG93biddLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgYWRkcmVzc01vZGVsW3ZhbHVlXSA9IHRoaXMudG9DYXBpdGFsQ2FzZShhZGRyZXNzTW9kZWxbdmFsdWVdKTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWRkcmVzc01vZGVsO1xuICB9XG5cbiAgcHJpdmF0ZSBzaGlmdEFkZHJlc3NMaW5lc1VwKGFkZHJlc3NNb2RlbDogQWRkcmVzc01vZGVsKSB7XG4gICAgaWYgKGFkZHJlc3NNb2RlbC5BZGRyZXNzTGluZTIgPT09ICcnKSB7XG4gICAgICBhZGRyZXNzTW9kZWwuQWRkcmVzc0xpbmUyID0gYWRkcmVzc01vZGVsLkFkZHJlc3NMaW5lMztcbiAgICAgIGFkZHJlc3NNb2RlbC5BZGRyZXNzTGluZTMgPSAnJztcbiAgICB9XG4gICAgaWYgKGFkZHJlc3NNb2RlbC5BZGRyZXNzTGluZTEgPT09ICcnKSB7XG4gICAgICBhZGRyZXNzTW9kZWwuQWRkcmVzc0xpbmUxID0gYWRkcmVzc01vZGVsLkFkZHJlc3NMaW5lMjtcbiAgICAgIGFkZHJlc3NNb2RlbC5BZGRyZXNzTGluZTIgPSAnJztcbiAgICB9XG4gICAgcmV0dXJuIGFkZHJlc3NNb2RlbDtcbiAgfVxuXG4gIHByaXZhdGUgdG9DYXBpdGFsQ2FzZShzZW50ZW5jZTogc3RyaW5nKSB7XG4gICAgc2VudGVuY2UgPSBzZW50ZW5jZS50b0xvd2VyQ2FzZSgpO1xuICAgIHNlbnRlbmNlLnNwbGl0KCcgJykuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgIHNlbnRlbmNlID0gc2VudGVuY2UucmVwbGFjZSh2YWx1ZSwgdmFsdWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB2YWx1ZS5zdWJzdHIoMSkpO1xuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIHNlbnRlbmNlO1xuICB9XG59XG4iXX0=
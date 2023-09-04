import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class OrganisationConverter {
    static toSimpleAddress(organisationModel) {
        let simpleAddress = '';
        if (organisationModel.addressLine1) {
            simpleAddress += `${organisationModel.addressLine1}<br>`;
        }
        if (organisationModel.addressLine2) {
            simpleAddress += `${organisationModel.addressLine2}<br>`;
        }
        if (organisationModel.addressLine3) {
            simpleAddress += `${organisationModel.addressLine3}<br>`;
        }
        if (organisationModel.townCity) {
            simpleAddress += `${organisationModel.townCity}<br>`;
        }
        if (organisationModel.county) {
            simpleAddress += `${organisationModel.county}<br>`;
        }
        if (organisationModel.country) {
            simpleAddress += `${organisationModel.country}<br>`;
        }
        if (organisationModel.postCode) {
            simpleAddress += `${organisationModel.postCode}<br>`;
        }
        return simpleAddress;
    }
    toSimpleOrganisationModel(organisationModel) {
        return {
            organisationIdentifier: organisationModel.organisationIdentifier,
            name: organisationModel.name,
            address: OrganisationConverter.toSimpleAddress(organisationModel)
        };
    }
}
OrganisationConverter.ɵfac = function OrganisationConverter_Factory(t) { return new (t || OrganisationConverter)(); };
OrganisationConverter.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OrganisationConverter, factory: OrganisationConverter.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OrganisationConverter, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pc2F0aW9uLWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvZG9tYWluL29yZ2FuaXNhdGlvbi9vcmdhbmlzYXRpb24tY29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSzNDLE1BQU0sT0FBTyxxQkFBcUI7SUFDeEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUM7UUFDOUQsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksaUJBQWlCLENBQUMsWUFBWSxFQUFFO1lBQUUsYUFBYSxJQUFJLEdBQUcsaUJBQWlCLENBQUMsWUFBWSxNQUFNLENBQUM7U0FBRTtRQUNqRyxJQUFJLGlCQUFpQixDQUFDLFlBQVksRUFBRTtZQUFFLGFBQWEsSUFBSSxHQUFHLGlCQUFpQixDQUFDLFlBQVksTUFBTSxDQUFDO1NBQUU7UUFDakcsSUFBSSxpQkFBaUIsQ0FBQyxZQUFZLEVBQUU7WUFBRSxhQUFhLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxZQUFZLE1BQU0sQ0FBQztTQUFFO1FBQ2pHLElBQUksaUJBQWlCLENBQUMsUUFBUSxFQUFFO1lBQUUsYUFBYSxJQUFJLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxNQUFNLENBQUM7U0FBRTtRQUN6RixJQUFJLGlCQUFpQixDQUFDLE1BQU0sRUFBRTtZQUFFLGFBQWEsSUFBSSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sTUFBTSxDQUFDO1NBQUU7UUFDckYsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7WUFBRSxhQUFhLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLE1BQU0sQ0FBQztTQUFFO1FBQ3ZGLElBQUksaUJBQWlCLENBQUMsUUFBUSxFQUFFO1lBQUUsYUFBYSxJQUFJLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxNQUFNLENBQUM7U0FBRTtRQUN6RixPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBRU0seUJBQXlCLENBQUMsaUJBQWlDO1FBQ2hFLE9BQU87WUFDTCxzQkFBc0IsRUFBRSxpQkFBaUIsQ0FBQyxzQkFBc0I7WUFDaEUsSUFBSSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDNUIsT0FBTyxFQUFFLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztTQUNsRSxDQUFDO0lBQ0osQ0FBQzs7MEZBbkJVLHFCQUFxQjsyRUFBckIscUJBQXFCLFdBQXJCLHFCQUFxQjt1RkFBckIscUJBQXFCO2NBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPcmdhbmlzYXRpb25WbSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29yZ2FuaXNhdGlvbic7XG5pbXBvcnQgeyBTaW1wbGVPcmdhbmlzYXRpb25Nb2RlbCB9IGZyb20gJy4vc2ltcGxlLW9yZ2FuaXNhdGlvbi5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcmdhbmlzYXRpb25Db252ZXJ0ZXIge1xuICBwcml2YXRlIHN0YXRpYyB0b1NpbXBsZUFkZHJlc3Mob3JnYW5pc2F0aW9uTW9kZWw6IE9yZ2FuaXNhdGlvblZtKTogc3RyaW5nIHtcbiAgICBsZXQgc2ltcGxlQWRkcmVzcyA9ICcnO1xuICAgIGlmIChvcmdhbmlzYXRpb25Nb2RlbC5hZGRyZXNzTGluZTEpIHsgc2ltcGxlQWRkcmVzcyArPSBgJHtvcmdhbmlzYXRpb25Nb2RlbC5hZGRyZXNzTGluZTF9PGJyPmA7IH1cbiAgICBpZiAob3JnYW5pc2F0aW9uTW9kZWwuYWRkcmVzc0xpbmUyKSB7IHNpbXBsZUFkZHJlc3MgKz0gYCR7b3JnYW5pc2F0aW9uTW9kZWwuYWRkcmVzc0xpbmUyfTxicj5gOyB9XG4gICAgaWYgKG9yZ2FuaXNhdGlvbk1vZGVsLmFkZHJlc3NMaW5lMykgeyBzaW1wbGVBZGRyZXNzICs9IGAke29yZ2FuaXNhdGlvbk1vZGVsLmFkZHJlc3NMaW5lM308YnI+YDsgfVxuICAgIGlmIChvcmdhbmlzYXRpb25Nb2RlbC50b3duQ2l0eSkgeyBzaW1wbGVBZGRyZXNzICs9IGAke29yZ2FuaXNhdGlvbk1vZGVsLnRvd25DaXR5fTxicj5gOyB9XG4gICAgaWYgKG9yZ2FuaXNhdGlvbk1vZGVsLmNvdW50eSkgeyBzaW1wbGVBZGRyZXNzICs9IGAke29yZ2FuaXNhdGlvbk1vZGVsLmNvdW50eX08YnI+YDsgfVxuICAgIGlmIChvcmdhbmlzYXRpb25Nb2RlbC5jb3VudHJ5KSB7IHNpbXBsZUFkZHJlc3MgKz0gYCR7b3JnYW5pc2F0aW9uTW9kZWwuY291bnRyeX08YnI+YDsgfVxuICAgIGlmIChvcmdhbmlzYXRpb25Nb2RlbC5wb3N0Q29kZSkgeyBzaW1wbGVBZGRyZXNzICs9IGAke29yZ2FuaXNhdGlvbk1vZGVsLnBvc3RDb2RlfTxicj5gOyB9XG4gICAgcmV0dXJuIHNpbXBsZUFkZHJlc3M7XG4gIH1cblxuICBwdWJsaWMgdG9TaW1wbGVPcmdhbmlzYXRpb25Nb2RlbChvcmdhbmlzYXRpb25Nb2RlbDogT3JnYW5pc2F0aW9uVm0pOiBTaW1wbGVPcmdhbmlzYXRpb25Nb2RlbCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9yZ2FuaXNhdGlvbklkZW50aWZpZXI6IG9yZ2FuaXNhdGlvbk1vZGVsLm9yZ2FuaXNhdGlvbklkZW50aWZpZXIsXG4gICAgICBuYW1lOiBvcmdhbmlzYXRpb25Nb2RlbC5uYW1lLFxuICAgICAgYWRkcmVzczogT3JnYW5pc2F0aW9uQ29udmVydGVyLnRvU2ltcGxlQWRkcmVzcyhvcmdhbmlzYXRpb25Nb2RlbClcbiAgICB9O1xuICB9XG59XG4iXX0=
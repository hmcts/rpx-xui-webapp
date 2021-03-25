import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Action, combineReducers, select, Store, StoreModule} from '@ngrx/store';
import { DxAddress, OrganisationContactInformation} from '../../organisation.model';
import {of} from 'rxjs';
import {OrganisationComponent} from './organisation.component';
import * as fromRoot from '../../../app/store';

const storeMock = {
  pipe: () => {
  },
  dispatch: (action: Action) => {
  }
};
let pipeSpy: jasmine.Spy;
let dispatchSpy: jasmine.Spy;

describe('OrganisationComponent', () => {

  let component: OrganisationComponent;
  let fixture: ComponentFixture<OrganisationComponent>;

  const dxAddress: DxAddress = {
    dxNumber: 'DX 4534234552',
    dxExchange: 'London',
  };

  const contactInformation: OrganisationContactInformation = {
    addressLine1: '23',
    addressLine2: '',
    addressLine3: '',
    townCity: 'Aldgate East',
    county: 'London',
    country: '',
    postCode: 'AT54RT',
    dxAddress: [dxAddress]
  };

  /**
   * Mock organisation data is representative of data returned from the Node layer.
   */
  const mockOrganisationDetails = {
    name: 'Luke Solicitors',
    organisationIdentifier: 'HAUN33E',
    contactInformation: [
      contactInformation,
    ],
    status: 'ACTIVE',
    sraId: 'SRA1298455554',
    sraRegulated: false,
    superUser: {
      firstName: 'Luke',
      lastName: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com'
    },
    paymentAccount: ['test']
  };

  beforeEach(() => {

    pipeSpy = spyOn(storeMock, 'pipe').and.returnValue(of(mockOrganisationDetails));
    dispatchSpy = spyOn(storeMock, 'dispatch');

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
        }),
      ],
      declarations: [OrganisationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
        OrganisationComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get the first Contact Information item from the Organisation Details.', () => {
    expect(component.getContactInformation(mockOrganisationDetails)).toEqual(mockOrganisationDetails.contactInformation[0]);
  });

  describe('getDxAddress', () => {

    it('should return null if there is no dxAddress.', () => {

      const orgContactInformation = {
        addressLine1: '23',
        addressLine2: null,
        addressLine3: null,
        townCity: 'Aldgate East',
        county: 'London',
        country: null,
        postCode: 'AT54RT',
      };

      expect(component.getDxAddress(orgContactInformation)).toBeNull();
    });

    it('should return null if the length of dxAddresses is 0.', () => {

      const orgContactInformation = {
        addressLine1: '23',
        postCode: 'AT54RT',
        dxAddress: []
      };

      expect(component.getDxAddress(orgContactInformation)).toBeNull();
    });

    it('should return dxAddress.', () => {

      const orgDxAddress = {
        dxNumber: 'DX 4534234552',
        dxExchange: 'London',
      };

      const orgContactInformation = {
        addressLine1: '23',
        postCode: 'AT54RT',
        dxAddress: [orgDxAddress]
      };

      expect(component.getDxAddress(orgContactInformation)).toEqual(orgDxAddress);
    });
  });

  describe('getPaymentAccount', () => {

    it('should return null if there is no paymentAccount.', () => {

      const organisationDetails = {};

      expect(component.getPaymentAccount(organisationDetails)).toBeNull();
    });

    it('should return null if the length of paymentAccount is 0.', () => {

      const organisationDetails = {
        paymentAccount: [],
      };

      expect(component.getPaymentAccount(organisationDetails)).toBeNull();
    });

    it('should return paymentAccount.', () => {

      const paymentAccount = ['PBA3344552', 'PBA7843345'];

      const organisationDetails = {
        paymentAccount,
      };

      expect(component.getPaymentAccount(organisationDetails)).toEqual(paymentAccount);
    });
  });

});

import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { ActualDayPartyModel, HearingActualsMainModel, PartyModel } from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { LovRefDataService } from '../../../services/lov-ref-data.service';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-hearing-actuals-view-edit-parties',
  styleUrls: ['./hearing-actuals-view-edit-parties.component.scss'],
  templateUrl: './hearing-actuals-view-edit-parties.component.html',
})
export class HearingActualsViewEditPartiesComponent implements OnInit, OnDestroy {

  public partyChannel: LovRefDataModel[];
  public hearingRole: LovRefDataModel[];

  public columns: string[] = [
    'First name',
    'Last name',
    'Role',
    'Attendance type',
    'Organisation (optional)',
    'Attendee representing',
    'Action',
  ];

  public partiesTable: FormGroup;

  public participants: any[] = [];

  public caseTitle = 'Jane Smith vs DWP';

  public hearingActuals: HearingActualsMainModel;

  private sub: Subscription;

  public id: string;

  public constructor(private readonly fb: FormBuilder,
                     private readonly hearingStore: Store<fromHearingStore.State>,
                     private readonly lovRefDataService: LovRefDataService,
                     private readonly route: ActivatedRoute,
                     private readonly renderer: Renderer2,
  ) {
    this.partiesTable = this.fb.group({
      parties: this.fb.array([])
    });
  }

  public get parties(): FormArray {
    return this.partiesTable.get('parties') as FormArray;
  }

  private static toActualParties(parties: { parties: PartyModel[] }, isParty: boolean): ActualDayPartyModel[] {
    return parties
      .parties
      .filter((party: any) => party.isParty === isParty)
      .map((party: any) => ({
        actualIndividualDetails: {
          firstName: party.firstName,
          lastName: party.lastName,
        },
        actualOrganisationDetails: {
          name: party.organisation
        },
        actualPartyId: party.partyId,
        didNotAttendFlag: false,
        partyChannelSubType: party.attendanceType,
        partyRole: party.role,
        representedParty: party.attendeeRepresenting,
      }));
  }

  public ngOnInit(): void {
    this.partyChannel = this.route.snapshot.data.partyChannel;
    this.hearingRole = this.route.snapshot.data.hearingRole;
    this.sub = combineLatest([this.hearingStore.select(fromHearingStore.getHearingActuals), this.route.paramMap])
      .pipe(
        filter(([state]: [HearingActualsStateData, ParamMap]) => !!state.hearingActualsMainModel),
        first()
      )
      .subscribe(([state, params]: [HearingActualsStateData, ParamMap]) => {
        this.id = params.get('id');
        this.hearingActuals = JSON.parse(JSON.stringify(state.hearingActualsMainModel));
        this.createForm(this.hearingActuals);
      });
  }

  public initiateForm(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      role: ['Please select'],
      attendanceType: ['Please select'],
      organisation: [''],
      attendeeRepresenting: ['Please select'],
      isParty: [false]
    });
  }

  public addRow($event: Event): void {
    $event.preventDefault();
    ($event.target as HTMLElement).blur();
    this.parties.push(this.initiateForm());
    setTimeout(() => {
      this.renderer.selectRootElement('tr:last-child input').focus();
    }, 100);
  }

  public removeRow($event: Event, index: number): void {
    $event.preventDefault();
    this.parties.removeAt(index);
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public submitForm(parties: { parties: PartyModel[] }): void {

    const participants = HearingActualsViewEditPartiesComponent.toActualParties(parties, true);
    const actualParties = HearingActualsViewEditPartiesComponent.toActualParties(parties, false);
    const hearingActuals = {
      ...this.hearingActuals.hearingActuals,
      actualHearingDays: [
        {
          ...this.hearingActuals.hearingActuals.actualHearingDays[0],
          actualDayParties: actualParties,
        }
      ],
      hearingPlanned: [
        {
          ...this.hearingActuals.hearingPlanned.plannedHearingDays[0],
          parties: participants
        }
      ]
    };
    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals
    }));
  }

  public getRole(value: string): string {
    const hearingRole = this.hearingRole.find(role => role.key === value);
    return hearingRole ? hearingRole.value_en : value;
  }

  private createForm(hearingActuals: HearingActualsMainModel): void {
    if (!hearingActuals.hearingActuals.actualHearingDays[0].actualDayParties.length) {
      hearingActuals.hearingActuals.actualHearingDays[0].actualDayParties.forEach((party: ActualDayPartyModel) => {
        this.participants.push({
          name: `${party.actualIndividualDetails.firstName} ${party.actualIndividualDetails.lastName}`,
          id: party.actualPartyId,
        });

        this.parties.push(this.fb.group({
          firstName: [party.actualIndividualDetails.firstName],
          lastName: [party.actualIndividualDetails.lastName],
          role: [party.partyRole],
          attendanceType: [party.partyChannelSubType],
          organisation: [party.actualOrganisationDetails.name],
          attendeeRepresenting: [party.actualPartyId],
          partyId: [party.actualPartyId],
          isParty: [true]
        }));
      });

    } else {
      hearingActuals.hearingPlanned.plannedHearingDays[0].parties.forEach(party => {
        this.participants.push({
          name: `${party.individualDetails.firstName} ${party.individualDetails.lastName}`,
          id: party.partyId,
        });

        this.parties.push(this.fb.group({
          firstName: [party.individualDetails.firstName],
          lastName: [party.individualDetails.lastName],
          role: [party.partyRole],
          attendanceType: [party.partyChannelSubType],
          organisation: [party.organisationDetails.name],
          attendeeRepresenting: [party.partyId],
          partyId: [party.partyId],
          isParty: [true]
        }));
      });
    }

    hearingActuals.hearingActuals.actualHearingDays.forEach(actualHearingDay => {

      actualHearingDay.actualDayParties.forEach(dayParty => {
        if (dayParty.didNotAttendFlag) {
          dayParty.partyChannelSubType = 'notAttending';
        }

        this.parties.push(this.fb.group({
          firstName: [dayParty.actualIndividualDetails.firstName],
          lastName: [dayParty.actualIndividualDetails.lastName],
          role: [dayParty.partyRole],
          attendanceType: [dayParty.partyChannelSubType],
          organisation: [dayParty.actualOrganisationDetails.name],
          attendeeRepresenting: [dayParty.representedParty],
          isParty: [false]
        }));
      });
    });

  }
}

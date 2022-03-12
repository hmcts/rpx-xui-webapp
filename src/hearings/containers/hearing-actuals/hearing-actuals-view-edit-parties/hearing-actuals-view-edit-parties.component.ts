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
  public hearingRoles: LovRefDataModel[] = [];
  public immutablePartyRoles: LovRefDataModel[] = [];
  public mutablePartyRoles: LovRefDataModel[] = [];

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
  public id: string;
  private sub: Subscription;

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

  private static toActualParties(parties: { parties: PartyModel[] }): ActualDayPartyModel[] {
    return parties
      .parties
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

  private static hasActualParties(hearingActuals: HearingActualsMainModel, immutablePartyRoles: LovRefDataModel[]): boolean {
    return hearingActuals.hearingActuals.actualHearingDays.length ? hearingActuals.hearingActuals.actualHearingDays[0].actualDayParties.some(
      (actualDayParty: ActualDayPartyModel) => immutablePartyRoles
        .map((partyRole: LovRefDataModel) => partyRole.key)
        .includes(actualDayParty.partyRole)
    ) : false;
  }

  public ngOnInit(): void {
    this.partyChannel = this.route.snapshot.data.partyChannel;
    this.hearingRoles = this.route.snapshot.data.hearingRole;
    this.sub = combineLatest([this.hearingStore.select(fromHearingStore.getHearingActuals), this.route.paramMap])
      .pipe(
        filter(([state]: [HearingActualsStateData, ParamMap]) => !!state.hearingActualsMainModel),
        first()
      )
      .subscribe(([state, params]: [HearingActualsStateData, ParamMap]) => {
        this.id = params.get('id');
        this.hearingActuals = JSON.parse(JSON.stringify(state.hearingActualsMainModel));
        this.setUpRoleLists();
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
    const actualParties = HearingActualsViewEditPartiesComponent.toActualParties(parties);
    const hearingActuals = {
      ...this.hearingActuals.hearingActuals,
      actualHearingDays: [
        {
          ...this.hearingActuals.hearingActuals.actualHearingDays[0],
          actualDayParties: actualParties,
        }
      ],
    };
    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals
    }));
  }

  public getRole(value: string): string {
    const hearingRole = this.hearingRoles.find(role => role.key === value);
    return hearingRole ? hearingRole.value_en : value;
  }

  private createForm(hearingActuals: HearingActualsMainModel): void {
    if (HearingActualsViewEditPartiesComponent.hasActualParties(hearingActuals, this.immutablePartyRoles)) {
      hearingActuals.hearingActuals.actualHearingDays[0].actualDayParties.forEach((party: ActualDayPartyModel) => {
        this.addActualParticipantsAndParties(party);
      });
    } else {
      hearingActuals.hearingPlanned.plannedHearingDays[0].parties.forEach((party: PartyModel) => {
        this.addParties(party);
      });
    }
  }

  private addActualParticipantsAndParties(party: ActualDayPartyModel) {
    if (party.partyRole === 'appellant' || party.partyRole === 'claimant') {
      this.participants.push({
        name: `${party.actualIndividualDetails.firstName} ${party.actualIndividualDetails.lastName}`,
        id: party.actualPartyId,
      });
    }
    this.parties.push(this.fb.group({
      firstName: [party.actualIndividualDetails.firstName],
      lastName: [party.actualIndividualDetails.lastName],
      role: [party.partyRole],
      attendanceType: [party.partyChannelSubType],
      organisation: [party.actualOrganisationDetails.name],
      attendeeRepresenting: [party.representedParty],
      partyId: [null],
      isParty: [party.partyRole === 'appellant' || party.partyRole === 'claimant']
    }));
  }

  private addParties(party: PartyModel) {
    if (party.partyId) {
      this.participants.push({
        name: `${party.individualDetails.firstName} ${party.individualDetails.lastName}`,
        id: party.partyId,
      });
    }
    this.parties.push(this.fb.group({
      firstName: [party.individualDetails.firstName],
      lastName: [party.individualDetails.lastName],
      role: [party.partyRole],
      attendanceType: [party.partyChannelSubType],
      organisation: [party.organisationDetails.name],
      attendeeRepresenting: [null],
      partyId: [party.partyId],
      isParty: [true]
    }));
  }

  private setUpRoleLists(): void {
    for (const role of this.hearingRoles) {
      if (role.key === 'appellant' || role.key === 'claimant') {
        this.immutablePartyRoles.push(role);
      } else {
        this.mutablePartyRoles.push(role);
      }
    }
  }
}

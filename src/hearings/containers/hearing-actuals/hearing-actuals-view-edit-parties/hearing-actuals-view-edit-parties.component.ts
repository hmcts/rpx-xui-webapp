import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {HearingActualsMainModel} from '../../../models/hearingActualsMainModel';
import {HearingActualsStateData} from '../../../models/hearingActualsStateData.model';
import {LovRefDataModel} from '../../../models/lovRefData.model';
import {LovRefDataService} from '../../../services/lov-ref-data.service';
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

  private hearingActuals: HearingActualsMainModel;

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

  public ngOnInit() {
    this.partyChannel = this.route.snapshot.data.partyChannel;
    this.hearingRole = this.route.snapshot.data.hearingRole;
    this.sub = this.hearingStore.select(fromHearingStore.getHearingActuals)
      .pipe(
        filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel)
      )
      .subscribe((state: HearingActualsStateData) => {
        // create new deep clone otherwise cannot modify model
        this.hearingActuals = JSON.parse(JSON.stringify(state.hearingActualsMainModel));
        this.createForm(this.hearingActuals);
      });
  }

  public get parties() {
    return this.partiesTable.get('parties') as FormArray;
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private createForm(hearingActuals: HearingActualsMainModel) {

    hearingActuals.hearingPlanned.plannedHearingDays[0].parties.forEach( party => {

      this.participants.push({
        name: `${party.individualDetails.firstName} ${party.individualDetails.lastName}`,
        id: party.partyId
      });

      this.parties.push(this.fb.group({
        firstName: [party.individualDetails.firstName],
        lastName: [party.individualDetails.lastName],
        role: [party.partyRole],
        attendanceType: [party.partyChannelSubType],
        organisation: [party.organisationDetails.name],
        attendeeRepresenting: [party.partyId],
        isParty: [true]
      }));
    });

    hearingActuals.hearingActuals.actualHearingDays.forEach( actualHearingDay => {

      actualHearingDay.actualDayParties.forEach( dayParty => {
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

  public getRole(value: string): string {
    const hearingRole = this.hearingRole.find( role => role.key === value);
    return hearingRole ? hearingRole.value_en : value;
  }
}

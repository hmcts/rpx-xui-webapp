import {Component, OnDestroy, OnInit} from '@angular/core';
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

  public partyChannelActuals: LovRefDataModel[];

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

  public participants: string[] = [];

  private hearingActuals: HearingActualsMainModel;

  private sub: Subscription;

  public constructor(private readonly fb: FormBuilder,
                     private readonly hearingStore: Store<fromHearingStore.State>,
                     private readonly lovRefDataService: LovRefDataService,
                     private readonly route: ActivatedRoute,
  ) {
    this.partiesTable = this.fb.group({
      parties: this.fb.array([])
    });
  }

  public ngOnInit() {
    this.partyChannelActuals = this.route.snapshot.data.partyChannelActual;
    this.sub = this.hearingStore.select(fromHearingStore.getHearingActuals)
      .pipe(
        filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel)
      )
      .subscribe((state: HearingActualsStateData) => {
        this.hearingActuals = state.hearingActualsMainModel;
        this.createForm(this.hearingActuals);
      });
  }

  public get parties() {
    return this.partiesTable.get('parties') as FormArray;
  }

  public initiateForm(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      role: [''],
      attendanceType: ['Please select'],
      organisation: [''],
      attendeeRepresenting: [''],
      isParty: [false]
    });
  }

  public addRow($event) {
    $event.preventDefault();
    this.parties.push(this.initiateForm());
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private createForm(hearingActuals: HearingActualsMainModel) {

    hearingActuals.hearingActuals.actualHearingDays[0].actualDayParties.forEach( dayParty => {
      this.participants.push(`${dayParty.actualIndividualDetails.firstName} ${dayParty.actualIndividualDetails.lastName}`);
      this.parties.push(this.fb.group({
        firstName: [dayParty.actualIndividualDetails.firstName],
        lastName: [dayParty.actualIndividualDetails.lastName],
        role: [dayParty.partyRole],
        attendanceType: [dayParty.partyChannelSubType],
        organisation: [dayParty.actualOrganisationDetails.name],
        attendeeRepresenting: [dayParty.representedParty],
        isParty: [true]
      }));
    });

    hearingActuals.hearingPlanned.plannedHearingDays[0].parties.forEach( party => {
      this.parties.push(this.fb.group({
        firstName: [party.individualDetails.firstName],
        lastName: [party.individualDetails.lastName],
        role: [party.partyRole],
        attendanceType: [party.partyChannelSubType],
        organisation: [party.organisationDetails.name],
        attendeeRepresenting: [party.partyId],
        isParty: [false]
      }));
    });

  }

  public submitForm($event) {
    $event.preventDefault();
    console.log(this.parties.value);
  }

}

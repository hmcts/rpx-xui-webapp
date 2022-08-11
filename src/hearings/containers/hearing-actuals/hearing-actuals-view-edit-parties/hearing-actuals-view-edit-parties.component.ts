import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { ActualDayPartyModel, HearingActualsMainModel, PartyModel } from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import { PartyRoleOnly } from '../../../models/hearings.enum';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { LovRefDataService } from '../../../services/lov-ref-data.service';
import * as fromHearingStore from '../../../store';
import { ValidatorsUtils } from '../../../utils/validators.utils';

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

  public form: FormGroup;
  public participants: any[] = [];
  public hearingActuals: HearingActualsMainModel;
  public caseTitle: string;
  public id: string;
  public submitted: boolean;
  public errors: any[] = [];
  private sub: Subscription;
  private formSub: Subscription;
  public window: any = window;

  public constructor(private readonly fb: FormBuilder,
                     private readonly validators: ValidatorsUtils,
                     private readonly hearingStore: Store<fromHearingStore.State>,
                     private readonly lovRefDataService: LovRefDataService,
                     private readonly route: ActivatedRoute,
                     private readonly renderer: Renderer2,
  ) {
    this.form = this.fb.group({
      parties: this.fb.array([], [Validators.maxLength(50)]),
    });
  }

  public get parties(): FormArray {
    return this.form.get('parties') as FormArray;
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

  private static displayMultipleErrors(errors: { [p: string]: string }) {
    const keys = Object.keys(errors);
    return keys
      .map((key: string) => errors[key])
      .map((error: string) => error.replace('Enter', ''))
      .reduce((acc: string, curr: string, index) => {
        const isLast = index === keys.length - 1;
        const isSecondLast = index === keys.length - 2;
        if (isLast) {
          return `${acc} and ${curr}.`;
        } else if (isSecondLast) {
          return `${acc} ${curr}`;
        } else {
          return `${acc} ${curr}, `;
        }
      }, 'Enter ');
  }

  private static isParty(party: any) {
    return party.partyRole === PartyRoleOnly.Appellant || party.partyRole === PartyRoleOnly.Claimant;
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
        this.caseTitle = this.hearingActuals.caseDetails.hmctsInternalCaseName;
        this.setUpRoleLists();
        this.createForm(this.hearingActuals);
        this.subscribeToFormChanges();
      });
  }

  public initiateForm(index: number): FormGroup {
    return this.fb.group({
      firstName: [null, [this.validators.mandatory('Enter first name')]],
      lastName: [null, [this.validators.mandatory('Enter last name')]],
      role: [null, [this.validators.mandatory('Enter party role')]],
      attendanceType: [null, [this.validators.mandatory('Enter attendance type')]],
      organisation: [null],
      attendeeRepresenting: [null, [this.validators.mandatory('Enter attendee representing')]],
      isParty: [false]
    }, { validator: this.validators.validateDuplicateEntries(index, 'Participant details already entered.') });
  }

  public addRow($event: Event): void {
    this.errors = [];
    $event.preventDefault();
    ($event.target as HTMLElement).blur();
    const index = this.parties.length;
    this.parties.push(this.initiateForm(index));
    setTimeout(() => {
      this.renderer.selectRootElement('tr:last-child input').focus();
    }, 100);
  }

  public rowHasErrors(index: number): boolean {
    return this.parties.controls[index].invalid;
  }

  public displayRowErrors(index: number): string {
    const errors = this.getAllRowErrors((this.parties.controls[index] as FormGroup).controls);
    if (!errors) {
      return '';
    }
    const keys = Object.keys(errors);
    if (!keys.length) {
      return null;
    }
    if (keys.length === 1) {
      return errors[keys[0]];
    }
    return HearingActualsViewEditPartiesComponent.displayMultipleErrors(errors);
  }

  public highlightRowError(index: number, error: string): boolean {
    const controls = (this.parties.controls[index] as FormGroup).controls;
    return this.submitted && controls[error].invalid;
  }

  public removeRow($event: Event, index: number): void {
    $event.preventDefault();
    this.errors = [];
    this.parties.removeAt(index);
  }

  public ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }

  public submitForm(parties: { parties: PartyModel[] }, valid: boolean): void {
    this.submitted = true;
    if (!valid) {
      this.displayErrors();
      return;
    }
    if (valid) {
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
    if (HearingActualsViewEditPartiesComponent.isParty(party)) {
      this.participants.push({
        name: `${party.actualIndividualDetails.firstName} ${party.actualIndividualDetails.lastName}`,
        id: party.actualPartyId,
      });
    }
    this.parties.push(this.fb.group({
      firstName: [party.actualIndividualDetails.firstName, [this.validators.mandatory('Enter first name')]],
      lastName: [party.actualIndividualDetails.lastName, HearingActualsViewEditPartiesComponent.isParty(party) ? [] : [this.validators.mandatory('Enter last name')]],
      role: [party.partyRole, HearingActualsViewEditPartiesComponent.isParty(party) ? [] : [this.validators.mandatory('Enter party role')]],
      attendanceType: [party.partyChannelSubType, [this.validators.mandatory('Enter attendance type')]],
      organisation: [party.actualOrganisationDetails.name],
      attendeeRepresenting: [party.representedParty, HearingActualsViewEditPartiesComponent.isParty(party) ? [] : [this.validators.mandatory('Enter attendee representing')]],
      partyId: [party.actualPartyId],
      isParty: [HearingActualsViewEditPartiesComponent.isParty(party)],
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
      firstName: [party.individualDetails.firstName, [this.validators.mandatory('Enter first name')]],
      lastName: [party.individualDetails.lastName, HearingActualsViewEditPartiesComponent.isParty(party) ? [] : [this.validators.mandatory('Enter last name')]],
      role: [party.partyRole, HearingActualsViewEditPartiesComponent.isParty(party) ? [] : [this.validators.mandatory('Enter party role')]],
      attendanceType: [party.partyChannelSubType, [this.validators.mandatory('Enter attendance type')]],
      organisation: [party.organisationDetails.name],
      attendeeRepresenting: [null, HearingActualsViewEditPartiesComponent.isParty(party) ? [] : [this.validators.mandatory('Enter attendee representing')]],
      partyId: [party.partyId],
      isParty: [true]
    }));
  }

  private setUpRoleLists(): void {
    for (const role of this.hearingRoles) {
      if (role.key === PartyRoleOnly.Claimant || role.key === PartyRoleOnly.Appellant) {
        this.immutablePartyRoles.push(role);
      } else {
        this.mutablePartyRoles.push(role);
      }
    }
  }

  private getAllRowErrors(controls: { [p: string]: AbstractControl }): { [p: string]: string } {
    const errors: { [p: string]: string } = {};
    Object.keys(controls).forEach(key => {
      const controlErrors: ValidationErrors = controls[key].errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          errors[key] = controlErrors[keyError].message;
        });
      }
    });
    return errors;
  }

  private subscribeToFormChanges() {
    this.formSub = this.form.valueChanges.subscribe(() => {
      this.submitted = false;
    });
  }

  private displayErrors(): void {
    this.errors = this.parties.controls.reduce((acc, party, index: number) => {
      const message = this.displayRowErrors(index);
      if (!message) {
        return acc;
      }
      return [...acc, { id: `participant${index}`, message }];
    }, []);
  }
}

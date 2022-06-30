import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpError } from '../../../../models/httpError.model';
import { HearingLinksStateData } from '../../../models/hearingLinksStateData.model';
import { GroupLinkType, Mode } from '../../../models/hearings.enum';
import {
  HearingDetailModel, LinkedHearingGroupMainModel, LinkedHearingsDetailModel, ServiceLinkedCasesModel
} from '../../../models/linkHearings.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-check-your-answers',
  templateUrl: './linked-hearings-check-your-answers.component.html',
  styleUrls: ['./linked-hearings-check-your-answers.component.scss']
})
export class LinkedHearingsCheckYourAnswersComponent implements OnInit {
  private static readonly MANAGE_JOURNEY_FINAL_PAGE = 'check-your-answers';
  public isManageLink: boolean;
  public mode: Mode = Mode.LINK_HEARINGS;
  public caseId: string;
  public caseName: string;
  public hearingId: string;
  public hearingLinks: HearingLinksStateData;
  public hearingGroupRequestId: string;
  public showPositionColumn: boolean;
  public linkedCases: LinkedHearingsCheckYourAnswersPageResult[] = [];
  public hearingsInGroup: LinkedHearingsDetailModel[];
  public linkedHearingGroup: LinkedHearingGroupMainModel;
  public selectedLinkedHearingsCount: number;
  public cancelButtonText: string;
  public sub: Subscription;
  public serverErrors: { id: string, message: string }[] = [
    { id: 'serverError', message: 'There was a system error and your request could not be processed. Please try again.' }
  ];
  public error$: Observable<HttpError>;
  public isManageJourneyFinalPage: boolean;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly hearingsService: HearingsService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
    this.isManageLink = this.route.snapshot.data.mode === Mode.MANAGE_HEARINGS;
    this.isManageJourneyFinalPage = this.isManageLink &&
      this.route.snapshot.url &&
      this.route.snapshot.url.length > 0 &&
      this.route.snapshot.url[0].path === LinkedHearingsCheckYourAnswersComponent.MANAGE_JOURNEY_FINAL_PAGE;
    this.mode = this.route.snapshot.data.mode;
    this.caseId = this.route.snapshot.params.caseId;
    this.hearingGroupRequestId = this.route.snapshot.params.hearingGroupRequestId;
    this.hearingId = this.route.snapshot.params.hearingId;
    this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState)).subscribe(
      state => {
        this.caseName = state.hearingValues.serviceHearingValuesModel ? state.hearingValues.serviceHearingValuesModel.publicCaseName : '';
        this.hearingLinks = state.hearingLinks;
      }
    );
  }

  public ngOnInit(): void {
    if (this.isManageLink) {
      const currentCase: ServiceLinkedCasesModel = {
        caseReference: this.caseId,
        caseName: this.caseName,
        reasonsForLink: [],
      };
      this.sub = this.hearingsService.getAllCaseInformation(currentCase, this.route.snapshot.data.linkedCase, this.isManageLink).subscribe((casesLinkedInfo) => {
        this.setHearingLinkedGroup(casesLinkedInfo);
        this.hearingStore.dispatch(new fromHearingStore.LoadServiceLinkedCasesSuccess(casesLinkedInfo));
      });
    } else {
      this.setHearingLinkedGroup(this.hearingLinks.serviceLinkedCases);
    }
  }

  public setHearingLinkedGroup(serviceLinkedCases) {
    this.error$ = this.hearingStore.select(fromHearingStore.getHearingLinksLastError);
    if (this.hearingLinks && this.hearingLinks.linkedHearingGroup) {
      this.linkedHearingGroup = this.hearingLinks.linkedHearingGroup;
      this.hearingsInGroup = this.hearingLinks.linkedHearingGroup.hearingsInGroup;
      this.showPositionColumn = this.canDisplayPositionColumn();
      serviceLinkedCases.forEach(linkedCase => {
        const selectedHearings = linkedCase.hearings && linkedCase.hearings.filter(hearing => hearing.isSelected);
        this.setDisplayRow(linkedCase, selectedHearings);
      });
      this.sortDisplayRecords();
    }
    this.setCancelButtonText();
  }

  public setCancelButtonText(): void {
    if (this.isManageLink) {
      this.cancelButtonText = !this.isManageJourneyFinalPage && this.linkedCases.length > 0 ? 'Return to hearings' : 'Cancel';
    } else {
      this.cancelButtonText = 'Cancel';
    }
  }

  public getHearingLinkState$(): Observable<HearingLinksStateData> {
    return this.hearingStore.pipe(select(fromHearingStore.getHearingLinks)).pipe(
      map(hearingLinks => hearingLinks
      ));
  }

  public setDisplayRow(linkedCase: ServiceLinkedCasesModel, selectedHearings: HearingDetailModel[]): void {
    if (selectedHearings && selectedHearings.length > 0) {
      selectedHearings.forEach(hearing => {
        this.linkedCases.push({
          caseName: linkedCase.caseName,
          caseReference: linkedCase.caseReference,
          hearingStage: hearing.hearingStage,
          position: this.getPosition(hearing)
        });
      });
    }
  }

  public sortDisplayRecords(): void {
    if (this.showPositionColumn) {
      this.linkedCases.sort((a, b) => a.position - b.position);
    }
  }

  public getPosition(hearing: HearingDetailModel): number {
    if (this.showPositionColumn) {
      const linkedHearings: LinkedHearingsDetailModel[] = this.hearingsInGroup.filter(x => x.hearingId === hearing.hearingId);
      if (linkedHearings && linkedHearings.length > 0) {
        return linkedHearings[0].hearingOrder;
      }
    }
    return null;
  }

  public canDisplayPositionColumn(): boolean {
    return this.linkedHearingGroup
      && this.linkedHearingGroup.groupDetails
      && this.linkedHearingGroup.groupDetails.groupLinkType === GroupLinkType.ORDERED;
  }

  public onLinkHearings(): void {
    this.hearingStore.dispatch(new fromHearingStore.SubmitLinkedHearingGroup({
      linkedHearingGroup: this.linkedHearingGroup, caseId: this.caseId, hearingGroupRequestId: this.hearingGroupRequestId, hearingId: this.hearingId, isManageLink: this.isManageLink
    }));
  }

  public onManageLinkHearings(): void {
    this.hearingStore.dispatch(new fromHearingStore.ManageLinkedHearingGroup({
      linkedHearingGroup: this.linkedHearingGroup, caseId: this.caseId, hearingGroupRequestId: this.hearingGroupRequestId, hearingId: this.hearingId
    }));
  }

  public onEdit(): void {
    this.router.navigate(['/', 'hearings', 'manage-links', this.caseId, this.hearingGroupRequestId, this.hearingId, 'selected-hearings']);
  }

  public onUnlinkHearings(): void {
    this.hearingStore.dispatch(new fromHearingStore.ManageLinkedHearingGroup({
      linkedHearingGroup: null, caseId: this.caseId, hearingGroupRequestId: this.hearingGroupRequestId, hearingId: this.hearingId
    }));
  }

  public onChange(): void {
    this.hearingStore.dispatch(new fromHearingStore.ResetLinkedHearingLastError());
    this.router.navigate(['/', 'hearings', 'link', this.caseId, this.hearingId]);
  }

  public onBack(): void {
    if (this.isManageJourneyFinalPage) {
      this.router.navigate(['/', 'hearings', 'manage-links', this.caseId, this.hearingGroupRequestId, this.hearingId, 'group-selection']);
    } else if (this.isManageLink) {
      this.router.navigate(['/', 'cases', 'case-details', this.caseId, 'hearings']);
    } else {
      this.hearingStore.dispatch(new fromHearingStore.ResetLinkedHearingLastError());
      this.router.navigate(['/', 'hearings', 'link', this.caseId, this.hearingId, 'group-selection']);
    }
  }

  public onCancel(): void {
    if (this.isManageLink) {
      this.router.navigate(['/', 'cases', 'case-details', this.caseId, 'hearings']);
    } else {
      this.hearingStore.dispatch(new fromHearingStore.ResetLinkedHearingLastError());
      this.router.navigate(['/', 'hearings', 'link', this.caseId, this.hearingId, 'group-selection']);
    }
  }
}

interface LinkedHearingsCheckYourAnswersPageResult {
  caseReference: string;
  caseName: string;
  hearingStage: string;
  position?: number;
}

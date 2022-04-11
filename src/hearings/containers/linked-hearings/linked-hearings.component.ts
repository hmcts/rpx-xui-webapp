import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-linked-hearings',
  templateUrl: './linked-hearings.component.html',
  styleUrls: ['./linked-hearings.component.scss']
})
export class LinkedHearingsComponent { }

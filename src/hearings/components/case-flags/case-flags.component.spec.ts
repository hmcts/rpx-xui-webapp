import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CaseFlagGroup } from '../../models/caseFlagGroup.model';
import { AmendmentLabelStatus } from '../../models/hearingsUpdateMode.enum';
import { CaseFlagsComponent } from './case-flags.component';

describe('CaseFlagsComponent', () => {
  let component: CaseFlagsComponent;
  let fixture: ComponentFixture<CaseFlagsComponent>;
  let nativeElement: any;

  const caseFlagsGroup: CaseFlagGroup[] = [
    {
      name: 'Jane Smith',
      partyFlags: [
        {
          partyId: '1234-uytr-7654-asdf-0001',
          partyName: 'Jane Smith',
          flagParentId: 'PARENT_0',
          flagId: 'RA001',
          flagDescription: 'Some comment',
          flagStatus: 'ACTIVE',
          displayName: 'A',
          displayPath: [
            'Reasonable adjustment'
          ]
        }
      ],
      partyAmendmentLabelStatus: AmendmentLabelStatus.AMENDED
    },
    {
      name: 'Jack Ryan',
      partyFlags: [
        {
          partyId: '1234-uytr-7654-asdf-0002',
          partyName: 'Jack Ryan',
          flagParentId: 'PARENT_0',
          flagId: 'RA001',
          flagDescription: 'Some additional comment',
          flagStatus: 'ACTIVE',
          displayName: 'A',
          displayPath: [
            'Reasonable adjustment'
          ]
        },
        {
          partyId: '1234-uytr-7654-asdf-0002',
          partyName: 'Jack Ryan',
          flagParentId: 'PARENT_0',
          flagId: 'RA0042',
          flagDescription: 'Some more additional comment',
          flagStatus: 'ACTIVE',
          displayName: 'B',
          displayPath: [
            'Reasonable adjustment'
          ],
          flagAmendmentLabelStatus: AmendmentLabelStatus.ACTION_NEEDED
        }
      ],
      partyAmendmentLabelStatus: AmendmentLabelStatus.NONE
    },
    {
      name: 'Rob Kennedy',
      partyFlags: [
        {
          partyId: '1234-uytr-7654-asdf-0004',
          partyName: 'Rob Kennedy',
          flagParentId: 'PARENT_0',
          flagId: 'RA0042',
          flagDescription: 'Some details about the flag',
          flagStatus: 'ACTIVE',
          displayName: 'B',
          displayPath: [
            'Reasonable adjustment'
          ]
        }
      ],
      partyAmendmentLabelStatus: AmendmentLabelStatus.ACTION_NEEDED
    }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CaseFlagsComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(CaseFlagsComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the values', () => {
    component.caseFlagsGroup = caseFlagsGroup;
    fixture.detectChanges();
    const headerElements = nativeElement.querySelectorAll('.govuk-table__header_name');
    const tableRowElements = nativeElement.querySelectorAll('.govuk-table__row');
    expect(headerElements[0].textContent).toContain('Jane Smith');
    expect(tableRowElements[1].textContent).toContain('Some comment');
    expect(headerElements[1].textContent).toContain('Jack Ryan');
    expect(tableRowElements[3].textContent).toContain('Some additional comment');
    expect(tableRowElements[4].textContent).toContain('Some more additional comment');
    expect(headerElements[2].textContent).toContain('Rob Kennedy');
    expect(tableRowElements[6].textContent).toContain('Some details about the flag');
  });
});

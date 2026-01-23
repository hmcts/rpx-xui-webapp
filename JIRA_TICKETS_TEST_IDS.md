# JIRA Tickets for Test ID Implementation

## Epic: Add data-testid Attributes to EXUI Components for Playwright Test Stability

**Epic Description:**
Implement `data-testid` attributes across rpx-xui-webapp application components to support stable, maintainable Playwright tests following HMCTS testing standards. This will reduce test brittleness caused by CSS class changes and improve test performance.

**Business Value:**
- **Test Stability**: Tests won't break when CSS classes or HTML structure changes during UI refactors
- **Performance**: `getByTestId()` selectors are 2-3x faster than CSS class selectors
- **Maintainability**: Reduces test maintenance burden by ~40% (industry standard)
- **Standards Compliance**: Aligns with HMCTS Playwright testing standards (see agents.md)
- **Developer Experience**: Clear intent - elements with test IDs are designed for test automation

**Acceptance Criteria:**
- All interactive elements have appropriate `data-testid` attributes
- Test IDs follow naming convention: `component-element-type` (e.g., `case-list-jurisdiction-select`)
- Playwright tests updated to use test IDs as primary selectors
- Documentation updated with test ID mapping

---

## Story 1: Add Test IDs to Case List Page Components

**Story Points:** 3

**Description:**
Add `data-testid` attributes to all interactive elements on the Case List page (`exui-case-home` component) to enable stable Playwright test automation.

**Affected Components:**
- `src/cases/components/case-home/case-home.component.html` (likely path)

**Required Test IDs:**

| Element | Test ID | Current Selector |
|---------|---------|------------------|
| Case list container | `case-list-container` | `exui-case-home` |
| Jurisdiction dropdown | `jurisdiction-select` | `#wb-jurisdiction` |
| Case type dropdown | `case-type-select` | `#wb-case-type` |
| TextField0 input | `text-field-0-input` | `#TextField0` |
| Search results message | `search-results-message` | `#search-result` |
| Pagination container | `pagination-container` | `.ngx-pagination` |

**Implementation Example:**
```html
<!-- Before -->
<select id="wb-jurisdiction" class="form-control">...</select>

<!-- After -->
<select id="wb-jurisdiction" class="form-control" data-testid="jurisdiction-select">...</select>
```

**Acceptance Criteria:**
- [ ] All 6 test IDs added to component template
- [ ] Playwright tests updated to use `getByTestId()` selectors
- [ ] Manual testing confirms no visual or functional regressions
- [ ] Build passes all existing tests

**Testing Notes:**
- Verify dropdowns still function correctly
- Check pagination still works
- Ensure search results display properly

---

## Story 2: Add Test IDs to Case Details Page Components

**Story Points:** 5

**Description:**
Add `data-testid` attributes to Case Details page (`exui-case-details-home` component) interactive elements.

**Affected Components:**
- `src/cases/components/case-details/case-details-home.component.html` (likely path)

**Required Test IDs:**

| Element | Test ID | Current Selector |
|---------|---------|------------------|
| Case details container | `case-details-container` | `exui-case-details-home` |
| Case details tabs | `case-tab-{name}` | `div[role="tab"]` |
| Case actions dropdown | `case-actions-dropdown` | `#next-step` |
| Case action GO button | `case-action-go-button` | `.event-trigger button` |
| Case flag comment box | `case-flag-comment-input` | `#flagComments` |
| Case flag table | `case-flag-table` | `table.govuk-table.ng-star-inserted` |
| Radio buttons | `radio-option-{index}` | `.govuk-radios__item` |
| Success alert message | `success-banner-message` | `.hmcts-banner--success .alert-message` |
| Notification banner title | `notification-banner-title` | `#govuk-notification-banner-title` |
| Notification banner body | `notification-banner-body` | `.govuk-notification-banner__heading` |
| Documents table | `documents-table` | `table.complex-panel-table` |

**Implementation Notes:**
- Tabs should follow pattern: `case-tab-history`, `case-tab-documents`, etc.
- Radio buttons should be indexed: `radio-option-0`, `radio-option-1`, etc.

**Acceptance Criteria:**
- [ ] All 11 test ID patterns implemented
- [ ] Playwright tests refactored to use test IDs
- [ ] Case flag workflows tested end-to-end
- [ ] Tab navigation verified
- [ ] All E2E tests passing

---

## Story 3: Add Test IDs to Create Case Form Components

**Story Points:** 5

**Description:**
Add `data-testid` attributes to Create Case page form fields and controls.

**Affected Components:**
- `src/cases/components/create-case/create-case.component.html` (likely path)

**Required Test IDs:**

| Element | Test ID | Current Selector |
|---------|---------|------------------|
| Jurisdiction select | `create-case-jurisdiction-select` | `#cc-jurisdiction` |
| Case type select | `create-case-type-select` | `#cc-case-type` |
| Event type select | `create-case-event-select` | `#cc-event` |
| Start button | `create-case-start-button` | `button[type="submit"]` |
| Text field input | `text-field-input` | `#TextField` |
| Email field input | `email-field-input` | `#EmailField` |
| Phone field input | `phone-field-input` | `#PhoneUKField` |
| Date field day | `date-field-day-input` | `#DateField-day` |
| Date field month | `date-field-month-input` | `#DateField-month` |
| Date field year | `date-field-year-input` | `#DateField-year` |
| Currency field | `currency-field-input` | `#AmountInGBPField` |
| Yes/No radio | `yes-no-radio-group` | `#YesOrNoField` |
| Postcode field | `applicant-postcode-input` | `#AppicantPostcodeField` |

**Acceptance Criteria:**
- [ ] All 13 test IDs added to form templates
- [ ] Form validation still works correctly
- [ ] Playwright tests use test ID selectors
- [ ] Create case E2E flows passing

---

## Story 4: Add Test IDs to Task List/Work Allocation Components

**Story Points:** 3

**Description:**
Add `data-testid` attributes to My Work / Task List page components.

**Affected Components:**
- `src/work-allocation/components/my-work/my-work.component.html` (likely path)

**Required Test IDs:**

| Element | Test ID | Current Selector |
|---------|---------|------------------|
| Filter toggle button | `task-filter-toggle` | `.govuk-button.hmcts-button--secondary` |
| Select all services | `filter-all-services-checkbox` | `input#checkbox_servicesservices_all` |
| Select all work types | `filter-all-work-types-checkbox` | `input#checkbox_types-of-worktypes_of_work_all` |
| Apply filter button | `apply-filter-button` | `button#applyFilter` |
| Task list table | `task-list-table` | `.cdk-table.govuk-table` |

**Note:** `[data-test="search-result-summary__text"]` already has a test attribute ✅

**Acceptance Criteria:**
- [ ] All 5 test IDs added
- [ ] Filter functionality tested
- [ ] Task list loads correctly
- [ ] Playwright tests updated

---

## Story 5: Add Test IDs to Header Navigation Components

**Story Points:** 2

**Description:**
Add `data-testid` attributes to EXUI header navigation elements.

**Affected Components:**
- `src/app/components/header/header.component.html` (likely path)

**Required Test IDs:**

| Element | Test ID | Current Selector |
|---------|---------|------------------|
| Header container | `app-header` | `exui-header` |
| Search results | `header-search-results` | `ccd-search-result` |
| Primary navigation items | `nav-item-{name}` | `.hmcts-primary-navigation__item` |

**Implementation Pattern:**
```html
<nav class="hmcts-primary-navigation__item" data-testid="nav-item-case-list">
  Case list
</nav>
<nav class="hmcts-primary-navigation__item" data-testid="nav-item-create-case">
  Create case
</nav>
```

**Acceptance Criteria:**
- [ ] Header test IDs added
- [ ] Navigation items have dynamic test IDs
- [ ] Header visibility tests passing
- [ ] Navigation tests using test IDs

---

## Story 6: Add Test IDs to Staff Search Components

**Story Points:** 3

**Description:**
Add `data-testid` attributes to Staff Search page elements.

**Affected Components:**
- `src/staff/components/staff-search/staff-search.component.html` (likely path)

**Required Test IDs:**

| Element | Test ID | Current Selector |
|---------|---------|------------------|
| Staff user list | `staff-user-list` | `exui-staff-user-list` |
| Search input | `staff-search-input` | `#content getByRole('textbox')` |
| Service search input | `service-search-input` | `#inputServiceSearch` |
| Location search input | `location-search-input` | `#inputLocationSearch` |
| User type select | `user-type-select` | `#select_user-type` |
| Job title select | `job-title-select` | `#select_user-job-title` |
| No results message | `no-results-message` | `#user-list-no-results` |

**Acceptance Criteria:**
- [ ] All 7 test IDs implemented
- [ ] Staff search workflows tested
- [ ] Filter combinations verified
- [ ] Playwright tests refactored

---

## Story 7: Update Playwright Tests to Use Test IDs

**Story Points:** 8

**Description:**
Refactor all Playwright page objects and tests to prioritize test IDs over CSS class selectors following HMCTS standards.

**Affected Repositories:**
- `rpx-xui-webapp/playwright_tests_new/`
- `playwright-common/src/page-objects/`
- `rpx-xui-e2e-tests/src/page-objects/`

**Tasks:**
- [ ] Update page objects to use `getByTestId()` as primary selector
- [ ] Add TODO comments where test IDs don't exist yet
- [ ] Document selector priority in code comments
- [ ] Run full E2E test suite to verify
- [ ] Update test documentation

**Acceptance Criteria:**
- [ ] All page objects follow test ID priority hierarchy
- [ ] TODO comments reference application tickets
- [ ] Tests pass with existing selectors (backwards compatible)
- [ ] Documentation updated (TEST_ID_REQUIREMENTS.md)
- [ ] 0 new test failures introduced

---

## Story 8: Documentation and Training

**Story Points:** 2

**Description:**
Create documentation and conduct team training on test ID standards.

**Deliverables:**
- [ ] Update HMCTS agents.md with test ID examples
- [ ] Create TEST_ID_REQUIREMENTS.md in rpx-xui-webapp
- [ ] Conduct team demo on test ID benefits
- [ ] Add test ID guidelines to contribution guide
- [ ] Create PR template checklist for test IDs

**Acceptance Criteria:**
- [ ] All documentation merged
- [ ] Team training session completed
- [ ] Contribution guide updated
- [ ] PR template includes test ID check

---

## Technical Notes

### Naming Convention
```
{component}-{element}-{type}

Examples:
- case-list-jurisdiction-select
- case-details-container
- create-case-start-button
- task-filter-toggle
```

### Implementation Pattern
```html
<!-- Add data-testid alongside existing attributes -->
<button 
  id="next-step" 
  class="govuk-button" 
  type="submit"
  data-testid="case-action-go-button">
  Go
</button>
```

### Testing Checklist
- [ ] Visual regression: No UI changes
- [ ] Functional: All workflows work as before
- [ ] Performance: No measurable impact (test IDs are lightweight)
- [ ] Accessibility: No ARIA changes required
- [ ] E2E tests: All passing with new selectors

---

## Rollout Timeline

**Week 1:**
- Stories 1, 2 (Case List + Case Details)
- Begin Story 7 (Playwright refactor)

**Week 2:**
- Stories 3, 4, 5 (Create Case, Task List, Header)
- Continue Story 7

**Week 3:**
- Story 6 (Staff Search)
- Complete Story 7
- Story 8 (Documentation)

**Total Effort:** 31 story points (~3 weeks for 1 developer)

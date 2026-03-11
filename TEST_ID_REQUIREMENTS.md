# Test ID Requirements for rpx-xui-webapp

This document lists all elements in the rpx-xui-webapp application that require `data-testid` attributes to support stable, maintainable Playwright tests following HMCTS standards.

## 📋 Priority: CRITICAL

All interactive elements must have `data-testid` attributes to enable test stability and reduce coupling to implementation details.

---

## Case List Page (`exui-case-home` component)

**File**: Likely `src/cases/components/case-home/case-home.component.html`

| Element                | Current Selector   | Required Test ID         | JIRA Ticket |
| ---------------------- | ------------------ | ------------------------ | ----------- |
| Case list container    | `exui-case-home`   | `case-list-container`    | EXUI-XXXX   |
| Jurisdiction dropdown  | `#wb-jurisdiction` | `jurisdiction-select`    | EXUI-XXXX   |
| Case type dropdown     | `#wb-case-type`    | `case-type-select`       | EXUI-XXXX   |
| TextField0 input       | `#TextField0`      | `text-field-0-input`     | EXUI-XXXX   |
| Search results message | `#search-result`   | `search-results-message` | EXUI-XXXX   |
| Pagination container   | `.ngx-pagination`  | `pagination-container`   | EXUI-XXXX   |

---

## Case Details Page (`exui-case-details-home` component)

**File**: Likely `src/cases/components/case-details/case-details-home.component.html`

| Element                   | Current Selector                        | Required Test ID            | JIRA Ticket |
| ------------------------- | --------------------------------------- | --------------------------- | ----------- |
| Case details container    | `exui-case-details-home`                | `case-details-container`    | EXUI-XXXX   |
| Case details tabs         | `div[role="tab"]`                       | `case-tab-{name}`           | EXUI-XXXX   |
| Case actions dropdown     | `#next-step`                            | `case-actions-dropdown`     | EXUI-XXXX   |
| Case action GO button     | `.event-trigger button`                 | `case-action-go-button`     | EXUI-XXXX   |
| Case flag comment box     | `#flagComments`                         | `case-flag-comment-input`   | EXUI-XXXX   |
| Case flag applicant table | `table.govuk-table.ng-star-inserted`    | `case-flag-table`           | EXUI-XXXX   |
| Radio buttons             | `.govuk-radios__item`                   | `radio-option-{index}`      | EXUI-XXXX   |
| Success alert message     | `.hmcts-banner--success .alert-message` | `success-banner-message`    | EXUI-XXXX   |
| Notification banner title | `#govuk-notification-banner-title`      | `notification-banner-title` | EXUI-XXXX   |
| Notification banner body  | `.govuk-notification-banner__heading`   | `notification-banner-body`  | EXUI-XXXX   |
| Documents table           | `table.complex-panel-table`             | `documents-table`           | EXUI-XXXX   |

---

## Create Case Page

**File**: Likely `src/cases/components/create-case/create-case.component.html`

| Element             | Current Selector         | Required Test ID                  | JIRA Ticket |
| ------------------- | ------------------------ | --------------------------------- | ----------- |
| Jurisdiction select | `#cc-jurisdiction`       | `create-case-jurisdiction-select` | EXUI-XXXX   |
| Case type select    | `#cc-case-type`          | `create-case-type-select`         | EXUI-XXXX   |
| Event type select   | `#cc-event`              | `create-case-event-select`        | EXUI-XXXX   |
| Start button        | `button[type="submit"]`  | `create-case-start-button`        | EXUI-XXXX   |
| Text field input    | `#TextField`             | `text-field-input`                | EXUI-XXXX   |
| Email field input   | `#EmailField`            | `email-field-input`               | EXUI-XXXX   |
| Phone field input   | `#PhoneUKField`          | `phone-field-input`               | EXUI-XXXX   |
| Date field day      | `#DateField-day`         | `date-field-day-input`            | EXUI-XXXX   |
| Date field month    | `#DateField-month`       | `date-field-month-input`          | EXUI-XXXX   |
| Date field year     | `#DateField-year`        | `date-field-year-input`           | EXUI-XXXX   |
| Currency field      | `#AmountInGBPField`      | `currency-field-input`            | EXUI-XXXX   |
| Yes/No radio        | `#YesOrNoField`          | `yes-no-radio-group`              | EXUI-XXXX   |
| Postcode field      | `#AppicantPostcodeField` | `applicant-postcode-input`        | EXUI-XXXX   |

---

## Task List Page (`my-work` component)

**File**: Likely `src/work-allocation/components/my-work/my-work.component.html`

| Element               | Current Selector                                | Required Test ID                 | JIRA Ticket |
| --------------------- | ----------------------------------------------- | -------------------------------- | ----------- |
| Filter toggle button  | `.govuk-button.hmcts-button--secondary`         | `task-filter-toggle`             | EXUI-XXXX   |
| Select all services   | `input#checkbox_servicesservices_all`           | `filter-all-services-checkbox`   | EXUI-XXXX   |
| Select all work types | `input#checkbox_types-of-worktypes_of_work_all` | `filter-all-work-types-checkbox` | EXUI-XXXX   |
| Apply filter button   | `button#applyFilter`                            | `apply-filter-button`            | EXUI-XXXX   |
| Task list table       | `.cdk-table.govuk-table`                        | `task-list-table`                | EXUI-XXXX   |
| Results summary       | `[data-test="search-result-summary__text"]`     | Already has test ID ✅           | N/A         |

---

## Header Component (`exui-header`)

**File**: Likely `src/app/components/header/header.component.html`

| Element                  | Current Selector                  | Required Test ID        | JIRA Ticket |
| ------------------------ | --------------------------------- | ----------------------- | ----------- |
| Header container         | `exui-header`                     | `app-header`            | EXUI-XXXX   |
| Search results           | `ccd-search-result`               | `header-search-results` | EXUI-XXXX   |
| Primary navigation items | `.hmcts-primary-navigation__item` | `nav-item-{name}`       | EXUI-XXXX   |

---

## Staff Search Page

**File**: Likely `src/staff/components/staff-search/staff-search.component.html`

| Element               | Current Selector                | Required Test ID        | JIRA Ticket |
| --------------------- | ------------------------------- | ----------------------- | ----------- |
| Staff user list       | `exui-staff-user-list`          | `staff-user-list`       | EXUI-XXXX   |
| Search input          | `#content getByRole('textbox')` | `staff-search-input`    | EXUI-XXXX   |
| Service search input  | `#inputServiceSearch`           | `service-search-input`  | EXUI-XXXX   |
| Location search input | `#inputLocationSearch`          | `location-search-input` | EXUI-XXXX   |
| User type select      | `#select_user-type`             | `user-type-select`      | EXUI-XXXX   |
| Job title select      | `#select_user-job-title`        | `job-title-select`      | EXUI-XXXX   |
| No results message    | `#user-list-no-results`         | `no-results-message`    | EXUI-XXXX   |

---

## Implementation Guidelines

### ✅ Good Test ID Examples

```html
<!-- Case list jurisdiction select -->
<select id="wb-jurisdiction" data-testid="jurisdiction-select">
  <option>Family</option>
</select>

<!-- Case actions dropdown -->
<select id="next-step" data-testid="case-actions-dropdown">
  <option>Create flag</option>
</select>

<!-- Success banner -->
<div class="hmcts-banner--success" data-testid="success-banner">
  <p class="alert-message" data-testid="success-banner-message">Case created successfully</p>
</div>
```

### ❌ Avoid

```html
<!-- Don't rely on CSS classes only -->
<div class="govuk-button hmcts-button--secondary">Filter</div>

<!-- Don't rely on custom element names only -->
<exui-case-home></exui-case-home>
```

---

## Rollout Plan

### Phase 1: Critical Elements (Week 1)

- [ ] Case list container and filters
- [ ] Case details page actions
- [ ] Create case form fields
- [ ] Navigation elements

### Phase 2: Secondary Elements (Week 2)

- [ ] Task list filters
- [ ] Staff search inputs
- [ ] Table components
- [ ] Banner/alert messages

### Phase 3: Tertiary Elements (Week 3)

- [ ] Complex form fields
- [ ] Modal dialogs
- [ ] Pagination controls
- [ ] Tab components

---

## Benefits

1. **Test Stability**: Tests won't break when CSS classes or HTML structure changes
2. **Performance**: `getByTestId()` is faster than CSS class selectors
3. **Clarity**: Intent is explicit - this element is designed for testing
4. **Maintainability**: Easy to identify test-targeted elements in code reviews
5. **Standards Compliance**: Follows HMCTS Playwright testing standards (agents.md)

---

## References

- [HMCTS Agents Manifest](../agents.md#61-playwright-test-automation-standards)
- [Playwright Best Practices - Test IDs](https://playwright.dev/docs/locators#locate-by-test-id)
- [Testing Library - Test IDs](https://testing-library.com/docs/queries/bytestid/)

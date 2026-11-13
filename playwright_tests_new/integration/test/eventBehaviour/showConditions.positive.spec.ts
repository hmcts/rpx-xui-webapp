import { expect, test } from '../../../E2E/fixtures';
import { ShowConditionsComponent } from '../../../E2E/page-objects/components/exui/show-conditions.component';
import { openShowConditionsJourney } from '../../helpers/showConditionsMockRoutes.helper';
import { EVENT_BEHAVIOUR_TRIGGER_NAME } from '../../mocks/eventBehaviour.mock';
import {
  buildChainedShowConditionsTrigger,
  buildHiddenPageShowConditionsTrigger,
  buildLaterPageShowConditionsTrigger,
  buildMetadataShowConditionsTrigger,
} from '../../mocks/showConditions.mock';

test.describe('Show-condition reference coverage', { tag: ['@integration', '@integration-event-behaviour'] }, () => {
  test('evaluates a conditional source including its disabled retained value', async ({ page, caseDetailsPage }) => {
    const conditions = new ShowConditionsComponent(page);
    await openShowConditionsJourney(page, caseDetailsPage, buildChainedShowConditionsTrigger());
    await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, {
      expectedLocator: conditions.controller,
    });
    await expect(conditions.conditionalSource).toBeVisible();
    await expect(conditions.dependentDetail).toBeHidden();
    await conditions.conditionalSource.fill('show');
    await expect(conditions.dependentDetail).toBeVisible();
    await conditions.conditionalSource.fill('hide');
    await expect(conditions.dependentDetail).toBeHidden();
    await conditions.conditionalSource.fill('show');
    await expect(conditions.dependentDetail).toBeVisible();
    await conditions.controller.fill('no');
    await expect(conditions.conditionalSource).toBeHidden();
    await expect(conditions.dependentDetail).toBeVisible();
    await conditions.controller.fill('yes');
    await expect(conditions.conditionalSource).toHaveValue('show');
  });

  test('preserves a dependent answer at CYA when its source page was skipped', async ({
    page,
    caseDetailsPage,
    createCasePage,
  }) => {
    const conditions = new ShowConditionsComponent(page);
    await openShowConditionsJourney(page, caseDetailsPage, buildHiddenPageShowConditionsTrigger('show'));
    await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, {
      expectedLocator: conditions.showSourcePage,
    });
    await caseDetailsPage.continueCaseEvent();
    await expect(conditions.destinationNote).toBeVisible();
    await expect(conditions.skippedPageSource).toBeHidden();
    await expect(conditions.dependentDetail).toBeVisible();
    await conditions.dependentDetail.fill('Visible from skipped source');
    await caseDetailsPage.continueCaseEvent();
    await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();
    const answers = await caseDetailsPage.trRowsToObjectInPage(createCasePage.checkYourAnswersTable);
    expect(answers).toHaveProperty('Show source page', 'no');
    expect(answers).not.toHaveProperty('Skipped page source');
    test.fail(true, 'EXUI-1004: CYA drops an unvisited skipped-page source from its condition context');
    expect(answers).toMatchObject({ 'Dependent detail': 'Visible from skipped source' });
  });

  test('shows matching conditional fields and their entered values in check your answers', async ({
    page,
    caseDetailsPage,
    createCasePage,
  }) => {
    const conditions = new ShowConditionsComponent(page);
    await openShowConditionsJourney(page, caseDetailsPage, buildChainedShowConditionsTrigger());
    await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, { expectedLocator: conditions.controller });
    await conditions.conditionalSource.fill('show');
    await expect(conditions.dependentDetail).toBeVisible();
    await conditions.dependentDetail.fill('Visible conditional answer');
    await caseDetailsPage.continueCaseEvent();
    await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();
    const answers = await caseDetailsPage.trRowsToObjectInPage(createCasePage.checkYourAnswersTable);
    expect(answers).toMatchObject({ 'Conditional source': 'show', 'Dependent detail': 'Visible conditional answer' });
  });

  test('uses an unvisited later page value and reevaluates after that value changes', async ({ page, caseDetailsPage }) => {
    const conditions = new ShowConditionsComponent(page);
    await openShowConditionsJourney(page, caseDetailsPage, buildLaterPageShowConditionsTrigger('show'));
    await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, {
      expectedLocator: conditions.firstPageNote,
    });
    await expect(conditions.laterPageSource).toBeHidden();
    await expect(conditions.dependentDetail).toBeVisible();
    await caseDetailsPage.continueCaseEvent();
    await conditions.laterPageSource.fill('hide');
    await conditions.previousButton.click();
    await expect(conditions.firstPageNote).toBeVisible();
    await expect(conditions.dependentDetail).toBeHidden();
  });

  test('reveals a dependent answer after a later-page source changes to matching and preserves it at CYA', async ({
    page,
    caseDetailsPage,
    createCasePage,
  }) => {
    const conditions = new ShowConditionsComponent(page);
    await openShowConditionsJourney(page, caseDetailsPage, buildLaterPageShowConditionsTrigger('hide'));
    await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, {
      expectedLocator: conditions.firstPageNote,
    });
    await expect(conditions.dependentDetail).toBeHidden();
    await caseDetailsPage.continueCaseEvent();
    await expect(conditions.laterPageSource).toHaveValue('hide');
    await conditions.laterPageSource.fill('show');
    await conditions.previousButton.click();
    await expect(conditions.firstPageNote).toBeVisible();
    await expect(conditions.dependentDetail).toBeVisible();
    await conditions.dependentDetail.fill('Revealed after changing the later source');
    await caseDetailsPage.continueCaseEvent();
    await expect(conditions.laterPageSource).toHaveValue('show');
    await caseDetailsPage.continueCaseEvent();
    await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();
    const answers = await caseDetailsPage.trRowsToObjectInPage(createCasePage.checkYourAnswersTable);
    expect(answers).toMatchObject({
      'Later page source': 'show',
      'Dependent detail': 'Revealed after changing the later source',
    });
  });

  test('evaluates real case metadata outside the event fields', async ({ page, caseDetailsPage }) => {
    const conditions = new ShowConditionsComponent(page);
    await openShowConditionsJourney(page, caseDetailsPage, buildMetadataShowConditionsTrigger('withDwp'));
    await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, {
      expectedLocator: conditions.metadataPageNote,
    });
    await expect(conditions.metadataDependentDetail).toBeVisible();
  });
});

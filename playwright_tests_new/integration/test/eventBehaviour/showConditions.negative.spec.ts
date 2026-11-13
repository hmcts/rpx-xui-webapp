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

test.describe('Nonmatching show-condition references', { tag: ['@integration', '@integration-event-behaviour'] }, () => {
  test('keeps a dependent field absent from the skipped-page journey and check your answers', async ({
    page,
    caseDetailsPage,
    createCasePage,
  }) => {
    const conditions = new ShowConditionsComponent(page);
    await openShowConditionsJourney(page, caseDetailsPage, buildHiddenPageShowConditionsTrigger('hide'));
    await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, {
      expectedLocator: conditions.showSourcePage,
    });
    await caseDetailsPage.continueCaseEvent();
    await expect(conditions.destinationNote).toBeVisible();
    await expect(conditions.skippedPageSource).toBeHidden();
    await expect(conditions.dependentDetail).toBeHidden();
    await caseDetailsPage.continueCaseEvent();
    await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();
    const answers = await caseDetailsPage.trRowsToObjectInPage(createCasePage.checkYourAnswersTable);
    expect(answers).toHaveProperty('Show source page', 'no');
    expect(answers).not.toHaveProperty('Dependent detail');
    expect(answers).not.toHaveProperty('Skipped page source');
  });

  test('omits a nonmatching conditional field from check your answers', async ({ page, caseDetailsPage, createCasePage }) => {
    const conditions = new ShowConditionsComponent(page);
    await openShowConditionsJourney(page, caseDetailsPage, buildChainedShowConditionsTrigger());
    await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, { expectedLocator: conditions.controller });
    await expect(conditions.conditionalSource).toHaveValue('hide');
    await expect(conditions.dependentDetail).toBeHidden();
    await caseDetailsPage.continueCaseEvent();
    await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();
    const answers = await caseDetailsPage.trRowsToObjectInPage(createCasePage.checkYourAnswersTable);
    expect(answers).toMatchObject({ 'Conditional source': 'hide' });
    expect(answers).not.toHaveProperty('Dependent detail');
  });

  test('does not show a field for a nonmatching unvisited later-page value', async ({ page, caseDetailsPage }) => {
    const conditions = new ShowConditionsComponent(page);
    await openShowConditionsJourney(page, caseDetailsPage, buildLaterPageShowConditionsTrigger('hide'));
    await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, {
      expectedLocator: conditions.firstPageNote,
    });
    await expect(conditions.dependentDetail).toBeHidden();
    await caseDetailsPage.continueCaseEvent();
    await expect(conditions.laterPageSource).toHaveValue('hide');
  });

  test('does not show a field for a nonmatching metadata value', async ({ page, caseDetailsPage }) => {
    const conditions = new ShowConditionsComponent(page);
    await openShowConditionsJourney(page, caseDetailsPage, buildMetadataShowConditionsTrigger('readyToList'));
    await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, {
      expectedLocator: conditions.metadataPageNote,
    });
    await expect(conditions.metadataDependentDetail).toBeHidden();
    await expect(conditions.metadataPageNote).toBeVisible();
  });
});

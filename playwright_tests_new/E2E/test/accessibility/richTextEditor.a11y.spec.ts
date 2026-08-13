import { expect, test } from '../../fixtures';
import { openEventBehaviourJourney } from '../../../integration/helpers/eventBehaviourMockRoutes.helper';
import { buildRichTextAccessibilityTrigger } from '../../../integration/mocks/richTextAccessibility.mock';

test.describe('rich text editor accessibility interactions @accessibility @a11y @wave-a11y', () => {
  test.beforeEach(async ({ page, caseDetailsPage }) => {
    await openEventBehaviourJourney(page, caseDetailsPage, {
      trigger: buildRichTextAccessibilityTrigger(),
    });
    await caseDetailsPage.selectCaseAction('Record outcome', {
      expectedLocator: page.getByRole('toolbar', { name: 'Outcome note formatting options' }),
    });
  });

  test('exposes the editor, toolbar and validation semantics to assistive technology', async ({ page }) => {
    const editor = page.getByRole('textbox', { name: 'Outcome note' });
    const toolbar = page.getByRole('toolbar', { name: 'Outcome note formatting options' });

    await expect(editor).toHaveAttribute('aria-multiline', 'true');
    await expect(editor).toHaveAttribute('aria-required', 'true');
    await expect(editor).toHaveAttribute('aria-invalid', 'false');
    await expect(editor).toHaveAttribute('aria-labelledby', /OutcomeNote_label/);
    await expect(editor).toHaveAttribute('aria-describedby', /OutcomeNote_hint/);
    await expect(toolbar).toBeVisible();
    await expect(toolbar.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'false');
    const buttons = [
      'Undo',
      'Redo',
      'Bold',
      'Italic',
      'Underline',
      'Paragraph',
      'Ordered List',
      'Bullet List',
      'Decrease Indent',
      'Increase Indent',
    ];
    for (const label of buttons) {
      await expect(toolbar.getByRole('button', { name: label })).toBeVisible();
    }
    await expect(toolbar.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-keyshortcuts', 'Control+B');
    await expect(toolbar.getByRole('button', { name: 'Undo' })).toHaveAttribute('aria-keyshortcuts', 'Control+Z');
  });

  test('supports keyboard formatting and exposes the active command state', async ({ page }) => {
    const editor = page.getByRole('textbox', { name: 'Outcome note' });
    const boldButton = page
      .getByRole('toolbar', { name: 'Outcome note formatting options' })
      .getByRole('button', { name: 'Bold' });

    await editor.focus();
    await editor.press('Control+b');
    await editor.pressSequentially('Formatted outcome note');

    await expect(boldButton).toHaveAttribute('aria-pressed', 'true');
    await expect(editor.locator('strong')).toContainText('Formatted outcome note');
  });

  test('reports the required-field error through the editor description', async ({ page }) => {
    const editor = page.getByRole('textbox', { name: 'Outcome note' });

    await editor.focus();
    await editor.blur();

    await expect(editor).toHaveAttribute('aria-invalid', 'true');
    await expect(editor).toHaveAttribute('aria-describedby', /OutcomeNote_error/);
    await expect(page.getByText('Outcome note is required')).toBeVisible();
  });

  test('exposes italic and underline state through toolbar buttons', async ({ page }) => {
    const editor = page.getByRole('textbox', { name: 'Outcome note' });
    const toolbar = page.getByRole('toolbar', { name: 'Outcome note formatting options' });

    await editor.focus();
    await editor.press('Control+i');
    await editor.press('Control+u');
    await editor.pressSequentially('Emphasised and underlined');

    await expect(toolbar.getByRole('button', { name: 'Italic' })).toHaveAttribute('aria-pressed', 'true');
    await expect(toolbar.getByRole('button', { name: 'Underline' })).toHaveAttribute('aria-pressed', 'true');
    await expect(editor.locator('em')).toContainText('Emphasised and underlined');
    await expect(editor.locator('u')).toContainText('Emphasised and underlined');
  });

  test('supports ordered and unordered list commands with accessible state', async ({ page }) => {
    const editor = page.getByRole('textbox', { name: 'Outcome note' });
    const toolbar = page.getByRole('toolbar', { name: 'Outcome note formatting options' });

    await editor.focus();
    await toolbar.getByRole('button', { name: 'Ordered List' }).click();
    await editor.pressSequentially('Ordered item');
    await expect(toolbar.getByRole('button', { name: 'Ordered List' })).toHaveAttribute('aria-pressed', 'true');
    await expect(editor.locator('ol')).toContainText('Ordered item');

    await editor.press('Enter');
    await toolbar.getByRole('button', { name: 'Bullet List' }).click();
    await editor.pressSequentially('Bullet item');
    await expect(toolbar.getByRole('button', { name: 'Bullet List' })).toHaveAttribute('aria-pressed', 'true');
    await expect(editor.locator('ul')).toContainText('Bullet item');
  });

  test('keeps the editor and toolbar keyboard reachable', async ({ page }) => {
    const toolbar = page.getByRole('toolbar', { name: 'Outcome note formatting options' });
    const undo = toolbar.getByRole('button', { name: 'Undo' });
    const redo = toolbar.getByRole('button', { name: 'Redo' });
    const bold = toolbar.getByRole('button', { name: 'Bold' });

    await undo.focus();
    await expect(undo).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(redo).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(bold).toBeFocused();
  });
});

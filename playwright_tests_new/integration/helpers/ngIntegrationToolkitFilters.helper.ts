import { expect, type Locator } from '@playwright/test';
import type { NgIntegrationToolkitConfigField } from '../mocks/ngIntegration.mock';

type ToolkitFilterValue = string | string[] | null;

type ToolkitFixedListItem = {
  code: string;
  label: string;
};

function getFixedListItems(field: NgIntegrationToolkitConfigField): ToolkitFixedListItem[] {
  const items = (field.field.field_type.fixed_list_items as Array<Partial<ToolkitFixedListItem>> | undefined) ?? [];
  return items.map((item) => ({
    code: String(item.code ?? ''),
    label: String(item.label ?? item.code ?? ''),
  }));
}

function getFixedListCodes(field: NgIntegrationToolkitConfigField): string[] {
  return getFixedListItems(field).map((item) => item.code);
}

function getFixedListLabels(field: NgIntegrationToolkitConfigField): string[] {
  return getFixedListItems(field).map((item) => item.label);
}

function getFieldType(field: NgIntegrationToolkitConfigField): string {
  return String(field.field.field_type.type);
}

function getFieldControlLocator(container: Locator, field: NgIntegrationToolkitConfigField): Locator | null {
  const fieldId = field.field.id;
  const type = getFieldType(field);

  if (type === 'FixedList') {
    return container.locator(`select#${fieldId}, #${fieldId} select`).first();
  }

  if (type === 'FixedRadioList' || type === 'YesOrNo' || type === 'MultiSelectList') {
    return container.locator(`#${fieldId}`).first();
  }

  return null;
}

function getFieldGroupLocator(container: Locator, field: NgIntegrationToolkitConfigField): Locator {
  return container.getByRole('group', { name: field.label });
}

function getFixedListSelectLocator(container: Locator, field: NgIntegrationToolkitConfigField): Locator {
  const fieldId = field.field.id;
  return container.locator(`select#${fieldId}, #${fieldId} select`).first();
}

async function assertGroupOptionsByLabel(
  container: Locator,
  field: NgIntegrationToolkitConfigField,
  role: 'radio' | 'checkbox',
  expectedLabels: string[]
): Promise<void> {
  const group = getFieldGroupLocator(container, field);
  await expect(group).toBeVisible();
  for (const label of expectedLabels) {
    await expect(group.getByRole(role, { name: label })).toBeVisible();
  }
}

async function assertSelectOptionsByLabel(
  container: Locator,
  field: NgIntegrationToolkitConfigField,
  expectedLabels: string[]
): Promise<void> {
  const select = getFixedListSelectLocator(container, field);
  await expect(select).toBeVisible();

  const options = select.locator('option');
  await expect
    .poll(async () => options.count(), {
      message: `expected toolkit field ${field.field.id} to render its selectable values`,
    })
    .toBeGreaterThanOrEqual(expectedLabels.length + 1);

  const renderedLabels = (await options.allTextContents())
    .map((label) => label.trim())
    .filter((label) => label.length > 0 && label !== '--Select a value--');

  expect(renderedLabels, `unexpected rendered labels for toolkit field ${field.field.id}`).toEqual(expectedLabels);
}

async function assertSelectableFieldOptions(container: Locator, field: NgIntegrationToolkitConfigField): Promise<void> {
  const type = getFieldType(field);

  if (type === 'YesOrNo') {
    await assertGroupOptionsByLabel(container, field, 'radio', ['Yes', 'No']);
    return;
  }

  if (type === 'FixedList') {
    await assertSelectOptionsByLabel(container, field, getFixedListLabels(field));
    return;
  }

  if (type === 'FixedRadioList') {
    await assertGroupOptionsByLabel(container, field, 'radio', getFixedListLabels(field));
    return;
  }

  if (type === 'MultiSelectList') {
    await assertGroupOptionsByLabel(container, field, 'checkbox', getFixedListLabels(field));
  }
}

async function selectGroupOptionByLabel(
  container: Locator,
  field: NgIntegrationToolkitConfigField,
  role: 'radio' | 'checkbox',
  label: string
): Promise<void> {
  const group = getFieldGroupLocator(container, field);
  await group.getByRole(role, { name: label }).check();
}

export async function assertNgIntegrationToolkitFieldsVisible(
  container: Locator,
  fields: NgIntegrationToolkitConfigField[]
): Promise<void> {
  for (const field of fields) {
    await expect(container.locator(`#${field.field.id}`).first()).toBeVisible();
  }
}

export async function assertNgIntegrationToolkitFixedListOptions(
  container: Locator,
  fields: NgIntegrationToolkitConfigField[]
): Promise<void> {
  for (const field of fields) {
    const control = getFieldControlLocator(container, field);
    if (control) {
      await expect(control).toBeVisible();
    }
    await assertSelectableFieldOptions(container, field);
  }
}

export async function fillNgIntegrationToolkitFilters(
  container: Locator,
  fields: NgIntegrationToolkitConfigField[]
): Promise<Record<string, ToolkitFilterValue>> {
  const values: Record<string, ToolkitFilterValue> = {};

  for (const field of fields) {
    const type = getFieldType(field);
    const fieldId = field.field.id;

    if (type === 'Text') {
      const textValue = `${field.label} test`;
      await container.locator(`#${fieldId}`).first().fill(textValue);
      values[fieldId] = textValue;
      continue;
    }

    if (type === 'FixedRadioList') {
      const firstItem = getFixedListItems(field)[0];
      await selectGroupOptionByLabel(container, field, 'radio', firstItem.label);
      values[fieldId] = firstItem.code;
      continue;
    }

    if (type === 'YesOrNo') {
      await selectGroupOptionByLabel(container, field, 'radio', 'Yes');
      values[fieldId] = 'Yes';
      continue;
    }

    if (type === 'FixedList') {
      const firstItem = getFixedListItems(field)[0];
      await getFixedListSelectLocator(container, field).selectOption({ label: firstItem.label });
      values[fieldId] = firstItem.code;
      continue;
    }

    if (type === 'MultiSelectList') {
      const multiValues = getFixedListItems(field);
      for (const item of multiValues) {
        await selectGroupOptionByLabel(container, field, 'checkbox', item.label);
      }
      values[fieldId] = multiValues.map((item) => item.code);
      continue;
    }

    values[fieldId] = null;
  }

  return values;
}

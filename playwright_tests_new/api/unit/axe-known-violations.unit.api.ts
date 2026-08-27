import { expect, test } from '@playwright/test';

import {
  findUnexpectedAxeViolations,
  summarizeAxeViolations,
  type KnownAxeViolation,
} from '../../E2E/utils/accessibility/axeKnownViolations';

test.describe('axe known violation baseline', { tag: '@svc-internal' }, () => {
  test('summarizes axe violations by rule and affected node count', () => {
    expect(
      summarizeAxeViolations([
        {
          id: 'label',
          description: 'Ensure every form element has a label',
          nodes: [{ target: ['#reason'] }, { target: ['#other-reason'] }],
        },
      ])
    ).toEqual([
      {
        id: 'label',
        description: 'Ensure every form element has a label',
        nodeCount: 2,
      },
    ]);
  });

  test('allows only the configured rule, description, and maximum node count', () => {
    const knownViolations: KnownAxeViolation[] = [
      {
        id: 'label',
        description: 'Ensure every form element has a label',
        maxNodes: 1,
      },
    ];

    expect(
      findUnexpectedAxeViolations(
        [
          {
            id: 'label',
            description: 'Ensure every form element has a label',
            nodeCount: 1,
          },
        ],
        knownViolations
      )
    ).toEqual([]);

    expect(
      findUnexpectedAxeViolations(
        [
          {
            id: 'label',
            description: 'Ensure every form element has a label',
            nodeCount: 2,
          },
          {
            id: 'aria-valid-attr-value',
            description: 'Ensure all ARIA attributes have valid values',
            nodeCount: 1,
          },
        ],
        knownViolations
      )
    ).toEqual([
      {
        id: 'label',
        description: 'Ensure every form element has a label',
        nodeCount: 2,
      },
      {
        id: 'aria-valid-attr-value',
        description: 'Ensure all ARIA attributes have valid values',
        nodeCount: 1,
      },
    ]);
  });
});

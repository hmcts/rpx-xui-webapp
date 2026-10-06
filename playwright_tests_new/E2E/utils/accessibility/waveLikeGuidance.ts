export function guidanceForRule(rule: string): {
  classification: string;
  impact: string;
  verify: string;
  url: string;
  title: string;
  criteria: string;
} {
  const guidance: Record<string, [string, string, string]> = {
    'h1-count': [
      'Heading convention — inspect the page hierarchy',
      'Heading navigation helps screen-reader users understand the page and locate its main subject.',
      'Inspect every h1 and navigate the heading list with a screen reader. Confirm the main heading identifies this page state and section levels reflect the content.',
    ],
    'heading-order': [
      'Structure heuristic — context review required',
      'Unexpected heading jumps can make section relationships harder to understand.',
      'Review the complete heading outline and navigate it with a screen reader; confirm each subsection has the intended parent.',
    ],
    'fieldset-legend': [
      'Missing or empty legend text — inspect the group',
      'Without a group question, individual radio or checkbox labels may not provide enough context.',
      'Inspect the fieldset accessible name in browser accessibility tools, then focus its controls with a screen reader and confirm the group question is announced.',
    ],
    'accessible-name': [
      'Name heuristic — confirm the computed accessible name',
      'An unnamed control may give screen-reader or speech-input users no way to identify its purpose.',
      'Inspect the computed accessible name, then use keyboard and screen-reader navigation to confirm the purpose is announced and matches the visible label.',
    ],
    'duplicate-id': [
      'DOM defect — inspect affected references',
      'Duplicate identifiers can make labels, descriptions and fragment links resolve to the wrong element.',
      'Confirm identifiers are unique and activate each affected label/error link; inspect the resulting name and description.',
    ],
    'error-summary-target': [
      'Broken target detected — verify the validation journey',
      'A broken error link prevents users from reaching the field that needs correction.',
      'Submit invalid data, activate every error-summary link by keyboard, and confirm focus reaches the correct field.',
    ],
    'image-alt': [
      'Alternative-text check — determine the image purpose',
      'Informative images need an equivalent description; decorative images should not add noise.',
      'Inspect the image accessible name and read the surrounding content with a screen reader to confirm equivalent meaning without duplication.',
    ],
    'table-headers': [
      'Table structure heuristic — confirm this is a data table',
      'Users navigating table cells need the associated row and column context.',
      'Inspect header associations and navigate data cells with a screen reader; use layout markup instead if this is not tabular data.',
    ],
    'document-title': [
      'Page-title check — review the title in context',
      'A descriptive title helps users identify the page when switching tabs or navigating history.',
      'Reload the state and confirm the browser title describes its purpose, including validation context when applicable.',
    ],
    'document-language': [
      'Missing language declaration detected',
      'Screen readers use the document language to select pronunciation rules.',
      'Inspect html lang in each English/Welsh state and confirm pronunciation with the appropriate screen-reader voice.',
    ],
    'main-landmark': [
      'Landmark convention — inspect the page structure',
      'A clear main region lets assistive-technology users bypass repeated navigation.',
      'Inspect the landmark list and navigate to main with a screen reader; confirm it contains the unique primary content.',
    ],
    'text-spacing-clipping': [
      'Layout heuristic — inspect the changed spacing',
      'Overlapping or clipped text can hide content when users increase text spacing.',
      'Apply line height 1.5 times font size, paragraph spacing 2 times font size, letter spacing 0.12em and word spacing 0.16em. Inspect the highlighted element and neighbouring content; confirm all text and controls remain readable and operable.',
    ],
  };
  const [classification, impact, verify] = guidance[rule] ?? [
    'Automated finding — verify before changing code',
    'The reported condition may prevent users from understanding or operating this page.',
    'Reproduce the recorded condition, inspect the accessibility tree and test the affected interaction by keyboard and screen reader. Rerun this audit after the change.',
  ];
  const links: Record<string, [string, string]> = {
    'text-spacing-clipping': ['https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html', 'W3C: understanding text spacing'],
    'document-language': [
      'https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html',
      'W3C: understanding language of page',
    ],
    'document-title': ['https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html', 'W3C: understanding page titles'],
    'error-summary-target': ['https://design-system.service.gov.uk/components/error-summary/', 'GOV.UK: error summaries'],
    'main-landmark': ['https://www.w3.org/WAI/tutorials/page-structure/regions/', 'W3C WAI: page regions'],
    'fieldset-legend': ['https://www.w3.org/WAI/tutorials/forms/grouping/', 'W3C WAI: grouping controls'],
    'accessible-name': ['https://www.w3.org/WAI/tutorials/forms/labels/', 'W3C WAI: labelling controls'],
    'image-alt': ['https://www.w3.org/WAI/tutorials/images/', 'W3C WAI: text alternatives for images'],
    'table-headers': ['https://www.w3.org/WAI/tutorials/tables/', 'W3C WAI: accessible tables'],
    'h1-count': ['https://www.w3.org/WAI/tutorials/page-structure/headings/', 'W3C WAI: page headings'],
    'heading-order': ['https://www.w3.org/WAI/tutorials/page-structure/headings/', 'W3C WAI: page headings'],
  };
  const [url, title] = links[rule] ?? ['https://www.w3.org/WAI/tutorials/', 'W3C WAI: accessibility tutorials'];
  const criteriaByRule: Record<string, string> = {
    'h1-count': 'GOV.UK heading convention; not a standalone WCAG failure. Review 1.3.1 (A) and 2.4.6 (AA) in context.',
    'heading-order': 'Related: 1.3.1 (A). A heading-level jump alone does not establish a failure.',
    'fieldset-legend': 'Related: 1.3.1 (A) and 3.3.2 (A). Verify the group relationship and instructions.',
    'accessible-name':
      'Related: 4.1.2 (A); for visible labels also check 2.5.3 (A, added in WCAG 2.1). Verify the computed name.',
    'duplicate-id':
      'Inspect affected relationships against 1.3.1 (A) or 4.1.2 (A); duplicate IDs alone do not prove either failure.',
    'error-summary-target': 'Related: 2.4.3 (A) and 3.3.1 (A). Confirm keyboard focus and identification of the error.',
    'image-alt': 'Related: 1.1.1 (A). The required alternative depends on image purpose.',
    'table-headers': 'Related: 1.3.1 (A). Verify data-cell header relationships.',
    'document-title': 'Related: 2.4.2 (A). The title must describe the page topic or purpose.',
    'document-language': 'Related: 3.1.1 (A); translated passages may also require 3.1.2 (AA).',
    'main-landmark': 'Related: 2.4.1 (A). A main landmark is one technique for bypassing repeated content.',
    'text-spacing-clipping': 'Related: 1.4.12 (AA, added in WCAG 2.1). Confirm actual loss of content or functionality.',
  };
  const criteria =
    criteriaByRule[rule] ?? 'No verified criterion mapping; consult the linked guidance and inspect the condition.';
  return { classification, impact, verify, url, title, criteria };
}

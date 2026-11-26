import { ElementRef } from '@angular/core';
import { VoiceAccessibilityDirective } from './voice-accessibility.directive';

describe('VoiceAccessibilityDirective', () => {
  let host: HTMLElement;
  let directive: VoiceAccessibilityDirective;

  beforeEach(() => {
    host = document.createElement('ccd-search-result');
    directive = new VoiceAccessibilityDirective(new ElementRef(host));
  });

  afterEach(() => {
    directive.ngOnDestroy();
    host.remove();
  });

  it('makes sortable result headings speech-addressable and keyboard operable', () => {
    const heading = document.createElement('div');
    heading.className = 'search-result-column-label';
    heading.textContent = 'SC number';
    host.appendChild(heading);
    directive.ngOnInit();

    expect(heading.getAttribute('role')).toBe('button');
    expect(heading.getAttribute('tabindex')).toBe('0');
    expect(heading.getAttribute('aria-label')).toBe('Sort by SC number');

    const click = jasmine.createSpy('click');
    heading.click = click;
    ['Enter', ' '].forEach((key) => {
      const event = new KeyboardEvent('keydown', { key, cancelable: true });
      Object.defineProperty(event, 'target', { value: heading });

      directive.onKeydown(event);

      expect(event.defaultPrevented).toBe(true);
    });
    expect(click).toHaveBeenCalledTimes(2);
  });

  it('ignores empty headings and non-activation keys', () => {
    const emptyHeading = document.createElement('div');
    emptyHeading.className = 'search-result-column-label';
    const heading = document.createElement('div');
    heading.className = 'search-result-column-label';
    heading.textContent = 'Case type';
    host.append(emptyHeading, heading);
    directive.ngOnInit();

    expect(emptyHeading.hasAttribute('role')).toBe(false);
    expect(heading.getAttribute('aria-label')).toBe('Sort by Case type');

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true });
    Object.defineProperty(event, 'target', { value: heading });
    directive.onKeydown(event);
    expect(event.defaultPrevented).toBe(false);

    const outsideEvent = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
    Object.defineProperty(outsideEvent, 'target', { value: document.createElement('button') });
    directive.onKeydown(outsideEvent);
    expect(outsideEvent.defaultPrevented).toBe(false);
  });

  it('adds a descriptive name to a filter control from its associated label', () => {
    host = document.createElement('ccd-search-filters-wrapper');
    directive = new VoiceAccessibilityDirective(new ElementRef(host));
    const group = document.createElement('div');
    group.className = 'form-group';
    const label = document.createElement('label');
    label.htmlFor = 'sc-number';
    label.textContent = 'SC number';
    const input = document.createElement('input');
    input.id = 'sc-number';
    group.append(label, input);
    host.appendChild(group);
    document.body.appendChild(host);

    directive.ngOnInit();

    expect(input.getAttribute('aria-label')).toBe('SC number');
  });

  it('preserves accessible names and names case links by their reference', () => {
    host = document.createElement('ccd-workbasket-filters');
    directive = new VoiceAccessibilityDirective(new ElementRef(host));
    const namedInput = document.createElement('input');
    namedInput.setAttribute('aria-label', 'Already named');
    const labelledBy = document.createElement('span');
    labelledBy.id = 'control-label';
    labelledBy.textContent = 'Status';
    const labelledInput = document.createElement('input');
    labelledInput.setAttribute('aria-labelledby', 'control-label');
    const link = document.createElement('a');
    link.setAttribute('aria-label', 'go to case with Case reference: 123456789');
    host.append(namedInput, labelledBy, labelledInput, link);

    directive.ngOnInit();

    expect(namedInput.getAttribute('aria-label')).toBe('Already named');
    expect(labelledInput.hasAttribute('aria-label')).toBe(false);
    expect(link.getAttribute('aria-label')).toBe('Open case 123456789');
  });

  it('does not infer a control name when its group has multiple labels', () => {
    host = document.createElement('ccd-search-filters-wrapper');
    directive = new VoiceAccessibilityDirective(new ElementRef(host));
    const group = document.createElement('div');
    group.className = 'form-group';
    const firstLabel = document.createElement('label');
    firstLabel.textContent = 'From';
    const secondLabel = document.createElement('label');
    secondLabel.textContent = 'To';
    const input = document.createElement('input');
    group.append(firstLabel, secondLabel, input);
    host.appendChild(group);

    directive.ngOnInit();

    expect(input.hasAttribute('aria-label')).toBe(false);
  });

  it('applies semantics to result headings rendered after the component initializes', async () => {
    directive.ngOnInit();

    const heading = document.createElement('div');
    heading.className = 'search-result-column-label';
    heading.textContent = 'Case state';
    host.appendChild(heading);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(heading.getAttribute('role')).toBe('button');
    expect(heading.getAttribute('aria-label')).toBe('Sort by Case state');
  });

  it('keeps rich-text case fields usable as named, focusable dictation text boxes', () => {
    host = document.createElement('ccd-case-edit');
    directive = new VoiceAccessibilityDirective(new ElementRef(host));
    const field = document.createElement('div');
    field.className = 'ccd-rich-text-area';
    const label = document.createElement('span');
    label.className = 'form-label';
    label.textContent = 'Directions';
    const editor = document.createElement('div');
    editor.className = 'ccd-rich-text-area__editor';
    const editable = document.createElement('div');
    editable.className = 'ProseMirror';
    editable.setAttribute('contenteditable', 'true');
    editor.appendChild(editable);
    field.append(label, editor);
    host.appendChild(field);

    directive.ngOnInit();

    expect(editable.getAttribute('role')).toBe('textbox');
    expect(editable.getAttribute('aria-multiline')).toBe('true');
    expect(editable.getAttribute('tabindex')).toBe('0');
    expect(editable.getAttribute('aria-label')).toBe('Directions');
    expect(editable.getAttribute('spellcheck')).toBe('true');
    expect(editable.getAttribute('autocorrect')).toBe('on');
  });

  it('keeps an existing rich-text accessible name and tolerates a missing visible label', () => {
    host = document.createElement('ccd-case-edit');
    directive = new VoiceAccessibilityDirective(new ElementRef(host));
    const labelledField = document.createElement('div');
    labelledField.className = 'ccd-rich-text-area';
    const labelledEditorContainer = document.createElement('div');
    labelledEditorContainer.className = 'ccd-rich-text-area__editor';
    const namedEditor = document.createElement('div');
    namedEditor.className = 'ProseMirror';
    namedEditor.setAttribute('contenteditable', 'true');
    namedEditor.setAttribute('aria-label', 'Existing name');
    const unlabelledField = document.createElement('div');
    unlabelledField.className = 'ccd-rich-text-area';
    const unlabelledEditorContainer = document.createElement('div');
    unlabelledEditorContainer.className = 'ccd-rich-text-area__editor';
    const unlabelledEditor = document.createElement('div');
    unlabelledEditor.className = 'ProseMirror';
    unlabelledEditor.setAttribute('contenteditable', 'true');
    labelledEditorContainer.appendChild(namedEditor);
    unlabelledEditorContainer.appendChild(unlabelledEditor);
    labelledField.appendChild(labelledEditorContainer);
    unlabelledField.appendChild(unlabelledEditorContainer);
    host.append(labelledField, unlabelledField);

    directive.ngOnInit();

    expect(namedEditor.getAttribute('aria-label')).toBe('Existing name');
    expect(unlabelledEditor.hasAttribute('role')).toBe(true);
    expect(unlabelledEditor.hasAttribute('aria-label')).toBe(false);
  });
});

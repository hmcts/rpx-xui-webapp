type CaseEventTriggerBuilderOptions = {
  caseId: string;
  eventId: string;
  eventName: string;
  description?: string;
};

export const buildCaseEventTriggerMock = ({ caseId, eventId, eventName, description }: CaseEventTriggerBuilderOptions) => ({
  id: eventId,
  name: eventName,
  description: description ?? eventName,
  case_id: caseId,
  case_fields: [],
  event_token: `mock-${eventId}-event-token`,
  wizard_pages: [
    {
      id: `${eventId}Page1`,
      label: eventName,
      order: 1,
      wizard_page_fields: [],
      show_condition: null,
      callback_url_mid_event: null,
      retries_timeout_mid_event: [],
    },
  ],
  show_summary: true,
  show_event_notes: false,
  end_button_label: 'Submit',
  can_save_draft: null,
  access_granted: 'STANDARD',
  access_process: 'NONE',
  title_display: null,
  supplementary_data: null,
  _links: {
    self: {
      href: `/data/internal/cases/${caseId}/event-triggers/${eventId}?ignore-warning=false`,
    },
  },
});

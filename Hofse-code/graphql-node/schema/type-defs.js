const { gql } = require("apollo-server");

const typeDefs = gql`
  type Acls {
    create: Boolean
    delete: Boolean
    read: Boolean
    role: String
    update: Boolean
  }

  type Events {
    id: String
    name: String
    description: String
    order: String
    case_fields: [String]
    pre_states: [String]
    post_states: [String]
    callback_url_about_to_start_event: String
    retries_timeout_about_to_start_event: String
    callback_url_about_to_submit_event: String
    retries_timeout_url_about_to_submit_event: String
    callback_url_submitted_event: String
    retries_timeout_url_submitted_event: String
    security_classification: String
    show_summary: String
    show_event_notes: String
    end_button_label: String
    can_save_draft: String
    publish: String
  }

  type Jurisdiction {
    id: ID
    name: String
    description: String
    caseTypes: [CaseType]
  }

  type Jurisdictions {
    jurisdictions: [Jurisdiction]
  }

  type CaseType {
    id: ID
    description: String
    version: String
    name: String
    events: [Events]
    acls: [Acls]
    states: [StatesType]
  }

  type StatesType {
    id: ID
    name: String
    description: String
    order: Int
    title_display: String
    acls: [Acls]
  }

  type Query {
    jurisdictions: [Jurisdiction!]!
    jurisdiction(id: ID!): Jurisdiction!
    casetypes: [CaseType!]!
    casetype(id: ID): [CaseType]!
    states: [StatesType!]!
    state(id: ID): [StatesType]
  }
`;

module.exports = { typeDefs };

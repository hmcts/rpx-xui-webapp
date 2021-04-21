export interface ElasticSearchQuery {
  native_es_query: RequestBodySearch
  supplementary_data: string[]
}

export interface RequestBodySearch {
  from?: number,
  sort?: Array<{ [key: string]: {} }>
  query?: Query
  size?: number,
}

interface Query {
  bool: Bool
}

interface Bool {
  must: Must[]
}

interface Must {
  match?: Match
  wildcard?: WildCard
}

export interface Match {
  match: { [key: string]: {} }
}

export interface WildCard {
  wildcard: { [key: string]: {} }
}

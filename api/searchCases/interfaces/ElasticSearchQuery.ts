export interface ElasticSearchQuery {
  native_es_query: RequestBodySearch;
  supplementary_data: string[];
}

export interface RequestBodySearch {
  from?: number;
  sort?: { [key: string]: object }[];
  query?: Query;
  size?: number;
}

export interface Query {
  bool?: Bool;
  terms?: { [key: string]: any };
  term?: { [key: string]: any };
}

export interface Bool {
  must: Must[];
}

export interface Must {
  match?: Match;
  wildcard?: WildCard;
}

export interface Match {
  match: { [key: string]: object };
}

export interface WildCard {
  wildcard: { [key: string]: object };
}

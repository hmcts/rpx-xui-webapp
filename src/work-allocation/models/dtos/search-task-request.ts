export interface SearchTaskRequest {
  search_parameters: [
    {
      key: string,
      operator: string,
      values: [
        string
      ]
    }
  ]
}

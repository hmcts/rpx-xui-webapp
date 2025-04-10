export interface ServiceMessage {
  caseType?: string;
  jurisdiction?: string;
  markdown: string;
  pages: string;
}

export interface ServiceMessagesResponse {
  messages: ServiceMessage[];
}

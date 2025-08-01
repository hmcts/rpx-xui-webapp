export interface ServiceMessage {
  caseType?: string;
  jurisdiction?: string;
  markdown: string;
  pages: string;
}

export interface ServiceAttachmentHintText {
  caseType?: string;
  jurisdiction?: string;
  hintText: string;
}

export interface ServiceMessagesResponse {
  messages: ServiceMessage[];
}

export interface ServiceAttachmentHintTextResponse {
  attachment: ServiceAttachmentHintText[];
}

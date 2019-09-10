export enum Classification {
    Public = 'PUBLIC',
    Private = 'PRIVATE',
    Restricted = 'RESTRICTED',
}

export interface DMDocument extends DMDocumentVersion {
    classification: Classification
    lastModifiedBy: string
    modifiedOn: Date
    _embedded: {
        allDocumentVersions: {
            _embedded: DMDocumentVersion[]
        }
    }
}

export interface DMDocumentVersion {
  createdBy: string
  createdOn: string
  mimeType: string
  originalDocumentName: string
  size: number
  _links: DMDocumentLinks
}

export interface DMDocumentLink {
    href: string
}

export interface DMDocumentLinks {
    binary: DMDocumentLink
    document?: DMDocumentLink
    migrate?: DMDocumentLink
    self: DMDocumentLink
    thumbnail: DMDocumentLink
}

export interface DMDocuments {
    _embedded: {
        documents: DMDocument[]
    }
}

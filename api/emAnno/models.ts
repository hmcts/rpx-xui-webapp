export interface Annotations {
    annotations: Annotation[]
    createdBy: string
    createdByDetails: {forename: string, surname: string, email: string}
    createdDate: string
    documentId: string
    id: string
    lastModifiedBy: string
    lastModifiedByDetails: {forename: string, surname: string, email: string}
    lastModifiedDate: string
}

export interface Annotation {
    annotationSetId: string
    color: string
    comments: AnnotationComment[]
    createdBy: string
    createdByDetails: {forename: string, surname: string, email: string}
    createdDate: string
    id: string
    lastModifiedBy: string
    lastModifiedByDetails: {forename: string, surname: string, email: string}
    lastModifiedDate: string
    page: number
    rectangles: AnnotationRectangle[]
    type: string
}

interface AnnotationComment {
    annotationId: string
    content: string
    createdBy: string
    createdByDetails: {forename: string, surname: string, email: string}
    createdDate: string
    id: string
    lastModifiedBy: string
    lastModifiedByDetails: {forename: string, surname: string, email: string}
    lastModifiedDate: string
}

interface AnnotationRectangle {
    annotationId: string
    createdBy: string
    createdByDetails: {forename: string, surname: string, email: string}
    createdDate: string
    height: number
    id: string
    lastModifiedBy: string
    lastModifiedByDetails: {forename: string, surname: string, email: string}
    lastModifiedDate: string
    width: number
    x: number
    y: number
}

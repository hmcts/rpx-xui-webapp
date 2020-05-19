export interface Redaction {
    redactionId: string,
    documentId: string,
    page: number,
    rectangles: RedactionRectangle[]
}

interface RedactionRectangle {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number
}

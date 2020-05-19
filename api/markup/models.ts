export interface Markup {
    redactionId: string,
    documentId: string,
    page: number,
    rectangles: MarkupRectangle[]
}

interface MarkupRectangle {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number
}

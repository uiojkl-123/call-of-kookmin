export class CallClass {
    id: string
    title: string
    content: string
    price: number
    date: Date
    location: string
    createdAt: Date
    writer: string
    isMatched : boolean
    matchedFeed?: string

    constructor(id: string, title: string, content: string, price: number, date: Date, location: string, createdAt: Date, writer: string, isMatched:boolean) {
        this.id = id
        this.title = title
        this.content = content
        this.price = price
        this.date = date
        this.location = location
        this.createdAt = createdAt
        this.writer = writer
        this.isMatched = isMatched
    }
}
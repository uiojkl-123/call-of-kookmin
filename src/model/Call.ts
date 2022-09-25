export class Call {
    id?: string
    title: string
    content: string
    price: number
    date: Date
    location: string
    createdAt: Date
    writer: string

    constructor(id: string | undefined, title: string, content: string, price: number, date: Date, location: string, createdAt: Date, writer: string) {
        this.id = id
        this.title = title
        this.content = content
        this.price = price
        this.date = date
        this.location = location
        this.createdAt = createdAt
        this.writer = writer
    }
}
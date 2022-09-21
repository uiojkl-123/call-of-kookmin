export class Call {
    id?: string
    title: string
    content: string
    date: Date
    startLocation: string

    constructor(id: string | undefined, title: string, content: string, date: Date, startLocation: string) {
        this.id = id
        this.title = title
        this.content = content
        this.date = date
        this.startLocation = startLocation
    }
}
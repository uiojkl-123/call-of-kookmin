import { CallClass } from "../model/Call";

export const callConverter = {
    toFirestore: function (call: CallClass) {
        return {
            id: call.id,
            title: call.title,
            content: call.content,
            date: call.date,
            startLocation: call.location,
            createdAt: call.createdAt,
            writer: call.writer,
            isMatched: call.isMatched,
        };
    },
    fromFirestore: function (snapshot: { data: (arg0: any) => any; id: string; }, options: any) {
        const data = snapshot.data(options);
        return new CallClass(snapshot.id, data.title, data.content, data.price, data.date.toDate(), data.location, data.createdAt, data.writer, data.isMatched);
    },
};
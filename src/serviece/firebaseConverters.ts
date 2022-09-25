import { Call } from "../model/Call";

export const callConverter = {
    toFirestore: function (call: Call) {
        return {
            title: call.title,
            content: call.content,
            date: call.date,
            startLocation: call.location,
            createdAt: call.createdAt,
            writer: call.writer
        };
    },
    fromFirestore: function (snapshot: { data: (arg0: any) => any; id: string; }, options: any) {
        const data = snapshot.data(options);
        return new Call(snapshot.id, data.title, data.content, data.price, data.date, data.startLocation, data.createdAt, data.writer);
    },
};
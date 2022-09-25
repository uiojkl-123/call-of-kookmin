import { Timestamp } from "firebase/firestore";

interface WrongTimestamp {
    seconds: number
    nanoseconds: number
}
class WrongTimestamp {
    seconds: number
    nanoseconds: number
    constructor(seconds: number, nanoseconds: number) {
        this.nanoseconds = nanoseconds;
        this.seconds = seconds
    }
}

export function displayTime(value: Timestamp | WrongTimestamp | Date) {

    const today = new Date();
    let timeValue
    if (value instanceof Timestamp) {
        timeValue = value.toDate();
    } else if (value instanceof Object && value instanceof WrongTimestamp) {
        timeValue = new Date(value.seconds * 1000)
    } else if (typeof value === 'object' && value instanceof Date) {
        timeValue = value;
    } else {
        console.error(value);
        throw new Error('시간 정보가 잘 못 입력되었습니다.')
    }

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
}
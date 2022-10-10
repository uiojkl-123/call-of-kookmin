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

export function remainingTime(value: Timestamp | WrongTimestamp | Date) {

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

    if (today > timeValue){
        return '요청이 만료되었습니다.';
    }
    
    const betweenTime = Math.floor((timeValue.getTime() - today.getTime()) / 1000);
    const betweenTimeSecond = betweenTime % 60;
    const betweenTimeMinute = Math.floor(betweenTime / 60) % 60;
    const betweenTimeHour = Math.floor(betweenTime / 3600) % 24;
    const betweenTimeDay = Math.floor(betweenTime / 3600 / 24);

    return `${Math.floor(betweenTimeDay / 365) ? Math.floor(betweenTimeDay / 365) + ' 년' : ''}
    ${betweenTimeDay ? betweenTimeDay % 365 + '일': ''}
    ${betweenTimeHour ? betweenTimeHour + '시간' : ''}
    ${betweenTimeMinute ? betweenTimeMinute + '분' : ''}
    ${betweenTimeSecond ? betweenTimeSecond + '초' : ''}
    `;
}

export function callTime(value: Timestamp | WrongTimestamp | Date) {

    let timeValue;

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

    return  `${(timeValue.getMonth() + 1).toString()}월
        ${timeValue.getDate().toString()}일
        ${timeValue.getHours().toString()} 시
        ${timeValue.getMinutes().toString()}분`
}

export function timeToDate(value: Timestamp | WrongTimestamp | Date){
    let timeValue;

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

    return timeValue;
}
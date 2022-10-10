import React, { useEffect, useState } from 'react'
import './Count.scss'

interface CountProps {
    time: Date
}

export const Count: React.FC<CountProps> = (props) => {

    const counter = () => {
        const difference = +new Date(props.time) - +new Date();
        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor(difference / (1000 * 60 * 60) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return false;
    }

    const [countTime, setcountTime] = useState<any>(counter());
    const [display, setDisplay] = useState<boolean>(true);

    useEffect(() => {
        const cnt = setInterval(() => {
            if (!counter()) {
                setDisplay(false);
                clearInterval(cnt);
            }
            setcountTime(counter());
            
        }, 1000);
        return ()=>{
            clearInterval(cnt);
        }
    },[]);

    return (
        <div>
            {countTime.days ? <span>{countTime.days + '일 '}</span> : null}
            {countTime.hours ? <span>{countTime.hours + '시간 '}</span> : null}

            {countTime.minutes ?
                <>
                    <span className={countTime.minutes < 5 ? 'red' : ''}>{countTime.minutes + '분 '}</span>
                </>
                : null}

            {display ?
                <>
                    <span className={countTime.minutes < 5 && (!countTime.hours && !countTime.days) ? 'red' : ''}>{countTime.seconds}</span>초
                </>
                :
                <span>시간 종료</span>
            }
        </div>
    )
}

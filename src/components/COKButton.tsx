import { IonButton, IonCard, IonCardContent, IonCardTitle, IonContent, IonSpinner } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import './COKButton.scss'

interface COKButtonProps{
    text:string
    cancle?:boolean
    onClick:Function
    id?:string
    className?: string | undefined
    disabled?: boolean
    style?: Object
    textButton?: boolean
    color?: string
}

export /**
 *
 *
 * @param {string} text - 버튼에 표시될 텍스트
 * @param {boolean} [cancle=false] - 취소 버튼인지 여부
 * @param {Function} onClick - 버튼 클릭시 실행될 함수
 * @param {string} [id=''] - 버튼에 id를 부여할 수 있음
 * @param {string} [className=''] - 버튼에 className을 부여할 수 있음
 * @param {boolean} [disabled=false] - 버튼을 비활성화 할 수 있음
 * @param {Object} [style={}] - 버튼에 style을 부여할 수 있음
 * @param {boolean} [textButton=false] - 텍스트 버튼인지 여부
 * @param {string} [color=''] - 버튼 색상
 * @return {*} 
 */
const COKButton:React.FC<COKButtonProps> = (props) => {

    const [loading, setLoading] = useState<boolean>(false);

    const mountRef = useRef(true)

    useEffect(() => {
        return () => {
            mountRef.current = false
        }
    }, [])


    const handleOnClick = async () => {
        setLoading(true)
        try {
            if (props.onClick) {
                try {
                    await props.onClick()
                        .then(() => {
                            if (mountRef.current)
                                setLoading(false)

                        }).catch((err: any) => { if (mountRef.current) setLoading(false); alert(err) })
                } catch (err: any) {
                    if (mountRef.current)
                        setLoading(false)
                }
            } else if (props.onClick === undefined) {
                if (mountRef.current)
                    setLoading(false)
                return
            } else {
                if (mountRef.current)
                    setLoading(false)
                return
            }
        } catch (err) {
            if (mountRef.current)
                setLoading(false);
            console.log(err)
        }
        if (mountRef.current)
            setLoading(false);
    }

    return (
        props.textButton ?
            <div className='dltbuttonText'>
                <div
                    style={props.style}
                    id={props.id}
                    className={props.className}
                    onClick={props.disabled ? () => { }
                        : handleOnClick}>
                    {loading ? <IonSpinner name='dots' color='medium' className='spinner'></IonSpinner> : props.children}
                </div>
            </div>
            :
            <IonButton color={props.color} style={props.style} id={props.id} className={props.cancle ? 'COKCancleButton ' + props.className : 'COKButton ' + props.className} disabled={loading || props.disabled} onClick={handleOnClick}>{loading ? <IonSpinner></IonSpinner> : props.text}</IonButton>
    )
}

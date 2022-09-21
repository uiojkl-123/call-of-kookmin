import { IonButton, IonCard, IonCardContent, IonCardTitle, IonContent } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router';
import './COKButton.scss'

interface COKButtonProps{
    text:string
    cancle?:boolean
    onClick:Function
    id?:string
}

export const COKButton:React.FC<COKButtonProps> = (props) => {

    return (
        <IonButton className={props.cancle ? 'COKCancleButton': 'COKButton'}
            onClick={()=>props.onClick()}
            id={props.id}
        >
            {props.text}
        </IonButton>
    )
}

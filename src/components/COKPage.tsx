import { IonCol, IonContent } from '@ionic/react'
import React from 'react'
import { COKButton } from './COKButton'
import './COKPage.scss'

interface COKPageProps{
    title:string
    buttons:{text:string, cancle?: boolean, onClick: Function}[]
}

export const COKPage:React.FC<COKPageProps> = (props) => {
  
    return (
        <div className='cokPage'>
            <h1>{props.title}</h1>

            <div>
                {props.children}
            </div>

            <div className='buttons'>
                {props.buttons.map((value)=>{
                    return(
                        <COKButton 
                        text={value.text}
                        onClick={value.onClick}
                        cancle={value.cancle}
                        />
                    )
                })}
            </div>

        </div>
  )
}

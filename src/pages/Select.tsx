import { IonPage } from '@ionic/react'
import React from 'react'
import { useParams } from 'react-router'
import { Cafe } from '../components/Cafe'
import { Convenience } from '../components/Convenience'
import { Custom } from '../components/Custom'
import { Send } from '../components/Send'

export const Select = () => {

    const param = useParams<{ kind: 'convenience' | 'cafe' | 'send' | 'custom' }>()

    const kind = param?.kind

    return (
        <IonPage className='selectPage'>
            {
                kind === 'convenience' ? <Convenience></Convenience> :
                    kind === 'cafe' ? <Cafe></Cafe> :
                        kind === 'send' ? <Send></Send> :
                            kind === 'custom' ? <Custom></Custom> :
                                null
            }
        </IonPage>
    )
}

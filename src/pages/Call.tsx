import { IonCard, IonGrid, IonIcon, IonPage } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router'
import './Call.scss'

export const Call = () => {

    const history = useHistory()

    return (
        <IonPage className='callPage'>
            <div className='toolbar'>
                <IonIcon icon={arrowBack} className='icon' onClick={() => history.goBack()} />
            </div>
            <div className='textBox'>
                <h1>부름 종류를 선택해주세요.</h1>
            </div>
            <IonGrid>
                <IonCard onClick={() => history.push('/select/convenience')}>간편 주문</IonCard>
                <IonCard onClick={() => history.push('/select/custom')}>직접 입력</IonCard>
            </IonGrid>
        </IonPage>
    )
}

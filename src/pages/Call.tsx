import { IonCard, IonGrid, IonPage } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'
import './Call.scss'

export const Call = () => {

    const history = useHistory()

    return (
        <IonPage className='callPage'>

            <h1>부름 종류를 선택해주세요.</h1>
            <IonGrid>
                <IonCard onClick={()=>history.push('/select/convenience')}>편의점</IonCard>
                <IonCard onClick={()=>history.push('/select/cafe')}>카페</IonCard>
                <IonCard onClick={()=>history.push('/select/send')}>물품 전달</IonCard>
                <IonCard onClick={()=>history.push('/select/custom')}>직접 입력</IonCard>
            </IonGrid>
        </IonPage>
    )
}

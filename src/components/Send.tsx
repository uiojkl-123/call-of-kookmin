import { IonContent, IonIcon, IonInput, IonItem, IonLabel } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router'
import './Send.scss'

export const Send = () => {

  const history = useHistory();

  return (
    <IonContent className='container'>
      <div className='toolbar'>
        <IonIcon icon={arrowBack} className='icon' onClick={() => history.goBack()} />
      </div>
      <div className='items'>
        <IonItem>
          <IonLabel>픽업 장소</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>배송 장소</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>배달 완료 시간</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>배달비</IonLabel>
          <IonInput></IonInput>
        </IonItem>
      </div>
    </IonContent>
  )
}

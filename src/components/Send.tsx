import { IonContent, IonInput, IonItem, IonLabel } from '@ionic/react'
import React from 'react'

export const Send = () => {
  return (
    <IonContent>
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
    </IonContent>
  )
}

import { IonCard, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react'
import React from 'react';
import { useHistory } from 'react-router';
import { db } from '../static/constants';


export const FeedPage = () => {

  const index = parseInt(window.location.href.split('=')[1]) - 1;

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse='condense' style={{ position: 'fixed' }}>
          <IonToolbar style={{ padding: '0' }}>
            <h1>국민의 부름</h1>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          {db[index].title}<br />
          {db[index].content}<br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </IonCard>

      </IonContent>
    </IonPage>
  )
}

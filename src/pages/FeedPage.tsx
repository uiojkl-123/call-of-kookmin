import { IonButton, IonCard, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react'
import React from 'react';
import { useHistory } from 'react-router';
import { db } from '../static/constants';


export const FeedPage = () => {

  //22. 9. 8 Get 방식으로 URL에서 /feedPage?pageNum=01에서 01 가져와서 index에 할당함
  const index = parseInt(window.location.href.split('=')[1]) - 1;

  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse='condense' style={{ position: 'fixed' }}>
          <IonToolbar style={{ padding: '0' }}>
            <h1 onClick={()=>history.push('/main')}>국민의 부름</h1>
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

        <IonButton style={{
          position:'fixed',
          zIndex:'10', 
          width:'calc(100% - 32px)',
          bottom:'16px',  
          fontSize:'20px',
          padding:'0 8px 0 8px',
          margin:'0 16px'
          }}>
          요청 수락
        </IonButton>

      </IonContent>
    </IonPage>
  )
}

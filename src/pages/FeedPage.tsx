import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { db } from '../static/constants';
import { personCircleOutline } from 'ionicons/icons';


export const FeedPage = () => {

  //22. 9. 8 Get 방식으로 URL에서 /feedPage?pageNum=01에서 01 가져와서 index에 할당함
  const index = parseInt(window.location.href.split('=')[1]) - 1;

  const [idx, setIdx] = useState<number>();

  useEffect(()=>{
    setIdx(index)
  },[index])


  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse='condense' style={{ position: 'fixed' }}>
          <IonToolbar style={{ padding: '0' }}>
            <h1 onClick={()=>history.push('/main')}>국민의 부름</h1>
          </IonToolbar>
        </IonHeader>

        <IonCard style={{ marginTop:'80px', padding:'16px' }}>
        
          <div style={{width:'100%', height:'40px', display:'flex'}}>
            <div style={{width:'40px', height:'40px'}}>
              <IonIcon icon={personCircleOutline} size='large' />
            </div>  
            <div style={{width:'100%', height:'40px', marginLeft:'5px'}}>
              <div style={{height:'20px'}}>
                익명(과학관 2층)
              </div>
              <div style={{height:'20px'}}>
                5분 전
              </div>
            </div>
          </div>
          
          <br />
          {idx?  <span style={{fontSize:'20px'}}>{db[idx].title}</span>
          : null}
         
          <br /><br />
          {db[index].content}<br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          
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

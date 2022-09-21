import { IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRippleEffect, IonTextarea } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { COKButton } from '../components/COKButton'
import { uploadCall } from '../serviece/call.service'
import './Call.scss'

export const Call = () => {

  const history = useHistory();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [startLocation, setStartLocation] = useState<string>('');

  const [price, setPrice] = useState<number>();

  const [date, setDate] = useState<Date>(new Date());

  return (
    <IonPage className='callPage'>
      <header>
        <h1>국민의 부름 </h1>
      </header>

      <div className='tabs'>
        <div onClick={() => history.push('/call')} className='ion-activatable'>부르기
          <IonRippleEffect type='bounded'></IonRippleEffect></div>
        <div onClick={() => history.push('/accept')}>부름에 응답</div>
      </div>

      <IonContent className='container' >
        <div className='content'>
          <IonItem>
            <IonInput value={title} onIonChange={(e: any) => setTitle(e.target.value)} placeholder='제목 *'></IonInput>
          </IonItem>
          <div className='precautions'>
            (요청 위치, 요청 시간, 요청 사항을 필수적으로 포함해서 작성해주시기 바랍니다.)
          </div>
          <IonItem>
            <IonInput value={startLocation} onIonChange={(e: any) => setStartLocation(e.target.value)} placeholder='도착지 *'></IonInput>
          </IonItem>
          <IonItem>
            <IonInput type='number' value={price} onIonChange={(e: any) => setPrice(e.target.value)} placeholder='가격 *'></IonInput>
          </IonItem>
          <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
          <IonItem className='textarea'>
            <IonTextarea cols={30} autoGrow value={content} onIonChange={(e: any) => setContent(e.target.value)} placeholder='상세내용'></IonTextarea>
          </IonItem>
        </div>

        <div className='button' >
          <COKButton text={'부르기'} onClick={() => { uploadCall({
            content,
            title,
            date,
            startLocation
          })}} />
        </div>
      </IonContent>

      <IonModal mode='ios' keepContentsMounted={true}>
        <IonDatetime mode='ios' id="datetime"></IonDatetime>
      </IonModal>
    </IonPage>
  )
}

import { DatetimeChangeEventDetail, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRippleEffect, IonTextarea } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { COKButton } from '../components/COKButton'
import { uploadCall } from '../serviece/call.service'
import './Call.scss'
import { format, parseISO } from 'date-fns'

export const Call = () => {

  const history = useHistory();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [startLocation, setStartLocation] = useState<string>('');

  const [price, setPrice] = useState<number>();

  const [date, setDate] = useState<Date>(new Date());

  const isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  }

  const handleCall = async () => {
    const call = {
      title: title,
      content: content,
      startLocation: startLocation,
      price: price,
      date: date
    }
    await uploadCall(call)
    alert('부름 완료')
  }

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
            <IonLabel position='stacked'>제목 *</IonLabel>
            <IonInput value={title} onIonChange={(e: any) => setTitle(e.target.value)} ></IonInput>
          </IonItem>
          <div className='precautions'>
            (요청 위치, 요청 시간, 요청 사항을 필수적으로 포함해서 작성해주시기 바랍니다.)
          </div>
          <IonItem>
            <IonLabel position='stacked'>도착지 *</IonLabel>

            <IonInput value={startLocation} onIonChange={(e: any) => setStartLocation(e.target.value)} ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>가격 *</IonLabel>
            <IonInput type='number' value={price} onIonChange={(e: any) => setPrice(e.target.value)} ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>완료 기한</IonLabel>
            <IonDatetimeButton datetime="datetime" mode='ios' ></IonDatetimeButton>
          </IonItem>
          <IonItem className='textarea'>
            <IonLabel position='stacked'>상세내용</IonLabel>
            <IonTextarea cols={30} autoGrow value={content} onIonChange={(e: any) => setContent(e.target.value)} ></IonTextarea>
          </IonItem>
        </div>

        <div className='button' >
          <COKButton text={'부르기'} onClick={handleCall} />
        </div>
      </IonContent>

      <IonModal mode='ios' keepContentsMounted={true}>
        <IonDatetime mode='ios' id="datetime" minuteValues="0,15,30,45" onIonChange={(e: any) => { setDate(parseISO(e.detail.value)) }} isDateEnabled={isWeekday}></IonDatetime>
      </IonModal>
    </IonPage>
  )
}

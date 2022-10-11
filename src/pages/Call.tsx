import { DatetimeChangeEventDetail, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRippleEffect, IonTextarea } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { COKButton } from '../components/COKButton'
import { uploadCall } from '../serviece/call.service'
import './Call.scss'
import { format, parseISO } from 'date-fns'
import { useStore } from '../store/store'
import { Timestamp } from 'firebase/firestore'
import { isMatch } from 'date-fns/esm'
import { CallClass } from '../model/Call'

export const Call = () => {

  const history = useHistory();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const [price, setPrice] = useState<number>(1000);

  const [date, setDate] = useState<Date>(new Date());

  const { currentUser } = useStore()

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
    if (!currentUser?.userId) return;
    if (!title || !content || !location || !price || !date) return;
    const call = {
      title: title,
      content: content,
      location: location,
      price: price,
      date: date,
      createdAt: new Date(),
      writer: currentUser?.userId,
      isMatched: false
    }
    await uploadCall(call)
    alert('부름 완료')
  }



  return (
    <>
      <IonContent className='container' >
        <div className='content'>
          <IonItem>
            <IonLabel position='stacked'>제목 *</IonLabel>
            <IonInput value={title} onIonChange={(e: any) => setTitle(e.target.value)} ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position='stacked'>도착지 *</IonLabel>

            <IonInput value={location} onIonChange={(e: any) => setLocation(e.target.value)} ></IonInput>
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

        <div className='buttonsContainer'>
          {currentUser?.matchedFeed && <COKButton text={'부름이 진행 중이에요.'} onClick={() => history.push('feedPage/' + currentUser.matchedFeed)} />}
          <COKButton disabled={!(title && location && price && content)} text={'부르기'} onClick={handleCall} />
        </div>
      </IonContent>

      <IonModal mode='ios' keepContentsMounted={true}>
        <IonDatetime mode='ios' id="datetime" minuteValues={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]} onIonChange={(e: any) => { setDate(parseISO(e.detail.value)) }} isDateEnabled={isWeekday}></IonDatetime>
      </IonModal>
    </>
  )
}

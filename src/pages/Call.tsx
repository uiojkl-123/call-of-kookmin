import { IonContent, IonIcon, IonInput, IonLabel, IonPage } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router'
import { COKButton } from '../components/COKButton'
import './Call.scss'

export const Call = () => {

  const history = useHistory();
  const title: string = '';
  const content: string = '';

  return (
    <IonPage className='callPage'>
      <IonContent className='container'>
        <div className='content'>
          <IonInput value={title} placeholder='제목'></IonInput>
          <hr style={{ backgroundColor: 'var(--c-gray-500' }} />
          <div className='precautions'>
            (요청 위치, 요청 시간, 요청 사항을 필수적으로 포함해서 작성해주시기 바랍니다.)
          </div>
          <IonInput value={content} placeholder='내용을 입력하세요.'></IonInput>
        </div>

        <div className='button'>
          <COKButton text={'부르기'} onClick={() => { }} />
        </div>
      </IonContent>
    </IonPage>
  )
}

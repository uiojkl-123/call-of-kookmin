import { IonContent, IonIcon, IonInput, IonLabel } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router'
import { COKButton } from './COKButton'
import './Custom.scss'

export const Custom = () => {

  const history = useHistory();
  const title: string = '';
  const content: string = '';

  return (
    <IonContent className='container'>
      <div className='toolbar'>
        <IonIcon icon={arrowBack} className='icon' onClick={() => history.goBack()} />
      </div>

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
  )
}

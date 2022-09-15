import { IonPage } from '@ionic/react'
import React from 'react'
import { COKPage } from '../components/COKPage'

export const Temp = () => {

  return (
    <IonPage>
      <COKPage title={'타이틀'}
        buttons={[{
          text: '버튼1', onClick: () => { }, cancle: false
        }, {
          text: '취소', onClick: () => { }, cancle: true
        },]} >ㅎㅇ<br />ㅎㅇㅎㅇ
      </COKPage>
    </IonPage>
  )
}

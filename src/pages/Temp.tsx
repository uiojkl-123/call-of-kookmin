import { IonPage } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router';
import { COKPage } from '../components/COKPage'

export const Temp = () => {

  const history = useHistory();

  return (
    <IonPage>
      <COKPage title={'타이틀'}
        buttons={[{
          text: '버튼1', onClick: () => { }, cancle: false
        }, {
          text: '취소', onClick: () => {history.goBack()}, cancle: true
        },]} >ㅎㅇ<br />ㅎㅇㅎㅇ
      </COKPage>
    </IonPage>
  )
}

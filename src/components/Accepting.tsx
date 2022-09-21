import { IonPage } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'
import { COKPage } from './COKPage'

export const Accepting = () => {

    const history = useHistory();

    return (
        <IonPage>
            <COKPage title={'수락하는 중...'}
                buttons={[{
                    text: 'ㅇㅇㅇ', onClick: () => { }, cancle: false
                }, {
                    text: '취소', onClick: () => { history.goBack() }, cancle: true
                },]} >
                    
                ㅎㅇ<br />
                ㅎㅇㅎㅇ
            </COKPage>
        </IonPage>
    )
}

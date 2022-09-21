import { IonButton, IonCard, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal, IonToolbar, useIonAlert } from '@ionic/react'
import { personCircleOutline, arrowBack } from 'ionicons/icons'
import React, { useRef } from 'react'
import { useHistory } from 'react-router'
import { db } from '../static/constants'
import { COKButton } from './COKButton'
import { COKPage } from './COKPage'
import './Feed.scss'

interface FeedPageProps {
    id: string;
}

export const Feed: React.FC<FeedPageProps> = (props) => {


    const index = db.findIndex(value => value.id === props.id)
    const history = useHistory();

    const [presentAlert] = useIonAlert();
    const policy: string = '1. 튀지 말기\n2. 늦지 말기';

    return (
        <IonContent className='feedContainer'>
            <div className='toolbar'>
                <IonIcon icon={arrowBack} className='icon' onClick={() => history.push('/main')} />
            </div>

            <IonCard className='content'>

                <div className='topBox'>
                    <div className='leftBox'>
                        <IonIcon icon={personCircleOutline} size='large' />
                    </div>
                    <div className='rightBox'>
                        <div className='writerInfoBox'>
                            {db[index].writer}
                        </div>
                        <div className='timeBox'>
                            {db[index].time}
                        </div>
                    </div>
                </div>

                <br />
                <span style={{ fontSize: '20px' }}>{db[index].title}</span>

                <br /><br />
                {db[index].content}<br />
                <br />
                <br />
                <br />
                <br />

            </IonCard>

            <div className='button'>
                <COKButton text={'요청 수락'} onClick={() => {
                    presentAlert({
                        mode: 'ios',
                        header: '이용 약관',
                        message: policy,
                        cssClass: 'alert',
                        buttons: [
                            {
                                text: '수락',
                                role: 'confirm',
                                cssClass: 'confirmBtn',
                                handler: () => { history.push('/accepting') },
                            },
                            {
                                text: '취소',
                                role: 'cancle',
                                cssClass: 'cancleBtn',
                                handler: () => { },
                            },
                        ],

                    })
                }/*() => { history.push('/accepting') }*/} />
            </div>

        </IonContent>
    )
}

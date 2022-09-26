import { IonButton, IonCard, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal, IonToolbar, useIonAlert } from '@ionic/react'
import { personCircleOutline, arrowBack } from 'ionicons/icons'
import React, { useRef } from 'react'
import { useHistory } from 'react-router'
import { CallFeed } from '../pages/FeedPage'
import { deleteCall } from '../serviece/call.service'
import { db } from '../static/constants'
import { displayTime } from '../util/displayTime'
import { COKButton } from './COKButton'
import { COKPage } from './COKPage'
import { useStore } from '../store/store'
import './Feed.scss'
import { useFeedStore } from '../store/feedStore'

interface FeedPageProps {
    feed: CallFeed
}

export const Feed: React.FC<FeedPageProps> = (props) => {

    const feed = props.feed

    const history = useHistory();

    const { initData } = useFeedStore()
    const [presentAlert] = useIonAlert();
    const policy: string = '1. 튀지 말기\n2. 늦지 말기';

    const { currentUser } = useStore();

    const handleDelete = async () => {
        await deleteCall(feed.id)
        await initData()
        history.push('/main')
    }

    return (
        <IonContent className='feedContainer'>
            {feed ?
                <>
                    <div className='toolbar'>
                        <IonIcon icon={arrowBack} className='icon' onClick={() => history.goBack()} />
                    </div>

                    <IonCard className='content'>

                        <div className='topBox'>
                            <div className='leftBox'>
                                <IonIcon icon={personCircleOutline} size='large' />
                            </div>
                            <div className='rightBox'>
                                <div className='writerInfoBox'>
                                    {feed.writer}

                                    {currentUser?.userId === feed.writer ?
                                        <button className='deleteButton' onClick={() => { handleDelete() }}> 삭제 </button>
                                        : null
                                    }

                                </div>
                                <div className='timeBox'>
                                    {displayTime(feed.date)}
                                </div>
                            </div>
                        </div>

                        <br />
                        <span style={{ fontSize: '20px' }}>{feed.title}</span>

                        <br /><br />
                        {feed.content}<br />
                        <br />
                        <br />
                        <br />
                        <br />

                    </IonCard>

                    <div className='details'>
                        시간 : {feed.date.toString()} <br />
                        요청지 : {feed.location} <br />
                        팁 : {feed.price} 원
                    </div>

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
                </>
                : null}
        </IonContent >
    )
}

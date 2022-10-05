import { IonButton, IonCard, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal, IonToolbar, useIonAlert } from '@ionic/react'
import { personCircleOutline, arrowBack } from 'ionicons/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { CallFeed } from '../pages/FeedPage'
import { deleteCall } from '../serviece/call.service'
import { callTime, displayTime, remainingTime, timeToDate } from '../util/displayTime'
import { COKButton } from './COKButton'
import { COKPage } from './COKPage'
import { useStore } from '../store/store'
import './Feed.scss'
import { useFeedStore } from '../store/feedStore'
import { acceptFeed } from '../serviece/accept.service'
import { Timestamp } from 'firebase/firestore'
import { Accepting } from './Accepting'
import { Count } from './Count'

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

    const [isOpen, setIsOpen] = useState<boolean>(false);


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
                                    {displayTime(feed.createdAt)}
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
                        요청 시간 : {callTime(feed.date)} <br />
                        남은 시간 : {remainingTime(feed.date)} <br />
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
                                        id: "open-modal",
                                        handler: () => {
                                            acceptFeed(feed.id);
                                            setIsOpen(true);
                                            //history.push('/accepting')
                                        },
                                    },
                                    {
                                        text: '취소',
                                        role: 'cancle',
                                        cssClass: 'cancleBtn',
                                        handler: () => { },
                                    },
                                ],

                            });
                        }} />
                    </div>
                </>
                : null}
            <IonModal trigger='open-modal' isOpen={isOpen} className='acceptingContainer'>
                <COKPage title={'달려가는 중...'}
                    buttons={[{
                        text: '곧 도착', onClick: () => { }, cancle: false
                    }, {
                        text: '취소', onClick: () => {
                            presentAlert({
                                mode: 'ios',
                                header: '취소하면 큰일납니다.\n 그래도 취소하시겠습니까?',
                                cssClass: 'alert',
                                buttons: [
                                    {
                                        text: '네',
                                        role: 'confirm',
                                        cssClass: 'confirmBtn',
                                        id: "open-modal",
                                        handler: () => {
                                            setIsOpen(false);
                                        },
                                    },
                                    {
                                        text: '아니오',
                                        role: 'cancle',
                                        cssClass: 'cancleBtn',
                                        handler: () => { },
                                    },
                                ],

                            });
                        }, cancle: true
                    },]} >

                    <IonCard className='acceptingContent'>
                        남은 시간<br /><br />
                        <Count time={timeToDate(props.feed.date)} />
                    </IonCard>

                </COKPage>
            </IonModal>
        </IonContent >
    )
}

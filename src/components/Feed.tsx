import { IonButton, IonCard, IonContent, IonIcon, IonToolbar } from '@ionic/react'
import { personCircleOutline, arrowBack } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router'
import { db } from '../static/constants'
import { COKButton } from './COKButton'
import './Feed.scss'

interface FeedPageProps {
    id: string;
}

export const Feed: React.FC<FeedPageProps> = (props) => {


    const index = db.findIndex(value => value.id === props.id)
    const history = useHistory();

    return (
        <IonContent fullscreen className='feedContainer'>
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
                <COKButton text={'요청 수락'} onClick={() => { }} />
            </div>
        </IonContent>
    )
}

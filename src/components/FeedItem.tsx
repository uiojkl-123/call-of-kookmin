import { IonCard, IonRow } from '@ionic/react';
import { write } from 'fs';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { CallFeed } from '../pages/FeedPage';
import { getUserNameById } from '../serviece/user.service';
import { displayTime } from '../util/displayTime';

interface FeedItemProps {
    feed: CallFeed
}

export const FeedItem: React.FC<FeedItemProps> = (props) => {
    const feed = props.feed
    //console.log(feed);


    const mountRef = React.useRef(true);

    const history = useHistory();

    const [isExpired, setExpired] = useState(false);



    useEffect(() => {
        if (feed.date < new Date()) {
            setExpired(true);
        }
        (async () => {

        })()
        return () => {
            mountRef.current = false
        }
    }, [])




    return (
        <div className='feedCard' onClick={isExpired ? undefined : () => history.push('feedPage/' + feed.id)} style={isExpired ? { background: '#999999' } : {}}>
            <IonRow className='cardLayout'>
                <div >
                    <span className='feedTitle'>{feed.title}</span><br />
                    <span className='feedInfo'>{displayTime(feed.createdAt)}</span>
                </div>
                <div>
                    <span className='feedPrice'>{feed.price + '원'}</span>
                </div>
            </IonRow>
        </div>
    );
}

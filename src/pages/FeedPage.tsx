import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonLoading, IonPage, IonToolbar } from '@ionic/react'
import { DocumentReference } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Feed } from '../components/Feed';
import { CallClass } from '../model/Call';
import { getOneFeed } from '../serviece/accept.service';

type pageParams = { feedId: string }

export interface CallFeed extends CallClass {
  feedRef: DocumentReference<CallClass>
}

export const FeedPage: React.FC = () => {

  const history = useHistory();

  const { feedId: pageId } = useParams<pageParams>();

  const [feed, setFeed] = useState<CallFeed>();

  const mountRef = useRef(true);

  useEffect(() => {
    (async () => {
      try{
        const result = await getOneFeed(pageId);
      if (mountRef.current && result)
        setFeed(result)
      } catch (e: any) {
        alert('에러가 발생했습니다. 다시 시도해주세요. \n상세: ' + e);
        history.goBack();
        throw new Error(e);
    }
    })()
  }, [pageId])

  useEffect(() => {
    return () => {
      mountRef.current = false
    }
  }, [])

  return (
    <IonPage>
      {feed ?
        <Feed feed={feed} />
        :
        <IonLoading isOpen></IonLoading>
      }
    </IonPage>
  )
}

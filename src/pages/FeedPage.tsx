import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonLoading, IonPage, IonToolbar } from '@ionic/react'
import { DocumentReference } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Feed } from '../components/Feed';
import { Call } from '../model/Call';
import { getOneFeed } from '../serviece/accept.service';

type pageParams = { pageId: string }

export interface CallFeed extends Call {
  feedRef: DocumentReference<Call>
}

export const FeedPage: React.FC = () => {

  const { pageId } = useParams<pageParams>();

  const [feed, setFeed] = useState<CallFeed>();

  const mountRef = useRef(true);

  useEffect(() => {
    (async () => {
      const result = await getOneFeed(pageId);
      if (mountRef.current && result)
        setFeed(result)
    })()
  }, [])

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

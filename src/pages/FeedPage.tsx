import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Feed } from '../components/Feed';

type pageParams = {pageId : string}

export const FeedPage: React.FC = () => {

  const {pageId} = useParams<pageParams>();

  return (
    <IonPage>
      <Feed id={pageId} />
    </IonPage>
  )
}

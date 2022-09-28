import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { useStore } from '../store/store';
import './Accept.scss';
import { db } from '../static/constants';
import { Link } from 'react-router-dom';
import { COKButton } from '../components/COKButton';
import { useEffect, useRef, useState } from 'react';
import { CallClass } from '../model/Call';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { getFirstFeed, getNextFeed } from '../serviece/accept.service';
import { Feed } from '../components/Feed';
import { displayTime } from '../util/displayTime';
import { getUserNameById } from '../serviece/user.service';
import { FeedItem } from '../components/FeedItem';
import { CallFeed } from './FeedPage';
import { useFeedStore } from '../store/feedStore';

const Accept: React.FC = () => {

  const history = useHistory();

  const { currentUser } = useStore()

  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const { feedData, initData, loading, lastKey } = useFeedStore()

  const mountRef = useRef(true)
  console.log(feedData);


  useEffect(() => {
    (async () => {
      await initData()
    })()
    return () => {
      mountRef.current = false
    }
  }, [])

  const pushData = async () => {
    if (lastKey === undefined) { setInfiniteDisabled(true); return }
    const newData = await getNextFeed(lastKey);
    useFeedStore.setState({ feedData: [...feedData, ...newData.newData], lastKey: newData.lastVisible })
  }

  const loadData = async (e: any) => {
    await pushData();
    e.target.complete();
  }


  return (
    <IonContent fullscreen>

      {feedData ?
        loading ?
          <div className='feedListContainer'>
            <IonList className='skeletonFeedList'>
              {[1, 1, 1].map((value, index) => {
                return (
                  <IonCard key={index} className='skeletonfeedCard'>
                    <IonCardHeader>
                      <IonRow>
                        <IonAvatar><IonSkeletonText animated></IonSkeletonText></IonAvatar>
                        <div><IonSkeletonText animated ></IonSkeletonText></div>
                        <div><IonSkeletonText animated ></IonSkeletonText></div>
                      </IonRow>
                    </IonCardHeader>
                    <IonCardContent >
                      <IonSkeletonText className='title' animated ></IonSkeletonText>
                      <IonSkeletonText animated ></IonSkeletonText>
                      <IonSkeletonText animated ></IonSkeletonText>
                      <IonSkeletonText animated ></IonSkeletonText>
                      <IonSkeletonText animated ></IonSkeletonText>
                      <IonSkeletonText animated ></IonSkeletonText>
                      <IonSkeletonText animated className='big'></IonSkeletonText>
                    </IonCardContent>
                  </IonCard>
                )
              })}
            </IonList>
          </div>
          :
          <>
            <IonContent className='feedListContainer'>
              <IonRefresher slot="fixed" onIonRefresh={initData}>
                <IonRefresherContent></IonRefresherContent>
              </IonRefresher>
              <IonList className='feedList'>
                {feedData.map((value) => <FeedItem feed={value} key={value.id}></FeedItem>)}
              </IonList>
              <IonInfiniteScroll
                onIonInfinite={loadData}
                threshold="20px"
                disabled={isInfiniteDisabled}
              >
                <IonInfiniteScrollContent
                  loadingSpinner='crescent'
                  loadingText=""
                ></IonInfiniteScrollContent>
              </IonInfiniteScroll>
            </IonContent>
          </>
        : <h1>피드가 없습니다.</h1>
      }
    </IonContent>
  );
};

export default Accept;

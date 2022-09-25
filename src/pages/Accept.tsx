import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { useStore } from '../store/store';
import './Accept.scss';
import { db } from '../static/constants';
import { Link } from 'react-router-dom';
import { COKButton } from '../components/COKButton';
import { useEffect, useRef, useState } from 'react';
import { Call } from '../model/Call';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { getFirstFeed, getNextFeed } from '../serviece/accept.service';
import { Feed } from '../components/Feed';
import { displayTime } from '../util/displayTime';
import { getUserNameById } from '../serviece/user.service';
import { FeedItem } from '../components/FeedItem';
import { CallFeed } from './FeedPage';

const Accept: React.FC = () => {

  const history = useHistory();

  const { currentUser } = useStore()

  const [data, setData] = useState<CallFeed[]>([]);
  const [lastKey, setLastKey] = useState<QueryDocumentSnapshot>();
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  const mountRef = useRef(true)
  console.log(data);


  const initFeedData = async () => {
    setData([])
    setLastKey(undefined)
    setLoading(true)
    const response = await getFirstFeed()
    if (!mountRef.current) { return }
    setData(response.data)
    setLastKey(response.lastVisible)
    setLoading(false)
  }

  useEffect(() => {
    (async () => {
      await initFeedData()
    })()
    return () => {
      mountRef.current = false
    }
  }, [])

  const pushData = async () => {
    if (lastKey === undefined) { setInfiniteDisabled(true); return }
    const newData = await getNextFeed(lastKey);
    setData([...data, ...newData.newData]);
    setLastKey(newData.lastVisible)
  }

  const loadData = async (e: any) => {
    await pushData();
    e.target.complete();
  }


  return (
    <IonPage className='acceptPage'>
      <header>
        <h1>국민의 부름 </h1>
      </header>
      <div className='tabs'>
        <div onClick={() => history.push('/call')}>부르기</div>
        <div onClick={() => history.push('/accept')}>부름에 응답</div>
      </div>
      <IonContent fullscreen>


        {data ?
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
              <div className='feedListContainer'>
                <IonRefresher slot="fixed" onIonRefresh={initFeedData}>
                  <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList className='feedList'>
                  {data.map((value) => <FeedItem feed={value} key={value.id}></FeedItem>)}
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
              </div>
            </>
          : <h1>피드가 없습니다.</h1>
        }
      </IonContent>
    </IonPage>
  );
};

export default Accept;

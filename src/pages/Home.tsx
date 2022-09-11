import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { constants } from 'buffer';
import { useHistory } from 'react-router';
import { useStore } from '../store/store';
import './Home.scss';
import { idList } from '../static/constants';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

  const history = useHistory();

  const { currentUser } = useStore()


  return (
    <IonPage>
      <IonContent fullscreen>
        <h1>국민의 부름</h1>
        <h1>{currentUser?.userName}</h1>
        <IonContent>
          {idList.map((value, index) => {
            return (
              <IonCard className='ion-padding' mode='ios' key={index} onClick={() => history.push('feedPage?pageNum=' + value)}>
                게시글{index}
              </IonCard>
            )
          })}
        </IonContent>

        <Link to='/call'>
          <IonButton style={{
            position: 'fixed',
            zIndex: '10',
            width: 'calc(100% - 32px)',
            bottom: '16px',
            fontSize: '20px',
            padding: '0 8px 0 8px',
            margin: '0 16px'
          }}
          >
            부르기
          </IonButton>
        </Link>
      </IonContent>
    </IonPage>
  );
};

export default Home;

import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { constants } from 'buffer';
import { useHistory } from 'react-router';
import { useStore } from '../store/store';
import './Home.scss';
import { db } from '../static/constants';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

  const history = useHistory();

  const { currentUser } = useStore()


  return (
    <IonPage className='homePage'>
      <IonContent fullscreen>
        <header>
          <h1>국민의 부름 {currentUser?.userName}</h1>
        </header>

        {/* {컴포넌트로 만들어서 param으로 게시글 id를 줍시다} */}ㄴ
        <div style={{ marginTop: '70px' }}>
          {db.map((value) => {
            return <IonCard className='ion-padding' mode='ios' onClick={() => history.push('feedPage?pageNum=' + value.id)}>
              게시글{value.id}
            </IonCard>
          })}
        </div>

        <Link to='/call'>
          <IonButton style={{
            position: 'fixed',
            zIndex: '10',
            width: 'calc(100% - 32px)',
            bottom: '16px',
            fontSize: '20px',
            padding: '0 8px 0 8px',
            margin: '0 16px'
          }}>
            부르기
          </IonButton>
        </Link>
      </IonContent>
    </IonPage>
  );
};

export default Home;

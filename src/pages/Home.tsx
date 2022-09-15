import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { constants } from 'buffer';
import { useHistory } from 'react-router';
import { useStore } from '../store/store';
import './Home.scss';
import { db } from '../static/constants';
import { Link } from 'react-router-dom';
import { COKButton } from '../components/COKButton';

const Home: React.FC = () => {

  const history = useHistory();

  const { currentUser } = useStore()


  return (
    <IonPage className='homePage'>
      <IonContent fullscreen>
        <header>
          <h1>국민의 부름 {currentUser?.userName}</h1>
        </header>

        {/* {컴포넌트로 만들어서 param으로 게시글 id를 줍시다} */}
        <div style={{ marginTop: '70px' }}>
          {db.map((value) => {
            return <IonCard className='ion-padding' mode='ios' onClick={() => history.push('feedPage/' + value.id)}>
              게시글{value.id}
            </IonCard>
          })}
        </div>

        <Link to='/call'>
          <div className='button'>
            <COKButton text={'부르기'} onClick={()=>{}} />
          </div>
        </Link>
      </IonContent>
    </IonPage>
  );
};

export default Home;

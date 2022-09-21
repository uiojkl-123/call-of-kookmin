import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { useStore } from '../store/store';
import './Accept.scss';
import { db } from '../static/constants';
import { Link } from 'react-router-dom';
import { COKButton } from '../components/COKButton';

const Accept: React.FC = () => {

  const history = useHistory();

  const { currentUser } = useStore()


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
        <div className='feedBox'>
          {db.map((value) => {
            return <IonCard className='ion-padding' mode='ios' onClick={() => history.push('feedPage/' + value.id)}>
              <span className='feedTitle'>{value.title}</span><br />
              <span className='feedInfo'>{value.time + ' | ' + value.writer}</span>
            </IonCard>
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Accept;

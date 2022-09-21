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
      <IonContent fullscreen>

        <div className='feedBox'>
          {db.map((value) => {
            return <IonCard className='ion-padding' mode='ios' onClick={() => history.push('feedPage/' + value.id)}>
              <span className='feedTitle'>{value.title}</span><br/>
              <span className='feedInfo'>{value.time + ' | ' + value.writer}</span>
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

export default Accept;

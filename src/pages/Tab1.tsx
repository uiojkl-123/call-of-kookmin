import { IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <h1>국민의 부름</h1>
          </IonToolbar>
        </IonHeader>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard className='ion-padding' mode='ios'>
          <h1>안녕</h1>
        </IonCard>
        <IonCard className='ion-padding' mode='ios'>
          <h1>안녕</h1>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

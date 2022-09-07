import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
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
        <IonButton>안녕</IonButton>
        <IonItem>
          <IonLabel position='floating'>오예</IonLabel>
          <IonInput clearInput></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;

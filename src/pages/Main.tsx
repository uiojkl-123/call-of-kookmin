import { IonPage } from '@ionic/react';
import { useState } from 'react';
import './Main.scss';
import Accept from './Accept';
import { Call } from './Call';
import { useStore } from '../store/store'


const Main: React.FC = () => {

  const [clicked, setClicked] = useState<boolean>(true);
  const { currentUser } = useStore();
  
  return (
    <IonPage className='mainPage'>
      <header className='header'>
        <h1>국민의 부름 </h1>
      </header>
      <div className='tabs'>
        <div onClick={() => {setClicked(true);console.log();}} className={clicked ? 'clicked' : 'unClicked'} >부르기</div>
        <div onClick={() => setClicked(false)} className={!clicked ? 'clicked' : 'unClicked'}>부름에 응답</div>
      </div>

      {clicked ?
        <Call />
        :
        <Accept />
      }
    </IonPage>
  );
};

export default Main;

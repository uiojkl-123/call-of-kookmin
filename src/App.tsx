import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonLoading,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Accept from './pages/Accept';
import { Login } from './pages/Login';
import { FeedPage } from './pages/FeedPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './App.scss'
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { auth, db } from './serviece/firebase';
import { useStore } from './store/store';
import { Temp } from './pages/Temp';
import { Accepting } from './components/Accepting';
import Main from './pages/Main';


setupIonicReact();


const App: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(true)

  const { currentUser, setCurrentUser } = useStore();

  const mountRef = useRef<boolean>(true)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const unsubscribe = onSnapshot(doc(db, 'user', user.uid), (userSnapshot) => {
          if (mountRef.current && userSnapshot.exists()) {
            const userData = userSnapshot?.data()
            setCurrentUser({ userId: user.uid, ...userData })
            setLoading(false)
          }
        })
      } else {
        setLoading(false)
      }
    });

    return () => {
      mountRef.current = false
    }
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        {loading ? (
          <IonLoading
            mode='ios'
            isOpen={true}
            message={'기다려 주세요...'}
          />
        ) : (
          !currentUser ?
            <IonRouterOutlet animated={false} mode='ios'>

              <Route exact path="/">
                <Redirect to={"/login"} />
              </Route>
              <Route exact path="/login" component={Login} />
              <Route render={() => <Redirect to='/' />} />
            </IonRouterOutlet>
            :
            <IonRouterOutlet animated={false} mode='ios'>
              <Route exact path="/">
                <Redirect to={"/main"} />
              </Route>
              <Route exact path='/main' component={Main} />

              <Route exact path="/accept" component={Accept} />

              <Route exact path="/temp" component={Temp} />
              <Route exact path="/accepting" component={Accepting} />
              <Route exact path="/feedPage/:feedId" component={FeedPage} />
              <Route render={() => <Redirect to='/' />} />
            </IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp >
  )
}

export default App;

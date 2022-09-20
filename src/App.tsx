import { Redirect, Route, useHistory } from 'react-router-dom';
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
import Home from './pages/Home';
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
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { auth, db } from './serviece/firebase';
import { useStore } from './store/store';
import { Call } from './pages/Call';
import { Select } from './pages/Select';
import { Temp } from './pages/Temp';
import { Accepting } from './components/Accepting';


setupIonicReact();


const App: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(true)

  const { setCurrentUser } = useStore();

  const mountRef = useRef<boolean>(true)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userSnapshot = await getDoc(doc(db, 'user', user.uid))
        if (!userSnapshot.exists()) {
          setLoading(false)
          return
        }
        if (!userSnapshot) { return }
        const userData = userSnapshot?.data()

        if (mountRef.current) {
          setCurrentUser({ userId: user.uid, ...userData })
          setLoading(false)
        }
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
          <IonRouterOutlet animated={false}>
            <Route exact path="/main" component={Home} />
            <Route exact path="/">
              {/*----------고쳐야 해요---------------*/}
              <Redirect to={false ? "/main" : "/login"} />
              {/*----------고쳐야 해요---------------*/}
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/feedPage/:pageId" component={FeedPage} />
            <Route exact path="/call" component={Call} />
            <Route exact path="/select/:kind" component={Select} />

            <Route exact path="/temp" component={Temp} />
            <Route exact path="/accepting" component={Accepting} />
          </IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp >
  )
}

export default App;

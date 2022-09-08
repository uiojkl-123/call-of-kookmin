import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

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
import { Login } from './pages/Login';
import { FeedPage } from './pages/FeedPage';

setupIonicReact();

const isLogin: boolean = true;

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/main" component={Home} />
          <Route exact path="/">
            <Redirect to={isLogin ? "/main" : "login"} />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/feedPage" component={FeedPage} />
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp >
);

export default App;

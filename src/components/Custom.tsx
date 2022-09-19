import { IonContent, IonIcon } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router'
import './Custom.scss'

export const Custom = () => {

  const history = useHistory();

  return (
    <IonContent className='container'>
      <div className='toolbar'>
        <IonIcon icon={arrowBack} className='icon' onClick={() => history.goBack()} />
      </div>
      <div className='content'>
        Custom
      </div>
    </IonContent>
  )
}

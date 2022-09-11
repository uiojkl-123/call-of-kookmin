import { IonCard, IonCardContent, IonCardTitle, IonContent } from '@ionic/react'
import React from 'react'


export const Cafe = () => {

  const cafeMenu = [
    { id: '001', name: '수박주스', price: '50000' },
    { id: '002', name: '고구마', price: '200' },
  ]

  return (
    <IonContent>
      <div className='container'>
        {cafeMenu.map((value) => {
          return (<IonCard>
            <IonCardTitle>{value.name}</IonCardTitle>
            <IonCardContent>가격: {value.price}</IonCardContent>
          </IonCard>)
        })}
      </div>
    </IonContent>
  )
}

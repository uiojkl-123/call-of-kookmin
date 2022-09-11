import { IonCard, IonCardContent, IonCardTitle, IonContent } from '@ionic/react'
import React from 'react'

export const Convenience = () => {

  const cafeMenu = [
    { id: '001', name: '구웨에에ㅔ엑', price: '500' },
    { id: '002', name: '단백질', price: '200' },
    { id: '002', name: '국', price: '200' },
    { id: '002', name: '밥', price: '202450' },
    { id: '002', name: '김', price: '201340' },
    { id: '002', name: '치', price: '2054450' },
    { id: '002', name: '무', price: '201340' },
    { id: '002', name: '마', price: '202541340' },
    { id: '002', name: '경', price: '224500' },
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

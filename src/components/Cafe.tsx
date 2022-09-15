import { IonCard, IonCardContent, IonCardTitle, IonContent } from '@ionic/react'
import React, { useState } from 'react'
import { COKButton } from './COKButton'
import './Convenience.scss'

export const Cafe = () => {

  const cafeMenu = [
    { id: '001', name: '수박주스', price: '50000' },
    { id: '002', name: '고구마', price: '200' },
  ]

  const [shopList, setShopList] = useState<string[]>([]);

  const handleClick = (id: string) => {
    if (shopList.includes(id)) {
      let arr: string[] = [...shopList]
      const idx: number = arr.indexOf(id);

      arr.splice(idx, 1);
      setShopList(arr);
    } else {
      setShopList([...shopList, id]);
    }
  }

  return (
    <IonContent className='convenientPage'>
      <div className='container'>
        {cafeMenu.map((value) => {
          return (
            <IonCard onClick={() => handleClick(value.id)} className={shopList.includes(value.id) ? 'clicked' : 'unClicked'}>
              <IonCardTitle>{value.name}</IonCardTitle>
              <IonCardContent>가격: {value.price}</IonCardContent>
            </IonCard>
          )
        })}
      </div>
      <div className='button'>
        <COKButton text={'장바구니 담기 ' + shopList.length.toString() + ' 개'} onClick={() => { }}></COKButton>
      </div>
    </IonContent>
  )
}

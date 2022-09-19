import { IonCard, IonCardContent, IonCardTitle, IonContent, IonIcon } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { COKButton } from './COKButton'
import './Convenience.scss'

export const Convenience = () => {

  const cafeMenu = [
    { id: '001', name: '구웨에에ㅔ엑', price: '500' },
    { id: '002', name: '단백질', price: '200' },
    { id: '003', name: '국', price: '200' },
    { id: '004', name: '밥', price: '202450' },
    { id: '005', name: '김', price: '201340' },
    { id: '006', name: '치', price: '2054450' },
    { id: '007', name: '무', price: '201340' },
    { id: '008', name: '마', price: '202541340' },
    { id: '009', name: '경', price: '224500' },
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

  const history = useHistory();

  return (
    <IonContent className='convenientPage'>
      <div className='toolbar'>
        <IonIcon icon={arrowBack} className='icon' onClick={() => history.goBack()} />
      </div>
      <div className='container'>
        {cafeMenu.map((value) => {
          return (
            <IonCard onClick={() => handleClick(value.id)} className={shopList.includes(value.id) ? 'clicked card' : 'unClicked card'}>
              <img className='img' src='../../assets/kookmin.png'></img>
              <div className='rightBox'>
                <div className='menuName'>{value.name}</div>
                <div className='menuPrice'>가격: {value.price}</div>
              </div>
              <div>
                <div>수량</div>
                <div>- 0 +</div>
              </div>
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



import { addDoc, collection, deleteDoc, doc, Firestore, setDoc } from "firebase/firestore";
import { CallClass } from "../model/Call";
import { useFeedStore } from "../store/feedStore";
import { callCollectionRef, db } from "./firebase";
//import { loadTossPayments } from '@tosspayments/payment-sdk'

export const uploadCall = async (call: any) => {
    try {
        // const tossPayments = await loadTossPayments('test_ck_oeqRGgYO1r5evadqJgarQnN2Eyaz')
        // tossPayments.requestPayment('카드', { // 결제 수단 파라미터
        //     // 결제 정보 파라미터
        //     amount: call.price,
        //     orderId: call.id,
        //     orderName: '심부름 1건',
        //     customerName: '',
        //     successUrl: 'http://localhost:3000/success',
        //     failUrl: 'http://localhost:3000/fail',
        // }
        await addDoc(callCollectionRef, call);
    } catch (e: any) {
        alert('에러가 발생했습니다. 다시 시도해주세요. \n상세: ' + e);
        throw new Error(e);
    }
}

export const deleteCall = async (feedId: any) => {
    try {
        await deleteDoc(doc(db, 'call', feedId));
        alert('삭제 완료');
    } catch (e: any) {
        alert('에러가 발생했습니다. 다시 시도해주세요. \n상세: ' + e);
        throw new Error(e);
    }
}


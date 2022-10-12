import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, setDoc } from "firebase/firestore";
import { CallClass } from "../model/Call";
import { useFeedStore } from "../store/feedStore";
import { callCollectionRef, db, functions, userPaymentCollectionRefById } from "./firebase";
import { loadTossPayments } from '@tosspayments/payment-sdk'
import axios from "axios";
import { callConverter } from "./firebaseConverters";
import { httpsCallable } from 'firebase/functions';


export const uploadCall = async (call: any) => {
    try {
        const tossPayments = await loadTossPayments('test_ck_oeqRGgYO1r5evadqJgarQnN2Eyaz')
        try {
            await setDoc(doc(userPaymentCollectionRefById(call.writer), call.orderId), { ...call, createdAt: new Date() });
            await tossPayments.requestPayment('카드', { // 결제 수단 파라미터
                // 결제 정보 파라미터
                amount: call.price,
                orderId: call.orderId,
                orderName: '국민의 부름 심부름 1건',
                customerEmail: call.customerEmail,
                successUrl: 'http://localhost:3000/payment/success',
                failUrl: 'http://localhost:3000/payment/fail',
            })
        } catch (err: any) {
            throw err.code
        }

    } catch (e: any) {
        if (e === 'USER_CANCEL') {
            return
        } else {
            alert('에러가 발생했습니다. 다시 시도해주세요. \n상세: ' + e);
            throw new Error(e);
        }
    }
}

export const comfirmPayment = async (confirmParam: { paymentKey: string, amount: string, orderId: string }, userId: string) => {
    const paymentDocData = await checkPaymentAmountSame(confirmParam.orderId, confirmParam.amount, userId);
    if (!paymentDocData) {
        throw new Error('결제 금액이 다릅니다.');
    }

    try {
        const callCheck = httpsCallable(functions, 'checkPayValid')
        await callCheck(confirmParam);
        await setDoc(doc(callCollectionRef, confirmParam.orderId), paymentDocData);
        return
    } catch (e: any) {
        console.error(e);
        console.error(e.response.data.message);
        throw new Error(e.response.data.message);
    }
}

export const checkPaymentAmountSame = async (orderId: string, amount: string, userId: string) => {
    console.log(orderId, amount, userId);
    const paymentDoc = await getDoc(doc(userPaymentCollectionRefById(userId), orderId));
    console.log(paymentDoc.data());
    if (paymentDoc.exists()) {
        const payment = paymentDoc.data();
        if (payment.price === Number(amount) || payment.price === amount) {
            return payment;
        }
    }
    return false;
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


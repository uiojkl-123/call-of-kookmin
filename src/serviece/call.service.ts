import { addDoc, collection, deleteDoc, doc, Firestore, setDoc } from "firebase/firestore";
import { Call } from "../model/Call";
import { useFeedStore } from "../store/feedStore";
import { callCollectionRef, db } from "./firebase";

export const uploadCall = async (call: Call) => {
    try {
        await addDoc(callCollectionRef, call);
    } catch (e: any) {
        alert('에러가 발생했습니다. 다시 시도해주세요. \n상세: ' + e);
        throw new Error(e);
    }
}

export const deleteCall = async (feedId:any) => {
    try {
        await deleteDoc(doc(db, 'call', feedId));
        alert('삭제 완료');
    } catch (e: any) {
        alert('에러가 발생했습니다. 다시 시도해주세요. \n상세: ' + e);
        throw new Error(e);
    }
}


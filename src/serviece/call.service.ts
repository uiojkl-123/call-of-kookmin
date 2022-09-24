import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { Call } from "../model/Call";
import { db } from "./firebase";

export const uploadCall = async (call: Call) => {
    try {
        await addDoc(collection(db, "calls"), call);
    } catch (e: any) {
        alert('에러가 발생했습니다. 다시 시도해주세요. \n상세: ' + e);
        throw new Error(e);
    }
}


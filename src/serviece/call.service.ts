import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { Call } from "../model/Call";
import { db } from "./firebase";

export const uploadCall = async (call: Call) => {
    await addDoc(collection(db, "calls"), call);
}


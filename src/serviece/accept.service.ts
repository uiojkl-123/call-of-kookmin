import { collection, doc, getDoc, getDocs, limit, orderBy, query, QueryDocumentSnapshot, startAfter } from "firebase/firestore";
import { CallFeed } from "../pages/FeedPage";
import { callCollectionRef, db } from "./firebase";
import { callConverter } from "./firebaseConverters";


export const getFirstFeed = async () => {
    const first = query(callCollectionRef, orderBy("createdAt", 'desc'), limit(5)).withConverter(callConverter);
    const documentSnapshots = await getDocs(first);
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    const result = documentSnapshots.docs.map((docSnapshot) => {
        return { ...docSnapshot.data(), feedRef: docSnapshot.ref }
    });
    return { data: result, lastVisible: lastVisible };
}

export const getNextFeed = async (lastVisible: QueryDocumentSnapshot) => {
    const next = query(callCollectionRef, orderBy("createdAt", 'desc'), startAfter(lastVisible), limit(5)).withConverter(callConverter);
    const documentSnapshots = await getDocs(next);
    const lastVisible2 = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    const result = documentSnapshots.docs.map((docSnapshot) => {
        return { ...docSnapshot.data(), feedRef: docSnapshot.ref }
    })
    return { newData: result, lastVisible: lastVisible2 };
}

export const getOneFeed = async (id: string): Promise<CallFeed> => {
    const docRef = doc(db, 'call', id).withConverter(callConverter);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) { throw new Error('존재하지 않는 게시물입니다.') }
    const result = { ...docSnap.data(), feedRef: docSnap.ref }
    return result;
}
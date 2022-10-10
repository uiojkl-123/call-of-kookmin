import { collection, doc, getDoc, getDocs, limit, orderBy, query, QueryDocumentSnapshot, startAfter, updateDoc, where } from "firebase/firestore";
import { CallFeed } from "../pages/FeedPage";
import { callCollectionRef, db } from "./firebase";
import { callConverter } from "./firebaseConverters";


export const getFirstFeed = async () => {
    const first = query(callCollectionRef, orderBy("createdAt", 'desc'), where("isMatched", "==", false), limit(12)).withConverter(callConverter);
    const documentSnapshots = await getDocs(first);
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    const result = documentSnapshots.docs.map((docSnapshot) => {
        return { ...docSnapshot.data(), feedRef: docSnapshot.ref }
    });
    return { data: result, lastVisible: lastVisible };
}

export const getNextFeed = async (lastVisible: QueryDocumentSnapshot) => {
    const next = query(callCollectionRef, orderBy("createdAt", 'desc'), startAfter(lastVisible), where("isMatched", "==", false), limit(12)).withConverter(callConverter);
    const documentSnapshots = await getDocs(next);
    const lastVisible2 = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    const result = documentSnapshots.docs.map((docSnapshot) => {
        return { ...docSnapshot.data(), feedRef: docSnapshot.ref }
    })
    return { newData: result, lastVisible: lastVisible2 };
}

export const getOneFeed = async (feedId: string): Promise<CallFeed> => {
    const docRef = doc(db, 'call', feedId).withConverter(callConverter);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) { throw new Error('존재하지 않는 게시물입니다.') }
    const result = { ...docSnap.data(), feedRef: docSnap.ref }
    return result;
}


export const acceptFeed = async (feedId: string, matchedValue : boolean, userId:string): Promise<void> => {
    try {
        const docRef = doc(db, 'call', feedId).withConverter(callConverter);
        const userDocRef = doc(db, 'user', userId).withConverter(callConverter);
        await 
            updateDoc(docRef, { isMatched: matchedValue });
            updateDoc(userDocRef, { matchedFeed: matchedValue ? feedId : '' });
    }
    catch (e: any) {
        alert('업데이트를 하지 못했습니다. 다시 시도해주세요. \n상세: ' + e);
        throw new Error(e);
    }
}


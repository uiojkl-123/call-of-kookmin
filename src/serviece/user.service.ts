import { getRedirectResult, GoogleAuthProvider, sendSignInLinkToEmail, signInWithPopup, signInWithRedirect, UserCredential } from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { useStore } from "../store/store";
import { auth, db } from "./firebase";

export const signOut = async () => {
    await auth.signOut();
}


export const googleSignUpWithPopup = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
    await makeUser(result);
    return
}

export const googleSignUpWithRedirect = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider).catch(err => { throw new Error(err) });
}

export const handleGoogleRedirectResult = async () => {
    if(!auth.currentUser?.uid){return}
    console.log(auth.currentUser);
    try{
    const result = await getRedirectResult(auth)
    await makeUser(result);
    }catch(err:any){
        console.error('조짐');
        throw new Error(err)
        
    }
    return
}

const makeUser = async (result: UserCredential | null) => {

    if (!result) { return }
    // The signed-in user info.
    const user = result.user;

    if (user.email?.split('@').at(-1) !== 'kookmin.ac.kr') { throw '국민대학교 이메일이 아닙니다.' }
    if ((await getDoc(doc(db, 'user', user.uid))).exists()) { return }
    await setDoc(doc(db, "user", user.uid), {
        userEmail: user.email,
        userName: user.displayName,
        phone: user.phoneNumber
    }, { merge: true }).catch((err) => console.log(err))
    return
}

export const getUserNameById = async (id: string) => {
    const docRef = doc(db, 'user', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) { throw new Error('존재하지 않는 유저입니다.') }
    return docSnap.data()?.userName;
}
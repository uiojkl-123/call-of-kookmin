import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, useIonAlert } from '@ionic/react'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { auth, db } from '../serviece/firebase'
import { signIn } from '../serviece/user.service'

export const Login: React.FC = () => {

    const [loading, setLoading] = useState<boolean>()
    const [email, setEmail] = useState<string>()
    const [present] = useIonAlert()

    const history = useHistory();

    const signUp = async () => {
        if (!email) { return }
        try {
            await signIn(email).then(() => {

                let buttons: any[] = [{ text: '확인' }]
                if (email.split('@').at(-1) === 'gmail.com') {
                    buttons.push({
                        text: 'gmail로 이동',
                        handler: () => { window.location.href = 'https://mail.google.com' }
                    })
                } else if (email.split('@').at(-1) === 'naver.com') {
                    buttons.push({
                        text: 'naver로 이동',
                        handler: () => { window.location.href = 'https://mail.naver.com/' }
                    })
                } else if (email.split('@').at(-1)?.includes('hanmail') || email.split('@').at(-1)?.includes('daum')) {
                    buttons.push({
                        text: 'daum으로 이동',
                        handler: () => { window.location.href = 'https://mail.daum.net/' }
                    })
                }

                present({
                    mode: 'ios',
                    header: '이메일 전송 완료',
                    subHeader: email,
                    message: '해당 이메일로 인증 링크를 보냈습니다. 이메일을 확인해주세요.',
                    buttons: buttons
                })

            }).catch((errorCode) => {
                throw new Error(errorCode)
            })
        } catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            setLoading(true)
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('로그인을 위해 이메일을 입력해주세요.');
                if (!email) {
                    setLoading(false);
                    alert('이메일을 입력하지 않아 로그인을 취소했습니다.')
                    throw '사용자 취소'
                }
            }
            signInWithEmailLink(auth, email, window.location.href)
                .then(async (userResult) => {
                    const user = userResult.user
                    window.localStorage.removeItem('emailForSignIn');

                    if (!user.email) { setLoading(false); throw '사용자 정보를 가져오지 못했습니다.' }
                    await setDoc(doc(db, 'user', user.uid), { name: user.displayName, email: user.email, phone: user.phoneNumber });
                    setLoading(false);
                    history.replace('/main');
                })
                .catch((error) => {
                    setLoading(false);
                    present({
                        header: '로그인/회원가입 실패',
                        subHeader: error.code,
                        message: error.code === 'auth/invalid-action-code' ? '세션이 만료되었습니다. 다시 시도 해주십시오.' : '로그인 또는 회원가입을 하는 데에 실패했습니다.',
                        mode: 'ios',
                        buttons: [{
                            text: '다시 시도',
                            handler: () => { history.replace('/login') }
                        }]
                    })
                    console.error(error)
                    throw new Error(error.code ?? error)
                });
        }
    }, [])
    return (
        <IonPage>
            <IonContent>
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <h1>국민의 부름</h1>
                        <p>국민의 부름은 이메일로 보내드리는 링크를 통해 로그인 및 회원가입 합니다. 이메일을 입력해주세요.</p>
                        <IonItem lines='full' fill='outline' style={{ width: '90%' }}>
                            <IonLabel position='floating'>e-mail</IonLabel>
                            <IonInput value={email} onIonChange={(e: any) => { setEmail(e.detail.value) }}></IonInput>
                        </IonItem>
                        <IonButton onClick={signUp} style={{ width: '90%' }} >로그인 / 회원가입</IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonLoading, IonPage, useIonAlert } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { googleSignUpWithPopup, googleSignUpWithRedirect, handleGoogleRedirectResult } from '../serviece/user.service'
import { isMobile } from 'react-device-detect'
import './Login.scss'

export const Login: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [present] = useIonAlert()

    const history = useHistory();


    const handleGoogle = async () => {
        setLoading(true)
        try {
            if (isMobile) {
                await googleSignUpWithRedirect();
            } else {
                await googleSignUpWithPopup();
            }
            setLoading(false)
            history.push('/main');
        } catch (err) {
            setLoading(false)
            if (err === '국민대학교 이메일이 아닙니다.') { present({ mode: 'ios', header: '회원가입 실패', subHeader: '구글 계정 연동 실패', message: err }); return }
            present({ mode: 'ios', header: '회원가입 실패', subHeader: '구글 계정 연동 실패', message: '구글 계정을 가져오는 데에서 문제가 발생했습니다.' + err })
        }
    }

    useEffect(() => {
        setLoading(true)
            ; (async () => {
                await handleGoogleRedirectResult().then(() => {
                    setLoading(false)
                    //history.push('/main')
                }).catch(err => {
                    setLoading(false)
                    present({ header: '로그인 실패', subHeader: '구글 계정 연동 실패', message: '구글 계정을 가져오는 데에서 문제가 발생했습니다.' + err })
                })
            })()
    }, [])

    return (
        <IonPage className='loginPage'>
            <IonContent fullscreen>
                <div className='container' style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <h1>국민의 부름</h1>
                        <span>국민의 부름은 국민대 이메일 계정으로</span>
                        <span>로그인 및 회원가입 합니다.</span>
                        <button className='googleSign' onClick={handleGoogle}><img src='assets/kookmin_2.png' /><span>학교 계정으로 계속하기</span></button>
                    </div>
                </div>
            </IonContent>
            <IonLoading mode='ios' isOpen={loading}></IonLoading>
        </IonPage>
    )
}

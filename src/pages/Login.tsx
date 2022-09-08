import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage } from '@ionic/react'
import React from 'react'

export const Login: React.FC = () => {

    return (
        <IonPage>
            <IonContent>
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <h1>국민의 부름</h1>
                        <IonItem lines='none' fill='outline' style={{width:'90%'}}>
                            <IonLabel position='floating'>
                                e-mail
                            </IonLabel>
                            <IonInput></IonInput>
                        </IonItem>
                        <IonButton style={{ width: '90%' }}>로그인 / 회원가입</IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

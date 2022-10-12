import { IonPage, useIonAlert } from '@ionic/react';
import qs from 'qs';
import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { comfirmPayment } from '../serviece/call.service';
import { useStore } from '../store/store';
import './Payment.scss';

type paymentPageParams = { paymentResult: 'success' | 'fail' }

interface PaymentSuccessResult {
    /**
     * 결제 건에 대한 고유한 키 값 - 토스에서 생성
     */
    paymentKey: string;
    /**
     * 상점에서 주문 건을 구분하기 위해 발급한 고유 ID입니다. 결제창을 열 때 requestPayment에 담아 보낸 값입니다. 
     * 우리가 발급.
     */
    orderId: string;
    /**
     * 결제 금액
     */
    amount: string;
}
interface PaymentFailResult {
    /**
     * 오류 타입을 보여주는 에러 코드입니다. - 토스에서 생성
     * 
     * **code : message**  
     * PAY_PROCESS_CANCELED : 사용자에 의해 결제가 취소되었습니다.  
     * PAY_PROCESS_ABORTED : 결제 진행 중 승인에 실패하여 결제가 중단되었습니다.  
     * REJECT_CARD_COMPANY : 결제 승인이 거절되었습니다.  
     */
    code: 'PAY_PROCESS_CANCELED' | 'PAY_PROCESS_ABORTED' | 'REJECT_CARD_COMPANY';
    /**
     * 에러 메시지입니다. 에러 발생 이유를 알려줍니다.
     */
    message: string;
    /**
     * 상점에서 주문 건을 구분하기 위해 발급한 고유 ID입니다.
     * 우리가 발급.
     */
    orderId: string;
}

interface PaymentProps {

}

export const Payment: React.FC<PaymentProps> = (props) => {

    const location = useLocation();

    const history = useHistory();

    const query = qs.parse(location.search, { ignoreQueryPrefix: true })

    const param = useParams<paymentPageParams>();

    const [presentAlert, dismissAlert] = useIonAlert();

    const { currentUser } = useStore();


    useEffect(() => {
        (async () => {
            if (!currentUser?.userId) { console.log('유저없음'); return }
            if (param.paymentResult === 'success') {
                const { amount, orderId, paymentKey } = query as unknown as PaymentSuccessResult;
                try {
                    await comfirmPayment({ amount, orderId, paymentKey }, currentUser.userId);
                    presentAlert({
                        mode: 'ios',
                        header: '결제 성공',
                        message: '결제가 성공적으로 완료되었습니다.',
                        onDidDismiss: () => { history.replace('/'); },
                        buttons: [
                            {
                                text: '확인',
                                handler: () => {
                                    history.replace('/');
                                }
                            }
                        ]
                    })
                } catch (e: any) {
                    presentAlert({
                        mode: 'ios',
                        header: '결제 오류',
                        subHeader: '결제에 실패했습니다. 다시 시도해주세요.',
                        message: e,
                        onDidDismiss: () => { history.replace('/'); },
                        buttons: [
                            {
                                text: '확인',
                                handler: () => {
                                    history.replace('/');
                                }
                            }
                        ]
                    })
                }
            } else {
                const { code, message, orderId } = query as unknown as PaymentFailResult;
                alert('결제 실패')
                history.replace('/')
            }
        })()
    }, [currentUser])

    return (
        <IonPage className="paymentPage">

        </IonPage>
    );
}

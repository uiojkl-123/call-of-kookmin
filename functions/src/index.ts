import * as functions from "firebase-functions";
import axios from "axios";

export const checkPayValid = functions.https.onCall(async (data, context) => {
    const options = {
        method: 'POST',
        url: 'https://api.tosspayments.com/v1/payments/confirm',
        headers: {
            Authorization: 'Basic dGVzdF9za19PQVE5MnlteE4zNGU2eFFXMEd2VmFqUktYdmRrOg==',
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        await axios.request(options);
        return
    } catch (e: any) {
        console.error(e);
        console.error(e.response.data.message);
        throw new Error(e.response.data.message);
    }
})
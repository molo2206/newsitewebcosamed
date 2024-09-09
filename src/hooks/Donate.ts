import { useAuthContext } from '../context/useAuthContext'
import { useState } from 'react'
import { donateForm } from '../utils/formdata'
import DanateService from '../services/DanateService'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
const Donate = () => {
    const stripe: any = useStripe();
    const elements: any = useElements();
    const {
        errorNotification,
        successNotification,
    } = useAuthContext()
    const [loading, setLoading] = useState(false)


    const CreateDonate = async (body: any, setInputs: any) => {
        setLoading(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        if (error) {
            errorNotification("Une erreur s'est produite!")
            return
        }
        const { id } = paymentMethod
        const formdata = {
            ...body, amount: body?.amount === "Autre" ? body.custom_amount : body?.amount, id
        }

        DanateService.create(formdata)
            .then((response: any) => {
                setLoading(false)
                if (response?.status === 200) {
                    setInputs(donateForm)
                    successNotification(response.data.message)
                    setLoading(false)
                } else {
                    errorNotification(
                        response.data
                    )
                }
            })
            .catch((err) => {
                setLoading(false)
                errorNotification(
                    err?.response
                        ? err.response.data.message
                        : err.message
                            ? err.message
                            : 'An error ocurred verifiy your image dimensions'
                )

                console.log(err)
            })
        // console.log(formdata)
    }

    return {
        loading,
        CreateDonate,
    }
}

export default Donate

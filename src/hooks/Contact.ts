import { useAuthContext } from '../context/useAuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { contactForm } from '../utils/formdata'
import ContactServices from '../services/ContactServices'
const Contact = () => {
    const {
        errorNotification,
        successNotification,
        closeModal,
        forceUpdate,
        setIsEdit,
        setSelected,
        setImage,
        setImageUrl,
    } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()
    const location = useLocation()

    const createContact = (body: any, setInputs: any) => {
        setLoading(true)
        const formdata = new FormData()
        formdata.append('first_name', body?.first_name)
        formdata.append('last_name', body?.last_name)
        formdata.append('phone', body?.phone)
        formdata.append('email', body?.email)
        formdata.append('message', body?.message)

        if (location.pathname === '/contact') {
            ContactServices.create(formdata)
                .then((response: any) => {
                    setLoading(false)
                    if (response?.status === 200) {
                        setInputs(contactForm)
                        forceUpdate()
                        successNotification(response.data.message)
                        setLoading(false)
                        setIsEdit(false)
                        setSelected(null)
                        setImage(null)
                        setImageUrl(null)
                        closeModal()
                        navigation('/contact', { replace: true })
                    } else {
                        errorNotification(
                            response.data
                        )
                    }
                })
                .catch((err) => {
                    errorNotification(
                        err?.response
                            ? err.response.data.message
                            : err.message
                                ? err.message
                                : 'An error ocurred verifiy your image dimensions'
                    )
                    setLoading(false)
                    console.log(err)
                })
        }
    }

    return {
        loading,
        createContact,
    }
}

export default Contact

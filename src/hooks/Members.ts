import { useAuthContext } from '../context/useAuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import MembersServices from '../services/MembresServices'
import { rejoindreForm } from '../utils/formdata'
const Members = () => {
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

    const createMember = (body: any, setInputs: any) => {
        setLoading(true)
        const formdata = new FormData()
        formdata.append('name', body?.name)
        formdata.append('prename', body?.prename)
        formdata.append('sexe', body?.sexe)
        formdata.append('phone', body?.phone)
        formdata.append('email', body?.email)
        formdata.append('typemembre', body?.typemembre)
        formdata.append('thematique', body?.thematique)
        formdata.append('country', body?.country)
        formdata.append('ville', body?.ville)
        formdata.append('profession', body?.profession)
        formdata.append('corporation', body?.corporation)
        formdata.append('num_ordre', body?.num_ordre)
        formdata.append('motif', body?.motif)
        if (body?.image) {
            formdata.append('image', body?.image)
        }
        if (location.pathname === '/community/join') {
            MembersServices.create(formdata)
                .then((response: any) => {
                    setLoading(false)
                    if (response?.status === 200) {
                        setInputs(rejoindreForm)
                        forceUpdate()
                        successNotification(response.data.message)
                        setLoading(false)
                        setIsEdit(false)
                        setSelected(null)
                        setImage(null)
                        setImageUrl(null)
                        closeModal()
                        navigation('/community/join', { replace: true })
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
        createMember,
    }
}

export default Members

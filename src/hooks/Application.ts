import { useAuthContext } from "../context";
import { useState } from "react";
import Candidature from "../services/CandidateServices";
import { useLocation, useNavigate } from "react-router-dom";

const Application = () => {
    const { user } = useAuthContext();
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
    // const navigation = useNavigate()
    // const location = useLocation()

    const apply_offre = (body: any) => {
        setLoading(true)
        const formdata = new FormData()
        formdata.append('offer_id', body?.offer_id)
        formdata.append('user_id', user?.id)
        if (body?.cover_letter) {
            formdata.append('cover_letter', body?.cover_letter)
        }
        if (body?.cv) {
            formdata.append('cv', body?.cv)
        }

        Candidature.apply(formdata)
            .then((response: any) => {
                setLoading(false)
                if (response?.status === 200) {
                    // setInputs(rejoindreForm)
                    forceUpdate()
                    successNotification(response.data.message)
                    setLoading(false)
                    setIsEdit(false)
                    setSelected(null)
                    setImage(null)
                    setImageUrl(null)
                    closeModal()
                    // navigation('/community/join', { replace: true })
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

    return {
        loading,
        apply_offre,
    }
}
export default Application
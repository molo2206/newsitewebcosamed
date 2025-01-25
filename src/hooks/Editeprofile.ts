import { useAuthContext } from "../context";
import { useState } from "react";
import AuthService from "../services/AuthService";
import useValidation from "./useValidation";
import { useNavigate } from "react-router-dom";


export default function Editeprofile() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const { setInputs } = useValidation({})
    const {
        isAuthenticated,
        saveUser,
        errorNotification,
        successNotification,
        removeSession,
    } = useAuthContext();


    const editprof = (body: any) => {
        setLoading(true)
        const formdata = new FormData()
        formdata.append('full_name', body?.full_name)
        formdata.append('email', body?.email)
        formdata.append('phone', body?.phone)
        formdata.append('gender', body?.gender)
        if (body?.image?.name) {
            formdata.append('image', body?.image)
        }
        AuthService.editprofile(body)
            .then((response: any) => {
                setLoading(false);
                if (response?.status === 200) {
                    successNotification(response.data.message);
                    saveUser(response.data.data);
                    setLoading(false);
                } else {
                    errorNotification(response.data.data);
                }
            })
            .catch((err: any) => {
                errorNotification(
                    err?.response
                        ? err.response.data.message
                        : err.message
                            ? err.message
                            : "Error de traitement"
                );
                setLoading(false);
                console.log(err);
            });
    };

    const update_password = (body: any) => {
        setLoading(true)
        AuthService.editPassword(body)
            .then((response: any) => {
                setInputs({
                    old_password: '',
                    new_password: '',
                })
                successNotification(response.data.message)
                removeSession()
                navigate('/auth/signin');
                setLoading(false)
            })
            .catch((err) => {
                errorNotification(err ? err.response.data.message : err.message)
                setLoading(false)
            })
    }

    return {
        loading,
        editprof,
        update_password,
        isAuthenticated,
    };
}

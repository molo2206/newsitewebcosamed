import { useState } from 'react';
import { useAuthContext } from '../context'
import AuthService from '../services/AuthService'
import { useSearchParams } from 'react-router-dom';

export default function LoginUser() {
    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams();

    const {
        isAuthenticated,
        saveSession,
        saveUser,
        errorNotification,
        successNotification,
    } = useAuthContext()

    const redirectUrl = searchParams.get("next") || "/job_openings/userHome";
    const Login = (body: any) => {
        setLoading(true)
        const formdata = new FormData()
        formdata.append('email', body?.email)
        formdata.append('password', body?.password)
        AuthService.login(formdata)
            .then((response: any) => {
                setLoading(false)
                if (response?.status === 200) {
                    successNotification(response.data.message)
                    saveSession(response?.data?.token)
                    saveUser(response?.data?.data)
                    setLoading(false)
                } else {
                    errorNotification(
                        response.data
                    )
                }
            })
            .catch((err: any) => {
                errorNotification(
                    err?.response
                        ? err.response.data.message
                        : err.message
                            ? err.message
                            : 'Error de traitement'
                )
                setLoading(false)
                console.log(err)
            })
    }

    return {
        loading,
        Login,
        redirectUrl,
        isAuthenticated,
    }
}
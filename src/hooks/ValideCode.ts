import { useAuthContext } from "../context";
import { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function ValideCode() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const {
        isAuthenticated,
        saveRegister,
        errorNotification,
        successNotification,
    } = useAuthContext();

    const redirectUrl = navigate('/auth/login')
    const registeruser = (body: any) => {
        setLoading(true);
        AuthService.register(body)
            .then((response: any) => {
                setLoading(false);
                if (response?.status === 200) {
                    redirectUrl;
                    successNotification(response.data.message);
                    saveRegister(body);
                    setLoading(false);
                } else {
                    errorNotification(response.data);
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

    return {
        loading,
        registeruser,
        isAuthenticated,
    };
}

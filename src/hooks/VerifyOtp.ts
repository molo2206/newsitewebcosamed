import { useAuthContext } from "../context";
import { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const {
        isAuthenticated,
        saveForgetPassword,
        errorNotification,
        successNotification,
    } = useAuthContext();

    const verify = (body: any) => {
        setLoading(true);
        AuthService.verifyOtp(body)
            .then((response: any) => {
                setLoading(false);
                if (response?.status === 200) {
                    successNotification(response.data.message);
                    saveForgetPassword(body);
                    navigate('/auth/change-password');
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
        verify,
        isAuthenticated,
    };
}

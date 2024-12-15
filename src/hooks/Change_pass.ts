import { useAuthContext } from "../context";
import { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Change_pass() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const {
        isAuthenticated,
        errorNotification,
        successNotification,
        removeSession
    } = useAuthContext();

    const change_password = (body: any) => {
        setLoading(true);
        AuthService.resetPassword(body)
            .then((response: any) => {
                setLoading(false);
                if (response?.status === 200) {
                    successNotification(response.data.message);
                    removeSession();
                    navigate('/auth/signin');
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

    return {
        loading,
        change_password,
        isAuthenticated,
    };
}

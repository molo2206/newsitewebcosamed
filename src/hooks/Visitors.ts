import { useAuthContext } from "../context";
import { useState } from "react";
import VisitorsServices from "../services/VisitorsServices";
import { useNavigate } from "react-router-dom";

export default function Visitors() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const {
        errorNotification,
    } = useAuthContext();

    const registervisitor = (body: any) => {
        setLoading(true);
        VisitorsServices.create(body)
            .then((response: any) => {
                setLoading(false);
                if (response?.status === 200) {
                    // successNotification(response.data.message);
                    navigate('/');
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
        registervisitor,
    };
}

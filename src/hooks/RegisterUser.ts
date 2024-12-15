import { useAuthContext } from "../context";
import { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const {
    isAuthenticated,
    saveRegister,
    errorNotification,
    successNotification,
  } = useAuthContext();

  const registeruser = (body: any) => {
    setLoading(true);
    AuthService.register(body)
      .then((response: any) => {
        setLoading(false);
        if (response?.status === 202) {
          successNotification(response.data.message);
          saveRegister(body);
          navigate('/auth/otp');
          setLoading(false);
        } else if (response?.status === 200) {
          successNotification(response.data.message);
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
    registeruser,
    isAuthenticated,
  };
}

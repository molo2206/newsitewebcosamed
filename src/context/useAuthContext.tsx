import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import i18n from "../i18n";

const AuthContext = createContext<any>({});

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

const authSessionUserKey = "_DICI_AUTH_USER";
const authSessionRegisterKey = "_DICI_AUTH_REGISTER";
const authSessionForgetPasswordKey = "_DICI_AUTH_FORGET_PASSWORD";
const authToken = "_DICI_TOKEN";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [refresh, forceUpdate] = useReducer((x) => x + 1, 0);
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [logo1, setLogo1] = useState(null);
  const [logo2, setLogo2] = useState(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<any>(null);
  const [lang, setLang] = useState<any | null>("en");
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [pageLang, setPageLang] = useState(lang);
  const [isOpen, setIsOpen] = useState(false);
  const [modalDelete, showModalDelete] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [redict, setRedirect] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const navigation = useNavigate();

  // Initialise la langue depuis le cookie au montage uniquement
  useEffect(() => {
    const cookieLang = Cookies.get("i18next");
    if (cookieLang) {
      setLang(cookieLang);
    }
  }, []);

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const changePageLang = (lang: any) => {
    setPageLang(lang);
  };

  const handleLanguageChange = (lang: string) => {
    Cookies.set("i18next", lang);
    i18n.changeLanguage(lang);
    setLang(lang);
    toggleDropDown();
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const toggleModalDelete = () => {
    showModalDelete(false);
  };
  const closeModal = () => {
    setIsEdit(false);
    setSelected(null);
    setIsOpen(false);
    setImage(null);
    setImageUrl(null);
  };

  const handleUpdate = (data: any) => {
    setIsEdit(true);
    setSelected(data);
    toggleModal();
  };

  const handleDelete = (data: any) => {
    setSelected(data);
    showModalDelete(true);
  };

  const handleUpdateNavigate = (data: any, route: any) => {
    setIsEdit(true);
    setSelected(data);
    navigation(route);
  };

  const [token, setToken] = useState(
    localStorage.getItem(authToken)
      ? JSON.parse(localStorage.getItem(authToken)!)
      : undefined
  );
  const [user, setUser] = useState(
    localStorage.getItem(authSessionUserKey)
      ? JSON.parse(localStorage.getItem(authSessionUserKey)!)
      : undefined
  );
  const [register, setRegister] = useState(
    localStorage.getItem(authSessionRegisterKey)
      ? JSON.parse(localStorage.getItem(authSessionRegisterKey)!)
      : undefined
  );
  const [forgetpassword, setForgetPassword] = useState(
    localStorage.getItem(authSessionForgetPasswordKey)
      ? JSON.parse(localStorage.getItem(authSessionForgetPasswordKey)!)
      : undefined
  );

  const { addToast } = useToasts();

  const errorNotification = (message: string) => {
    addToast(message, { autoDismiss: true, appearance: "error" });
  };
  const successNotification = (message: string) => {
    addToast(message, { autoDismiss: true, appearance: "success" });
  };

  const saveSession = useCallback(
    (token: string) => {
      localStorage.setItem(authToken, JSON.stringify(token));
      setToken(token);
    },
    []
  );

  const saveUser = useCallback(
    (user: object) => {
      localStorage.setItem(authSessionUserKey, JSON.stringify(user));
      setUser(user);
    },
    []
  );

  const saveRegister = useCallback(
    (register: object) => {
      localStorage.setItem(authSessionRegisterKey, JSON.stringify(register));
      setRegister(register);
    },
    []
  );

  const saveForgetPassword = useCallback(
    (forgetpassword: object) => {
      localStorage.setItem(authSessionForgetPasswordKey, JSON.stringify(forgetpassword));
      setForgetPassword(forgetpassword);
    },
    []
  );

  const removeSession = useCallback(() => {
    localStorage.removeItem(authSessionUserKey);
    localStorage.removeItem(authSessionRegisterKey);
    localStorage.removeItem(authSessionForgetPasswordKey);
    localStorage.removeItem(authToken);
    setRegister(undefined);
    setUser(undefined);
    setForgetPassword(undefined);
    setToken(undefined);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        forgetpassword,
        token,
        isAuthenticated: Boolean(token),
        saveSession,
        saveUser,
        saveRegister,
        saveForgetPassword,
        removeSession,
        errorNotification,
        successNotification,
        refresh,
        forceUpdate,
        handleUpdate,
        isEdit,
        selected,
        setIsEdit,
        setSelected,
        toggleModal,
        isOpen,
        closeModal,
        selectedRole,
        setSelectedRole,
        redict,
        setRedirect,
        lang,
        handleLanguageChange,
        toggleDropDown,
        dropDownOpen,
        selectedType,
        setSelectedType,
        image,
        setImage,
        pageLang,
        changePageLang,
        imageUrl,
        setImageUrl,
        logo1,
        logo2,
        setIsOpen,
        setLogo1,
        setLogo2,
        image1,
        image2,
        image3,
        image4,
        image5,
        setImage1,
        setImage2,
        setImage3,
        setImage4,
        setImage5,
        handleUpdateNavigate,
        handleDelete,
        modalDelete,
        toggleModalDelete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

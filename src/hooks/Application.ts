import { useAuthContext } from "../context";
import { useState } from "react";
import Candidature from "../services/CandidateServices";
import { useNavigate, useSearchParams } from 'react-router-dom';
const Application = () => {
    // const { user } = useAuthContext();
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
    const [searchParams] = useSearchParams();
    // const navigation = useNavigate()
    // const location = useLocation()
    const navigate = useNavigate()
    const redirectUrl = searchParams.get("next") || "/application-send-successfully";
    const apply_offre = (body: any, offer_id: any, user_id: any) => {
        
        setLoading(true)
        const formdata = new FormData()
        formdata.append('offer_id', offer_id)
        formdata.append('user_id', user_id)
        if (body?.cover_letter) {
            formdata.append('cover_letter', body?.cover_letter)
        }
        if (body?.cv) {
            formdata.append('cv', body?.cv)
        }

        body?.languages?.forEach((lang: any, index: number) => {
            formdata.append(`languages[${index}][language]`, lang.language);
            formdata.append(`languages[${index}][writing]`, lang.writing);
            formdata.append(`languages[${index}][reading]`, lang.reading);
            formdata.append(`languages[${index}][speaking]`, lang.speaking);
            formdata.append(`languages[${index}][comprehension]`, lang.comprehension);
        });
        body?.educations.forEach((etude: any, index: number) => {
            formdata.append(`etudes[${index}][title_edu]`, etude.title_edu);
            formdata.append(`etudes[${index}][institution]`, etude.institution);
            formdata.append(`etudes[${index}][endDate_edu]`, etude.endDate_edu);
        });
        body?.experiences.forEach((exp: any, index: number) => {
            formdata.append(`experiences[${index}][job_title]`, exp.job_title_ex);
            formdata.append(`experiences[${index}][company_name]`, exp.company_name_exp);
            formdata.append(`experiences[${index}][start_date]`, exp.start_date_exp);
            formdata.append(`experiences[${index}][end_date]`, exp.end_date_exp);
            formdata.append(`experiences[${index}][description]`, exp.description_exp);
        });

        body?.skills.forEach((skill: any, index: number) => {
            formdata.append(`skills[${index}]`, skill);
        });

        body?.attestations.forEach((cert: any, index: number) => {
            formdata.append(`certificates[${index}][title]`, cert.title_attestation);
            if (body?.cover_letter) {
                formdata.append(`certificates[${index}][certificate]`, cert.file_attestation);
            }
            formdata.append(`certificates[${index}][date_delivrance]`, cert.date_delivrance_attestation);
        });

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
                    navigate('/application-send-successfully');
                    // navigation('/community/join', { replace: true })
                } else {
                    errorNotification(
                        response.data

                    )
                    console.log(response.data)
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
        redirectUrl,
        apply_offre,
    }
}
export default Application
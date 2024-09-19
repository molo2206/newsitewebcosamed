// import { useAuthContext } from '../context/useAuthContext'
// import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import { SearchForm } from '../utils/formdata'
// import SearchServices from '../services/SearchServices'
// const Search = () => {
//     const {
//         errorNotification,
//         closeModal,
//         forceUpdate,
//         pageLang,
//         setIsEdit,
//         setSelected,
//         setImage,
//         setImageUrl,
//     } = useAuthContext()
//     const [loading, setLoading] = useState(false)
//     const navigation = useNavigate()

//     const createSearch = (body: any, setInputs: any) => {
//         setLoading(true)
//         const formdata = new FormData()
//         formdata.append('keyword', body?.keyword)
//         formdata.append('locale', pageLang)

//         SearchServices.create(formdata)
//             .then((response: any) => {
//                 setLoading(false)
//                 if (response?.status === 200) {
//                     setInputs(SearchForm)
//                     forceUpdate()
//                     setLoading(false)
//                     setIsEdit(false)
//                     setSelected(null)
//                     setImage(null)
//                     setImageUrl(null)
//                     closeModal()
//                     navigation('/result', { replace: true })
//                 } else {
//                     errorNotification(
//                         response.data
//                     )
//                 }
//             })
//             .catch((err) => {
//                 errorNotification(
//                     err?.response
//                         ? err.response.data.message
//                         : err.message
//                             ? err.message
//                             : 'An error ocurred verifiy your image dimensions'
//                 )
//                 setLoading(false)
//                 console.log(err)
//             })

//     }

//     return {
//         loading,
//         createSearch,
//     }
// }

// export default Search

// import { useState } from "react";
// import Input from "../components/form/Input";
// import useValidation from "../hooks/useValidation";
// import { useTranslation } from "react-i18next";
// import CountryServices from "../services/CountryServices";
// import useAsync from "../hooks/useAsync";
// import LoginPage from "./Auth/LoginPage";
// import { useAuthContext } from "../context";
const JobApplicationForm = () => {
  // const { t } = useTranslation();
  // const { user } = useAuthContext();
  // const { inputs, errors, handleOnChange, hanldeError } = useValidation({
  //   username: "",
  //   password: "",
  // });
  // const { data: country } = useAsync(() => CountryServices.getCountry());
  // const Prefix = [
  //   {
  //     value: "Mr.",
  //     label: "Mr.",
  //   },
  //   {
  //     value: "Mrs.",
  //     label: "Mrs.",
  //   },
  //   {
  //     value: "Ms.",
  //     label: "Ms.",
  //   },
  // ];
  // const [files, setFiles] = useState([]);

  // const handleFileUpload = (event: any) => {
  //   const uploadedFiles = Array.from(event.target.files);
  //   setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  // };

  // const handleFileRemove = (fileName: any) => {
  //   setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  // };

  // const validation = (e: any) => {
  //   e.preventDefault();

  //   let valide = true;
  //   if (!inputs.password) {
  //     hanldeError(t("Password"), "password");
  //     valide = false;
  //   }
  //   if (!inputs.email) {
  //     hanldeError(t("Enter_email"), "email");
  //     valide = false;
  //   }
  // };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   alert("Candidature envoyée !");
  // };
  // const [educations, setEducations] = useState([
  //   {
  //     id: 1,
  //     school_name: "",
  //     diplome: "",
  //     domaine: "",
  //     startDate: "",
  //     endDate: "",
  //   },
  // ]);

  // const [experiences, setExperiences] = useState([
  //   {
  //     id: 1,
  //     title: "",
  //     company: "",
  //     startDate: "",
  //     endDate: "",
  //     description: "",
  //   },
  // ]);

  // const handleChangeEducations = (id: any, field: any, value: any) => {
  //   setEducations((prev) =>
  //     prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
  //   );
  // };
  // const addEducation = () => {
  //   setEducations((prev) => [
  //     ...prev,
  //     {
  //       id: prev.length + 1,
  //       school_name: "",
  //       degree: "",
  //       domaine: "",
  //       startDate: "",
  //       endDate: "",
  //       file: "",
  //     },
  //   ]);
  // };
  // const removeEducation = (id: any) => {
  //   setEducations((prev) => prev.filter((edu) => edu.id !== id));
  // };

  // const handleChanges = (id: any, field: any, value: any) => {
  //   setExperiences((prev) =>
  //     prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
  //   );
  // };

  // const addExperience = () => {
  //   setExperiences((prev) => [
  //     ...prev,
  //     {
  //       id: prev.length + 1,
  //       title: "",
  //       company: "",
  //       startDate: "",
  //       endDate: "",
  //       description: "",
  //     },
  //   ]);
  // };

  // const removeExperience = (id: any) => {
  //   setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  // };

  return (
    // <div>
    //   <div className="min-h-screen bg-gray-100 dark:bg-slate-900 w-full dark:text-white flex items-center justify-center p-6">
    //     <div className="bg-white p-6 rounded-lg dark:bg-slate-800 dark:border dark:border-slate-700  dark:text-white shadow-lg w-full max-w-6xl">
    //       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    //         Postulez pour le poste
    //       </h1>
    //       <form onSubmit={handleSubmit}>
    //         <div className="mb-4 border rounded-lg">
    //           <div className=" px-2 py-4">
    //             <h1>Mes données personnelles</h1>
    //           </div>
    //           <div className=" px-2 py-4">
    //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
    //               <Input
    //                 required
    //                 name="select"
    //                 label="Comment nous avez-vous connus ?"
    //                 type="select"
    //                 value={inputs.country}
    //                 errors={errors.country}
    //                 onChange={(e: any) =>
    //                   handleOnChange(e.target.value, "country")
    //                 }
    //                 options={country?.map((item: any) => ({
    //                   label: item.name,
    //                   value: item.id,
    //                 }))}
    //               />
    //               <Input
    //                 required
    //                 name="select"
    //                 label="Titre (préfixe)"
    //                 type="select"
    //                 value={inputs.sexe}
    //                 errors={errors.sexe}
    //                 onChange={(e: any) =>
    //                   handleOnChange(e.target.value, "sexe")
    //                 }
    //                 options={Prefix?.map((item: any) => ({
    //                   label: item.label,
    //                   value: item.value,
    //                 }))}
    //               />
    //             </div>
    //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
    //               <Input
    //                 required
    //                 name="name"
    //                 label={t("Name")}
    //                 placeholder=""
    //                 type="text"
    //                 errors={errors.name}
    //                 value={inputs.name}
    //                 onChange={(e: any) =>
    //                   handleOnChange(e.target.value, "name")
    //                 }
    //               />
    //               <Input
    //                 required
    //                 name="prename"
    //                 label={t("Prename")}
    //                 placeholder=""
    //                 type="text"
    //                 errors={errors.prename}
    //                 value={inputs.prename}
    //                 onChange={(e: any) =>
    //                   handleOnChange(e.target.value, "prename")
    //                 }
    //               />
    //               <Input
    //                 required
    //                 name="phone"
    //                 label={t("Phone")}
    //                 type="phone"
    //                 errors={errors.phone}
    //                 value={inputs.phone}
    //                 onChange={(e: any) =>
    //                   handleOnChange(e.target.value, "phone")
    //                 }
    //               />
    //               <Input
    //                 required
    //                 name="email"
    //                 label="Email"
    //                 placeholder=""
    //                 type="email"
    //                 errors={errors.email}
    //                 value={inputs.email}
    //                 onChange={(e: any) =>
    //                   handleOnChange(e.target.value, "email")
    //                 }
    //               />
    //               <Input
    //                 required
    //                 name="email"
    //                 label="Adresse"
    //                 placeholder=""
    //                 type="email"
    //                 errors={errors.email}
    //                 value={inputs.email}
    //                 onChange={(e: any) =>
    //                   handleOnChange(e.target.value, "email")
    //                 }
    //               />
    //               <Input
    //                 required
    //                 name="email"
    //                 label="Code postal"
    //                 placeholder=""
    //                 type="email"
    //                 errors={errors.email}
    //                 value={inputs.email}
    //                 onChange={(e: any) =>
    //                   handleOnChange(e.target.value, "email")
    //                 }
    //               />
    //               <Input
    //                 required
    //                 name="select"
    //                 label={t("Select_country")}
    //                 type="select"
    //                 value={inputs.country}
    //                 errors={errors.country}
    //                 onChange={(e: any) =>
    //                   handleOnChange(e.target.value, "country")
    //                 }
    //                 options={country?.map((item: any) => ({
    //                   label: item.name,
    //                   value: item.id,
    //                 }))}
    //               />
    //               <Input
    //                 required
    //                 name="ville"
    //                 label={t("City")}
    //                 type="text"
    //                 errors={errors.ville}
    //                 value={inputs.ville}
    //                 onChange={(e: any) =>
    //                   handleOnChange(e.target.value, "ville")
    //                 }
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         <div className="mb-4 border rounded-lg">
    //           <div className=" px-2 py-4">
    //             {educations.map((edu, index) => (
    //               <div key={edu.id} className="border-b pb-4 mb-4">
    //                 <div className="flex justify-between items-center">
    //                   <h2 className="text-lg font-semibold text-gray-800">
    //                     Education {index + 1}
    //                   </h2>
    //                   {educations.length > 1 && (
    //                     <button
    //                       type="button"
    //                       onClick={() => removeEducation(edu.id)}
    //                       className="text-red-500 hover:text-red-700"
    //                     >
    //                       Supprimer
    //                     </button>
    //                   )}
    //                 </div>

    //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
    //                   <Input
    //                     name="email"
    //                     label="Établissement ou université*"
    //                     placeholder="Nom de l'institution"
    //                     type="text"
    //                     errors={errors.school_name}
    //                     value={inputs.school_name}
    //                     onChange={(e: any) =>
    //                       handleChangeEducations(
    //                         edu.id,
    //                         "school_name",
    //                         e.target.value
    //                       )
    //                     }
    //                   />
    //                   <Input
    //                     name="diplome"
    //                     label="Diplôme*"
    //                     placeholder=""
    //                     type="text"
    //                     errors={errors.diplome}
    //                     value={inputs.diplome}
    //                     onChange={(e: any) =>
    //                       handleChangeEducations(
    //                         edu.id,
    //                         "diplome",
    //                         e.target.value
    //                       )
    //                     }
    //                   />
    //                   <Input
    //                     name="startDate"
    //                     label="De*"
    //                     placeholder=""
    //                     type="date"
    //                     errors={errors.startDate}
    //                     value={inputs.startDate}
    //                     onChange={(e: any) =>
    //                       handleChangeEducations(
    //                         edu.id,
    //                         "startDate",
    //                         e.target.value
    //                       )
    //                     }
    //                   />
    //                   <Input
    //                     name="endDate"
    //                     label="À (année réelle ou prévue)*"
    //                     placeholder=""
    //                     type="date"
    //                     errors={errors.endDate}
    //                     value={inputs.endDate}
    //                     onChange={(e: any) =>
    //                       handleChangeEducations(
    //                         edu.id,
    //                         "endDate",
    //                         e.target.value
    //                       )
    //                     }
    //                   />
    //                 </div>
    //               </div>
    //             ))}
    //             <button
    //               type="button"
    //               style={{ fontSize: 11 }}
    //               onClick={addEducation}
    //               className=" bg-principal w-[60px] text-white py-2 rounded-lg hover:bg-hover transition duration-300"
    //             >
    //               Ajouter
    //             </button>
    //           </div>
    //         </div>

    //         <div className=" border rounded-lg ">
    //           <div className=" px-2 py-4">
    //             {experiences.map((exp, index) => (
    //               <div key={exp.id} className="border-b pb-4 mb-4">
    //                 <div className="flex justify-between items-center">
    //                   <h2 className="text-lg font-semibold text-gray-800">
    //                     Expérience {index + 1}
    //                   </h2>
    //                   {experiences.length > 1 && (
    //                     <button
    //                       type="button"
    //                       onClick={() => removeExperience(exp.id)}
    //                       className="text-red-500 hover:text-red-700"
    //                     >
    //                       Supprimer
    //                     </button>
    //                   )}
    //                 </div>
    //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
    //                   <input
    //                     type="text"
    //                     placeholder="Titre du poste"
    //                     value={exp.title}
    //                     onChange={(e) =>
    //                       handleChanges(exp.id, "title", e.target.value)
    //                     }
    //                     className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
    //                   />
    //                   <input
    //                     type="text"
    //                     placeholder="Nom de l'entreprise"
    //                     value={exp.company}
    //                     onChange={(e) =>
    //                       handleChanges(exp.id, "company", e.target.value)
    //                     }
    //                     className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
    //                   />
    //                   <input
    //                     type="date"
    //                     placeholder="Date de début"
    //                     value={exp.startDate}
    //                     onChange={(e) =>
    //                       handleChanges(exp.id, "startDate", e.target.value)
    //                     }
    //                     className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
    //                   />
    //                   <input
    //                     type="date"
    //                     placeholder="Date de fin"
    //                     value={exp.endDate}
    //                     onChange={(e) =>
    //                       handleChanges(exp.id, "endDate", e.target.value)
    //                     }
    //                     className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
    //                   />
    //                 </div>
    //                 <textarea
    //                   placeholder="Description de l'expérience"
    //                   value={exp.description}
    //                   onChange={(e) =>
    //                     handleChanges(exp.id, "description", e.target.value)
    //                   }
    //                   className="border border-gray-300 p-2 mt-4 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300"
    //                   rows={4}
    //                 />
    //               </div>
    //             ))}
    //             <button
    //               type="button"
    //               style={{ fontSize: 11 }}
    //               onClick={addExperience}
    //               className="w-[60px] bg-principal text-white py-2 rounded-lg hover:bg-hover transition duration-300"
    //             >
    //               Ajouter
    //             </button>
    //           </div>
    //         </div>
    //         <div className="mb-4 border rounded-lg">
    //           <div className=" px-2 py-4">
    //             <h1 className=" text-xl font-semibold">Langues</h1>
    //             <p>
    //               Langues Énumérez chacune des langues que vous parlez, lisez ou
    //               écrivez ainsi que leurs niveaux de compétence. Veuillez
    //               préciser toutes vos qualifications linguistiques, en
    //               particulier les langues de l'ONU (anglais, espagnol, français,
    //               arabe, russe, portugais, chinois). Si vous possédez une
    //               certification linguistique, veuillez la joindre dans la
    //               section Certification.
    //             </p>
    //           </div>
    //           <div className=" px-2 py-4">
    //             {educations.map((edu, index) => (
    //               <div key={edu.id} className="border-b pb-4 mb-4">
    //                 <div className="flex justify-between items-center">
    //                   <h2 className="text-lg font-semibold text-gray-800">
    //                     Langues {index + 1}
    //                   </h2>
    //                   {educations.length > 1 && (
    //                     <button
    //                       type="button"
    //                       onClick={() => removeEducation(edu.id)}
    //                       className="text-red-500 hover:text-red-700"
    //                     >
    //                       Supprimer
    //                     </button>
    //                   )}
    //                 </div>
    //                 <Input
    //                   required
    //                   name="select"
    //                   label="Selectionner la langue"
    //                   type="select"
    //                   value={inputs.country}
    //                   errors={errors.country}
    //                   onChange={(e: any) =>
    //                     handleOnChange(e.target.value, "country")
    //                   }
    //                   options={country?.map((item: any) => ({
    //                     label: item.name,
    //                     value: item.id,
    //                   }))}
    //                 />

    //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
    //                   <Input
    //                     required
    //                     name="select"
    //                     label="1.Compétence globale"
    //                     type="select"
    //                     value={inputs.country}
    //                     errors={errors.country}
    //                     onChange={(e: any) =>
    //                       handleOnChange(e.target.value, "country")
    //                     }
    //                     options={country?.map((item: any) => ({
    //                       label: item.name,
    //                       value: item.id,
    //                     }))}
    //                   />
    //                   <Input
    //                     required
    //                     name="select"
    //                     label="2.Écriture"
    //                     type="select"
    //                     value={inputs.country}
    //                     errors={errors.country}
    //                     onChange={(e: any) =>
    //                       handleOnChange(e.target.value, "country")
    //                     }
    //                     options={country?.map((item: any) => ({
    //                       label: item.name,
    //                       value: item.id,
    //                     }))}
    //                   />
    //                   <h1 className=" text-sm">
    //                     Je parle couramment cette langue.
    //                   </h1>
    //                   <br />
    //                   <Input
    //                     required
    //                     name="select"
    //                     label="3.Lecture"
    //                     type="select"
    //                     value={inputs.country}
    //                     errors={errors.country}
    //                     onChange={(e: any) =>
    //                       handleOnChange(e.target.value, "country")
    //                     }
    //                     options={country?.map((item: any) => ({
    //                       label: item.name,
    //                       value: item.id,
    //                     }))}
    //                   />
    //                   <Input
    //                     required
    //                     name="select"
    //                     label="4.Parler"
    //                     type="select"
    //                     value={inputs.country}
    //                     errors={errors.country}
    //                     onChange={(e: any) =>
    //                       handleOnChange(e.target.value, "country")
    //                     }
    //                     options={country?.map((item: any) => ({
    //                       label: item.name,
    //                       value: item.id,
    //                     }))}
    //                   />
    //                   <Input
    //                     required
    //                     name="select"
    //                     label="5.Comprehension"
    //                     type="select"
    //                     value={inputs.country}
    //                     errors={errors.country}
    //                     onChange={(e: any) =>
    //                       handleOnChange(e.target.value, "country")
    //                     }
    //                     options={country?.map((item: any) => ({
    //                       label: item.name,
    //                       value: item.id,
    //                     }))}
    //                   />
    //                 </div>
    //               </div>
    //             ))}
    //             <button
    //               type="button"
    //               style={{ fontSize: 11 }}
    //               onClick={addEducation}
    //               className=" bg-principal w-[60px] text-white py-2 rounded-lg hover:bg-hover transition duration-300"
    //             >
    //               Ajouter
    //             </button>
    //           </div>
    //         </div>
    //         <div className="mb-4 border rounded-lg">
    //           <div className=" px-2 py-4">
    //             {educations.map((edu, index) => (
    //               <div key={edu.id} className="border-b pb-4 mb-4">
    //                 <div className="flex justify-between items-center">
    //                   <h2 className="text-lg font-semibold text-gray-800">
    //                     Competence {index + 1}
    //                   </h2>
    //                   {educations.length > 1 && (
    //                     <button
    //                       type="button"
    //                       onClick={() => removeEducation(edu.id)}
    //                       className="text-red-500 hover:text-red-700"
    //                     >
    //                       Supprimer
    //                     </button>
    //                   )}
    //                 </div>

    //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
    //                   <Input
    //                     name="diplome"
    //                     label="Entrez la compétence à ajouter ici"
    //                     placeholder=""
    //                     type="text"
    //                     errors={errors.diplome}
    //                     value={inputs.diplome}
    //                     onChange={(e: any) =>
    //                       handleChangeEducations(
    //                         edu.id,
    //                         "diplome",
    //                         e.target.value
    //                       )
    //                     }
    //                   />
    //                 </div>
    //               </div>
    //             ))}
    //             <button
    //               type="button"
    //               style={{ fontSize: 11 }}
    //               onClick={addEducation}
    //               className=" bg-principal w-[60px] text-white py-2 rounded-lg hover:bg-hover transition duration-300"
    //             >
    //               Ajouter
    //             </button>
    //           </div>
    //         </div>
    //         <div className="mb-4 border rounded-lg">
    //           <div className=" px-2 py-4">
    //             <div>
    //               <h1 className=" text-xl font-semibold">
    //                 Attestations/certificats
    //               </h1>
    //               <p>
    //                 Parlez-nous de toute certification professionnelle que vous
    //                 détenez et qui pourrait être pertinente pour votre
    //                 candidature, y compris toute certification linguistique
    //                 potentielle.
    //               </p>
    //             </div>
    //             {educations.map((edu, index) => (
    //               <div key={edu.id} className="border-b pb-4 mb-4">
    //                 <div className="flex justify-between items-center">
    //                   <h2 className="text-lg font-semibold text-gray-800">
    //                     Attestation/certificat {index + 1}
    //                   </h2>
    //                   {educations.length > 1 && (
    //                     <button
    //                       type="button"
    //                       onClick={() => removeEducation(edu.id)}
    //                       className="text-red-500 hover:text-red-700"
    //                     >
    //                       Supprimer
    //                     </button>
    //                   )}
    //                 </div>

    //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
    //                   <Input
    //                     name="diplome"
    //                     label="Entrez la compétence à ajouter ici"
    //                     placeholder=""
    //                     type="text"
    //                     errors={errors.diplome}
    //                     value={inputs.diplome}
    //                     onChange={(e: any) =>
    //                       handleChangeEducations(
    //                         edu.id,
    //                         "diplome",
    //                         e.target.value
    //                       )
    //                     }
    //                   />
    //                   <Input
    //                     name="diplome"
    //                     label="Date de délivrance"
    //                     placeholder=""
    //                     type="date"
    //                     errors={errors.diplome}
    //                     value={inputs.diplome}
    //                     onChange={(e: any) =>
    //                       handleChangeEducations(
    //                         edu.id,
    //                         "diplome",
    //                         e.target.value
    //                       )
    //                     }
    //                   />
    //                 </div>
    //               </div>
    //             ))}
    //             <button
    //               type="button"
    //               style={{ fontSize: 11 }}
    //               onClick={addEducation}
    //               className=" bg-principal w-[60px] text-white py-2 rounded-lg hover:bg-hover transition duration-300"
    //             >
    //               Ajouter
    //             </button>
    //           </div>
    //         </div>
    //         <div className="mb-4 border rounded-lg">
    //           <div className="px-2 py-4">
    //             <h2 className="text-lg font-semibold mb-2">
    //               CV / Cover Letter
    //             </h2>
    //             <p className="text-sm text-gray-600 mb-2">
    //               Please upload a copy of your CV and a Cover Letter in support
    //               of your application.
    //             </p>
    //             <p className="text-sm text-gray-600 mb-4">
    //               Téléchargez un fichier (5 Mo maximum){" "}
    //               <span className="text-red-500">*</span>
    //             </p>

    //             {/* Zone de dépôt */}
    //             <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center mb-4">
    //               <label
    //                 htmlFor="file-upload"
    //                 className="cursor-pointer text-blue-600 flex flex-col items-center justify-center"
    //               >
    //                 <svg
    //                   className="w-12 h-12 text-blue-500 mb-2"
    //                   fill="none"
    //                   stroke="currentColor"
    //                   strokeWidth="2"
    //                   viewBox="0 0 24 24"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     d="M4 16l4-4m0 0l4 4m-4-4v12m8-12h4a2 2 0 012 2v12a2 2 0 01-2 2h-4M4 4a2 2 0 012-2h8a2 2 0 012 2v4"
    //                   ></path>
    //                 </svg>
    //                 Déposer les fichiers ici
    //                 <input
    //                   id="file-upload"
    //                   type="file"
    //                   multiple
    //                   className="hidden"
    //                   onChange={handleFileUpload}
    //                 />
    //               </label>
    //               <p className="text-sm text-gray-500 mt-2">
    //                 ou{" "}
    //                 <span className="text-blue-600 underline">
    //                   Sélectionnez des fichiers
    //                 </span>
    //               </p>
    //             </div>

    //             {/* Liste des fichiers */}
    //             {files.length > 0 && (
    //               <ul className="space-y-4">
    //                 {files.map((file, index) => (
    //                   <li
    //                     key={index}
    //                     className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
    //                   >
    //                     <div className="flex items-center space-x-4">
    //                       <svg
    //                         className="w-6 h-6 text-gray-600"
    //                         fill="none"
    //                         stroke="currentColor"
    //                         strokeWidth="2"
    //                         viewBox="0 0 24 24"
    //                         xmlns="http://www.w3.org/2000/svg"
    //                       >
    //                         <path
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           d="M14.5 10V7a2.5 2.5 0 00-5 0v3m-4.25 4h13.5A1.75 1.75 0 0118 15.75v.75a3 3 0 01-3 3h-6a3 3 0 01-3-3v-.75A1.75 1.75 0 015.25 14z"
    //                         ></path>
    //                       </svg>
    //                       <div>
    //                         <p className="text-gray-800 font-medium">
    //                           {file.name}
    //                         </p>
    //                         <p className="text-sm text-gray-500">
    //                           {(file.size / 1024 / 1024).toFixed(2)} MB
    //                         </p>
    //                       </div>
    //                     </div>
    //                     <button
    //                       onClick={() => handleFileRemove(file.name)}
    //                       className="text-red-500 hover:text-red-700"
    //                     >
    //                       <svg
    //                         className="w-5 h-5"
    //                         fill="none"
    //                         stroke="currentColor"
    //                         strokeWidth="2"
    //                         viewBox="0 0 24 24"
    //                         xmlns="http://www.w3.org/2000/svg"
    //                       >
    //                         <path
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           d="M6 18L18 6M6 6l12 12"
    //                         ></path>
    //                       </svg>
    //                     </button>
    //                   </li>
    //                 ))}
    //               </ul>
    //             )}
    //             {/* Message de confirmation */}
    //             {files.length > 0 && (
    //               <p className="text-green-600 mt-4">
    //                 Téléchargement terminé avec succès !
    //               </p>
    //             )}
    //           </div>
    //         </div>
    //         <div className="mb-4 border rounded-lg">
    //           <div className="px-2 py-4">
    //             <div>
    //               <h1 className=" text-xl font-semibold">Site web</h1>
    //               <p>Ajoutez le site web pertinent.</p>
    //             </div>
    //             <Input
    //               name="website"
    //               label="Sites web"
    //               placeholder=""
    //               type="url"
    //               errors={errors.website}
    //               value={inputs.website}
    //               // onChange={(e: any) =>
    //               //   handleChangeEducations(edu.id, "diplome", e.target.value)
    //               // }
    //             />
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div>

    </div>
  );
};

export default JobApplicationForm;

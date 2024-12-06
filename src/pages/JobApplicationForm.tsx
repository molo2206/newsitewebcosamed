import React, { useState } from "react";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    resume: null,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Candidature envoyée !");
    // Vous pouvez ajouter ici la logique pour envoyer les données à un backend ou un API.
  };

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const handleChanges = (id: any, field: any, value: any) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (id: any) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Postulez pour le poste
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Nom Complet
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="phone"
            >
              Numéro de téléphone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="experience"
            >
              Expérience professionnelle
            </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
            //   onChange={handleChanges}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="resume"
            >
              Téléchargez votre CV
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {experiences.map((exp, index) => (
            <div key={exp.id} className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Expérience {index + 1}
                </h2>
                {experiences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <input
                  type="text"
                  placeholder="Titre du poste"
                  value={exp.title}
                  onChange={(e) =>
                    handleChanges(exp.id, "title", e.target.value)
                  }
                  className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="text"
                  placeholder="Nom de l'entreprise"
                  value={exp.company}
                  onChange={(e) =>
                    handleChanges(exp.id, "company", e.target.value)
                  }
                  className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="date"
                  placeholder="Date de début"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleChanges(exp.id, "startDate", e.target.value)
                  }
                  className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="date"
                  placeholder="Date de fin"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleChanges(exp.id, "endDate", e.target.value)
                  }
                  className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <textarea
                placeholder="Description de l'expérience"
                value={exp.description}
                onChange={(e) =>
                  handleChanges(exp.id, "description", e.target.value)
                }
                className="border border-gray-300 p-2 mt-4 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300"
                rows={4}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addExperience}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Ajouter une expérience
          </button>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Soumettre la candidature
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;

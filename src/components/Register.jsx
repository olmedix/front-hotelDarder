import { useState } from "react";
import { register } from "../services/api";

export function Register({ setIsLogin }) {
  const [registerPassword, setRegisterPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    firstLastName: "",
    secondLastName: "",
    gender: "",
    identityDocument: "",
    nationality: "",
    birthDate: "",
    residence: "",
    fullAddress: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }

    setIsSubmitting(true);

    const cleanedData = { ...formData };
    if (!cleanedData.secondLastName) {
      delete cleanedData.secondLastName;
    }

    try {
      await register(cleanedData);
      setFormData({
        name: "",
        firstLastName: "",
        secondLastName: "",
        gender: "",
        identityDocument: "",
        nationality: "",
        birthDate: "",
        residence: "",
        fullAddress: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error al registrar:", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsLogin(true);
      }, 1500);
    }
  };

  const registerPasswordVisibility = () => {
    setRegisterPassword(!registerPassword);
  };

  return (
    <section className="w-1/2 mx-auto">
      <form
        className="px-5 bg-white p-4 rounded-lg shadow-gray-700 shadow-lg"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="name"
          className="block text-left font-bold ml-2 mb-1 text-lg"
        >
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Nombre..."
          maxLength={150}
          className="block p-3 rounded-xl border border-gray-300  w-full"
          autocomplete="off"
        />

        <label
          htmlFor="firstLastName"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Primer apellido <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="firstLastName"
          name="firstLastName"
          value={formData.firstLastName}
          onChange={handleInputChange}
          required
          placeholder="Primer apellido..."
          maxLength={150}
          className="block p-3 rounded-xl border border-gray-300  w-full"
          autocomplete="off"
        />

        <label
          htmlFor="secondLastName"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Segundo apellido
        </label>
        <input
          type="text"
          id="secondLastName"
          name="secondLastName"
          value={formData.secondLastName}
          onChange={handleInputChange}
          placeholder="Opcional"
          maxLength={150}
          className="block p-3 rounded-xl border border-gray-300  w-full"
          utocomplete="new-family-name"
        />

        <label
          htmlFor="gender"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Género
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="block p-3 rounded-xl border border-gray-300 w-full"
        >
          <option value="">Selecciona tu género</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>

        <label
          htmlFor="identityDocument"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Documento de identidad <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="identityDocument"
          name="identityDocument"
          value={formData.identityDocument}
          onChange={handleInputChange}
          required
          placeholder="Documento de identidad..."
          minLength={9}
          maxLength={20}
          className="block p-3 rounded-xl border border-gray-300  w-full"
          autocomplete="off"
        />

        <label
          htmlFor="nationality"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Nacionalidad <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleInputChange}
          required
          placeholder="Nacionalidad..."
          maxLength={150}
          className="block p-3 rounded-xl border border-gray-300  w-full"
          autocomplete="off"
        />

        <label
          htmlFor="birthDate"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Fecha de nacimiento <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          required
          className="block p-3 rounded-xl border border-gray-300  w-full"
          autocomplete="off"
        />

        <label
          htmlFor="residence"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          País de residencia <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="residence"
          name="residence"
          value={formData.residence}
          onChange={handleInputChange}
          required
          placeholder="Residencia..."
          maxLength={150}
          className="block p-3 rounded-xl border border-gray-300  w-full"
          autocomplete="off"
        />

        <label
          htmlFor="fullAddress"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Dirección completa <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullAddress"
          name="fullAddress"
          value={formData.fullAddress}
          onChange={handleInputChange}
          required
          placeholder="Dirección completa..."
          maxLength={150}
          className="block p-3 rounded-xl border border-blue-100  w-full"
          autocomplete="off"
        />

        <label
          htmlFor="phone"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Teléfono <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          placeholder="Teléfono..."
          minLength={8}
          maxLength={20}
          className="block p-3 rounded-xl border border-gray-300  w-full"
          autocomplete="off"
        />

        <label
          htmlFor="email"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Correo electrónico..."
          maxLength={150}
          className="block p-3 rounded-xl border border-gray-300  w-full"
          autocomplete="off"
        />

        <label
          htmlFor="password"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Contraseña <span className="text-red-500">*</span>
        </label>
        <div className="relative w-full">
          <input
            type={registerPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="Contraseña..."
            minLength={4}
            maxLength={150}
            className="block p-3 rounded-xl border border-gray-300 w-full pr-10"
            autocomplete="off"
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={registerPasswordVisibility}
          >
            {registerPassword ? "🙈" : "🙉"}
          </span>
        </div>

        <label
          htmlFor="confirmPassword"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Confirma contraseña <span className="text-red-500">*</span>
        </label>
        <div className="relative w-full">
          <input
            type={registerPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            placeholder="Confirma contraseña..."
            minLength={4}
            maxLength={150}
            className="block p-3 rounded-xl border border-gray-300 w-full pr-10"
            autocomplete="off"
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={registerPasswordVisibility}
          >
            {registerPassword ? "🙈" : "🙉"}
          </span>
        </div>
        {passwordError && (
          <p className="text-red-500 text-sm mt-2">{passwordError}</p>
        )}

        <button
          className=" mt-4 mr-2 p-2 bg-[#0097e6] text-white font-semibold rounded-md shadow hover:bg-[#007bb5] focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:ring-opacity-50"
          type="submit"
        >
          {isSubmitting ? "Enviando" : "REGÍSTRATE"}
        </button>
      </form>
    </section>
  );
}

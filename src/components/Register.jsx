import { useState } from "react";
import { register } from "../services/api";

export function Register() {
  const [registerPassword, setRegisterPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
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
    setMessage("");
    setPasswordError("");

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Les contrasenyes no coincideixen");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(formData);
      setMessage("¡Registro con éxito! Ahora puedes iniciar sessión.");
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
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const registerPasswordVisibility = () => {
    setRegisterPassword(!registerPassword);
  };

  return (
    <section className="w-1/2 mx-auto">
      <h2 className="text-3xl font-semibold mb-8">Regístrate</h2>
      <form
        className="px-5 bg-gray-300 p-4 rounded-xl mb-5"
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
          className="block p-3 rounded-xl border border-gray-300  w-full"
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
          className="block p-3 rounded-xl border border-gray-300  w-full"
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
          placeholder="Segundo apellido..."
          className="block p-3 rounded-xl border border-gray-300  w-full"
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
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
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
          className="block p-3 rounded-xl border border-gray-300  w-full"
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
          className="block p-3 rounded-xl border border-gray-300  w-full"
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
        />

        <label
          htmlFor="residence"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Residencia <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="residence"
          name="residence"
          value={formData.residence}
          onChange={handleInputChange}
          required
          placeholder="Residencia..."
          className="block p-3 rounded-xl border border-gray-300  w-full"
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
          className="block p-3 rounded-xl border border-gray-300  w-full"
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
          className="block p-3 rounded-xl border border-gray-300  w-full"
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
          className="block p-3 rounded-xl border border-gray-300  w-full"
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
            className="block p-3 rounded-xl border border-gray-300 w-full pr-10"
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
            className="block p-3 rounded-xl border border-gray-300 w-full pr-10"
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
          className="my-5  font-semibold  bg-green-600 text-white px-4 py-2 rounded-full border-2 border-white hover:text-white hover:bg-green-900 transition duration-300"
          type="submit"
        >
          {isSubmitting ? "Enviando" : "REGÍSTRATE"}
        </button>
        {message && (
          <p className="mt-4 text-xl font-semibold text-center text-green-600">
            {message}
          </p>
        )}
      </form>
    </section>
  );
}

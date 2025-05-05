import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { useUser } from "../contexts/UserContext";
import { fetchGetUser } from "../services/api";

export function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [initPassword, setInitPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setIsSubmitting(true);

    try {
      const data = await login(loginData);
      localStorage.setItem("authToken", data.access_token);
      const userData = await fetchGetUser();
      setUser(userData);
      navigate("/home");
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const initPasswordVisibility = () => {
    setInitPassword(!initPassword);
  };

  return (
    <section className="w-1/2 mx-auto">
      <form
        className="px-5 bg-white p-4 rounded-lg shadow-gray-700 shadow-lg"
        onSubmit={handleLoginSubmit}
      >
        <label
          htmlFor="email"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Correo electrónico
          <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Correo electrónico..."
          className="block p-3 rounded-xl border border-gray-300  w-full"
          onChange={handleLoginChange}
        />

        <label
          htmlFor="password"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Contraseña
          <span className="text-red-500">*</span>
        </label>
        <div className="relative w-full">
          <input
            type={initPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            placeholder="Contraseña..."
            className="block p-3 rounded-xl border border-gray-300 w-full pr-10"
            onChange={handleLoginChange}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={initPasswordVisibility}
          >
            {initPassword ? "🙈" : "🙉"}
          </span>
        </div>

        {loginError && (
          <p className="text-red-500 text-sm mt-2">{loginError}</p>
        )}

        <button
          className=" mt-4 mr-2 p-2 bg-[#0097e6] text-white font-semibold rounded-md shadow hover:bg-[#007bb5] focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:ring-opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Inicia sesión"}
        </button>
      </form>
    </section>
  );
}

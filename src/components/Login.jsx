import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export function Login({ setIsLogin }) {
  const { setHasToken } = useAuth();
  const navigate = useNavigate();
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
      setHasToken(true);
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
      <h2 className="text-3xl font-semibold mb-8">Inicia Sesión</h2>
      <form
        className="px-5 bg-gray-300 p-4 rounded-xl"
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
          className="my-5 bg-green-600 text-white px-4 py-2 rounded-full border-2 border-white hover:text-white hover:bg-green-900 transition duration-300"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Inicia sesión"}
        </button>
      </form>

      <p className="text-center text-gray-500 my-5">
        ¿No tienes cuenta?{" "}
        <span
          className="text-[#0097e6] font-semibold cursor-pointer"
          onClick={() => setIsLogin(false)}
        >
          Regístrate aquí
        </span>
      </p>

      <button
        className="my-5 py-4 text-red-400 text-xl font-semibold rounded-full"
        onClick={() => navigate("/forgot-password")}
      >
        "He olvidado la contraseña"
      </button>
    </section>
  );
}

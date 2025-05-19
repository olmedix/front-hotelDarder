import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRestoreUser, login } from "../services/api";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Swal from "sweetalert2";

export function Login() {
  const navigate = useNavigate();
  const [initPassword, setInitPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRestoreUser, setShowRestoreUser] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleClickAway = () => {
    setShowRestoreUser(false);
  };

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
      window.location.href = "/home";
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const initPasswordVisibility = () => {
    setInitPassword(!initPassword);
  };

  const handleRestoreUser = async (e) => {
    e.preventDefault();
    try {
      await fetchRestoreUser(email);
      setShowRestoreUser(false);
      Swal.fire({
        title: "Cuenta restaurada",
        text: "¡Ya puedes iniciar sesión!",
        icon: "success",
        confirmButtonColor: "#0097e6",
        confirmButtonText: "Aceptar",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "Cuenta no restaurada",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#0097e6",
        confirmButtonText: "Aceptar",
      });
      navigate("/login");
      setMessage(error.message);
    }
  };

  return (
    <section className="w-1/2 mx-auto">
      <form
        className="px-5 bg-white p-4 rounded-lg shadow-gray-700 shadow-lg animate-fade-in"
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
          className="mt-4 mr-2 p-2 bg-[#0097e6] text-white font-semibold rounded-md shadow hover:bg-[#007bb5] focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:ring-opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Inicia sesión"}
        </button>
      </form>

      {/* Restablecer cuenta */}
      <div className="flex w-full mt-3 text-[#0097e6] text-md font-semibold justify-end ">
        <button
          className="cursor-pointer"
          onClick={() => {
            setShowRestoreUser(!showRestoreUser);
          }}
        >
          Restablecer mi cuenta
        </button>
        {showRestoreUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50 backdrop-blur-xs">
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in ">
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                  Restaurar cuenta
                </h2>
                <form
                  onSubmit={handleRestoreUser}
                  className="flex flex-col gap-4"
                >
                  <label className="text-gray-700 text-left">
                    Ingresa tu email:
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0097e6] focus:border-transparent"
                    />
                  </label>
                  <button
                    type="submit"
                    className="bg-[#0097e6] hover:bg-[#007bb5] text-white py-2 px-4 rounded-lg transition"
                  >
                    Restaurar cuenta
                  </button>
                  {message && (
                    <p className="text-center text-sm text-red-500">
                      {message}
                    </p>
                  )}
                </form>
              </div>
            </ClickAwayListener>
          </div>
        )}
      </div>
    </section>
  );
}

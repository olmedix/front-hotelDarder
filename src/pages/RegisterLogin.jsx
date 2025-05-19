import { Register } from "../components/Register";
import { Login } from "../components/Login";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState, useEffect } from "react";
import { fetchForgotPassword } from "../services/api";

export function RegisterLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setshowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (error || success) {
      const timeout = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [error, success]);

  const handleClickAway = () => {
    setshowForgotPassword(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (!email || email.trim() === "") throw new Error("Email no válido");

      await fetchForgotPassword(email);
      setSuccess("Correo enviado correctamente. Revisa tu bandeja de entrada.");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setshowForgotPassword(false);
    }
  };

  if (loading)
    return <div className="text-black text-3xl font-bold">Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative w-full h-screen bg-cover bg-center mt-40">
      <section className="w-2/3 mx-auto pb-6 my-6 text-black bg-[#f2f2f2] rounded-lg shadow-gray-700 shadow-lg">
        <main>
          {!isLogin ? (
            <p
              className="text-[#0097e6] text-end pt-2 pr-2 font-semibold cursor-pointer"
              onClick={() => setIsLogin(true)}
            >
              Iniciar Sesión
            </p>
          ) : (
            <p className="text-end pt-2 pr-2 text-gray-500">
              ¿No tienes cuenta?{" "}
              <span
                className=" text-[#0097e6] font-semibold cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Regístrate aquí
              </span>
            </p>
          )}
          <h2 className="text-3xl text-gray-500 font-semibold mb-8">
            {isLogin ? "Iniciar Sesión" : "Regístrate"}
          </h2>

          {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <Register setIsLogin={setIsLogin} />
          )}
        </main>

        <section>
          <button
            className="my-5 py-4 text-red-400 text-xl font-semibold rounded-full"
            onClick={() => setshowForgotPassword(!showForgotPassword)}
          >
            He olvidado la contraseña
          </button>

          {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
          {success && <p className="text-green-600 mt-2 text-sm">{success}</p>}
          {showForgotPassword && (
            <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
              <ClickAwayListener onClickAway={handleClickAway}>
                <form
                  className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in"
                  onSubmit={handleForgotPassword}
                >
                  <h6 className="font-semibold text-xl mb-4">
                    Restablecer contraseña
                  </h6>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-left  ml-2 mb-2 text-lg font-medium"
                  >
                    Correo electrónico:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0097e6] focus:border-transparent"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />

                  <button
                    className=" mt-4 mr-2 p-2 bg-[#0097e6] text-white font-semibold rounded-md shadow hover:bg-[#007bb5] focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:ring-opacity-50"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Enviando..." : "Restablecer contraseña"}
                  </button>
                </form>
              </ClickAwayListener>
            </div>
          )}
        </section>
      </section>
      ;
    </div>
  );
}

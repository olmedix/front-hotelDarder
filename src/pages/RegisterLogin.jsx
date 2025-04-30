import { Register } from "../components/Register";
import { Login } from "../components/Login";
import { Header } from "../components/Header";
import { useState } from "react";

export function RegisterLogin() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="relative w-full h-screen bg-cover bg-center ">
      <Header />
      <main className="w-2/3 mx-auto pb-6 my-6 text-black bg-[#f2f2f2] rounded-lg shadow-gray-700 shadow-lg">
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
      ;
    </div>
  );
}

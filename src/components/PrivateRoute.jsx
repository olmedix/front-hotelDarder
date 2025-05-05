import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Header } from "./Header";

export default function PrivateRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));

  return isAuthenticated ? (
    children
  ) : (
    <div className="relative w-full min-h-screen text-black bg-cover bg-center">
      <Header />
      <section className="flex justify-end items-center h-full mt-2.5">
        <div className="bg-gray-200 border border-gray-300 shadow-lg rounded-lg p-6 w-[90%] max-w-md text-center mr-4">
          <h5 className="text-2xl font-bold mb-2 text-red-600">
            Acceso Denegado
          </h5>
          <p className="mb-4 text-black">
            Debes iniciar sesión para ver tus reservas.
          </p>
          <Link
            to="/login"
            className="custom-link mt-4 p-2 bg-[#0097e6]  rounded-md shadow"
          >
            Iniciar sesión
          </Link>
        </div>
      </section>
    </div>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

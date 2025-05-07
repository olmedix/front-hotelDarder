import { Header } from "../components/Header.jsx";
import { useUser } from "../contexts/UserContext";
import { useState, useEffect } from "react";
import { fetchUpdateUser } from "../services/api.js";
import { fetchDeleteUser } from "../services/api.js";
import { CardMyReservations } from "../components/CardMyReservations";
import { fetchMyReservations } from "../services/api";

export function UserProfile() {
  const { user, setUser, loading, error } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    firstLastName: user?.firstLastName || "",
    secondLastName: user?.secondLastName || "",
    gender: user?.gender || "",
    identityDocument: user?.identityDocument || "",
    nationality: user?.nationality || "",
    birthDate: user?.birthDate || "",
    residence: user?.residence || "",
    fullAddress: user?.fullAddress || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });
  const [reservations, setReservations] = useState([]);
  const [loadingReservation, setLoadingReservation] = useState(true);
  const [errorReservation, setErrorReservation] = useState(null);

  useEffect(() => {
    if (!user) return; // Espera a que user esté disponible

    const fetchReservations = async () => {
      try {
        const response = await fetchMyReservations(user.id);
        console.log("response" + response);
        setReservations(response);
      } catch (error) {
        setErrorReservation(error.message);
      } finally {
        setLoadingReservation(false);
      }
    };
    fetchReservations();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const cleanedData = { ...formData };
    if (!cleanedData.secondLastName) {
      delete cleanedData.secondLastName;
    }

    try {
      setLoadingUpdate(true);
      await fetchUpdateUser(user.id, cleanedData);
      setUser((prev) => ({ ...prev, ...cleanedData }));
      setMessage("Tus datos han sido actualizados correctamente.");
    } catch (error) {
      setMessage(error.message);
      setErrorUpdate(error.message);
    } finally {
      setIsSubmitting(false);
      setLoadingUpdate(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("¿Estás seguro de que deseas desactivar tu cuenta?")) {
      try {
        await fetchDeleteUser(user.id);
        setUser(null); // Clear user data from context
        localStorage.removeItem("authToken"); // Remove token from local storage
        window.location.href = "/"; // Redirect to home page
      } catch (error) {
        setMessage(error.message);
        setErrorUpdate(error.message);
      }
    }
  };

  if (loading || loadingUpdate || loadingReservation)
    return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (errorUpdate) return <div>Error: {error}</div>;
  if (errorReservation) return <div>Error: {errorReservation}</div>;

  return (
    <div className="relative w-full bg-cover bg-center mt-30">
      <h1 className="text-black text-4xl font-bold pt-8">Datos personales</h1>
      <div className="w-2/3 mx-auto my-14 pb-8 text-black bg-[#f2f2f2] rounded-lg shadow-gray-700 shadow-lg">
        <main className="px-5 mt-8 w-2/3 mx-auto rounded-t-xl">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-8"
          >
            <div>
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
                className="block p-3 rounded-xl bg-white border border-gray-500 w-full"
              />
            </div>

            <div>
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
                className="block p-3 rounded-xl bg-white border border-gray-500 w-full"
              />
            </div>

            <div>
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
                className="block p-3 rounded-xl bg-white border border-gray-500 w-full"
              />
            </div>

            <div>
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
                className="block p-3 rounded-xl bg-white border border-gray-500 w-full"
              >
                <option value="" disabled>
                  Selecciona tu género
                </option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>

            <div>
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
                className="block p-3 rounded-xl bg-white border border-gray-500 w-full"
              />
            </div>

            <div>
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
                className="block p-3 rounded-xl bg-white border border-gray-500 w-full"
              />
            </div>

            <div>
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
                className="block p-3 rounded-xl bg-white border border-gray-500 w-full"
              />
            </div>

            <div>
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
                className="block p-3 rounded-xl bg-white border border-gray-500 w-full"
              />
            </div>

            <div>
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
                className="block p-3 rounded-xl bg-white border border-gray-500 w-full"
              />
            </div>

            <div>
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
                className="block p-3 rounded-xl bg-white border border-gray-500 w-full"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <button
                className="mt-4 mr-2 p-2 bg-[#0097e6] text-white font-semibold rounded-md shadow hover:bg-[#007bb5] focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:ring-opacity-50"
                type="submit"
              >
                {isSubmitting ? "Enviando" : "Guardar cambios"}
              </button>
              {message && (
                <p className="mt-4 text-xl font-semibold text-center text-green-600">
                  {message}
                </p>
              )}
            </div>
          </form>
        </main>

        <section className="text-lg text-end font-semibold mt-5 pr-5 mx-auto">
          <p>
            <span
              className="text-red-500 cursor-pointer"
              onClick={handleDeleteAccount}
            >
              Desactivar
            </span>{" "}
            mi cuenta
          </p>
        </section>
      </div>

      {/* Mis Reservas */}
      <section className="w-2/3 mx-auto pb-6 my-6 text-black ">
        {reservations.length === 0 && (
          <div className="w-full  mt-14 ">
            <h2 className="text-4xl font-bold pt-8">Mis Reservas</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 py-4">
              {reservations.data.map((reservation) => (
                <CardMyReservations
                  key={reservation.id}
                  reservation={reservation}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

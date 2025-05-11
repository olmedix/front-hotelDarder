import { useReservation } from "../contexts/ReservationContext";
import { ReservationForm } from "../components/ReservationForm";
import { useEffect, useState } from "react";

import { fetchPension } from "../services/api";
import { fetchCategories } from "../services/api";

import { BookingPension } from "../components/BookingPension";
import { BookingCategories } from "../components/BookingCategories";

export function Booking() {
  const { state, roomNumber, rooms, people } = useReservation();

  const [pension, setPension] = useState([]);
  const [selectedRegimen, setSelectedRegimen] = useState(null);
  const [categories, setCategories] = useState([]);

  const [loadingPension, setLoadingPension] = useState(true);
  const [errorPension, setErrorPension] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataPension, dataCategories] = await Promise.all([
          fetchPension(),
          fetchCategories(),
        ]);
        setPension(dataPension);
        setCategories(dataCategories);
      } catch (err) {
        setErrorPension("Error al cargar los regímenes");
        setErrorCategories("Error al cargar las categorías");
      } finally {
        setLoadingPension(false);
        setLoadingCategories(false);
      }
    };

    fetchData();
  }, []);

  if (loadingPension || loadingCategories) {
    return <div>Cargando datos...</div>;
  }

  if (errorPension || errorCategories) {
    return (
      <div>
        <p>Error al cargar la información:</p>
        {errorPension && <p>- Pensiones: {errorPension}</p>}
        {errorCategories && <p>- Categorías: {errorCategories}</p>}
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen text-black bg-cover bg-center">
      <div className="mt-40 ">
        <ReservationForm />
      </div>

      <div className="flex w-8/10 mx-auto mt-20 mb-36">
        <div className="w-8/10 ">
          {/* sección de régimen */}
          <BookingPension
            pension={pension}
            selectedRegimen={selectedRegimen}
            setSelectedRegimen={setSelectedRegimen}
          />

          {/* Sección de habitaciones */}
          <BookingCategories categories={categories} />
        </div>

        <aside className="w-3/10 h-80 bg-amber-300">
          <div className="w-full py-2.5 rounded-lg border border-gray-200 bg-gray-300 text-gray-800 shadow-2xs">
            <h3>Detalles</h3>
          </div>
        </aside>
      </div>
    </div>
  );
}

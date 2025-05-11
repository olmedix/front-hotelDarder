import { useReservation } from "../contexts/ReservationContext";
import { ReservationForm } from "../components/ReservationForm";
import { useEffect, useState } from "react";

import { fetchPension } from "../services/api";

import { PensionBooking } from "../components/PensionBooking";

export function Booking() {
  const { state, roomNumber, rooms, people } = useReservation();

  const [pension, setPension] = useState([]);
  const [selectedRegimen, setSelectedRegimen] = useState(null);

  const [loadingPension, setLoadingPension] = useState(true);
  const [errorPension, setErrorPension] = useState(null);

  useEffect(() => {
    const getPension = async () => {
      try {
        const data = await fetchPension();
        console.log(data);
        setPension(data);
      } catch (err) {
        setErrorPension(err.message);
      } finally {
        setLoadingPension(false);
      }
    };

    getPension();
  }, []);

  if (loadingPension) return <div>Cargando...</div>;
  if (errorPension) return <div>{errorPension}</div>;

  return (
    <div className="relative w-full min-h-screen text-black bg-cover bg-center">
      <div className="mt-40 ">
        <ReservationForm />
      </div>

      <div className="flex w-9/10 mx-auto mt-20 mb-36">
        {/* sección de régimen */}
        <PensionBooking
          pension={pension}
          selectedRegimen={selectedRegimen}
          setSelectedRegimen={setSelectedRegimen}
        />

        {/* Sección de habitaciones */}
        <section>{/* TO DO*/}</section>

        <aside className="w-1/4 h-80 bg-amber-300">
          <div className="w-full py-2.5 rounded-lg border border-gray-200 bg-gray-300 text-gray-800 shadow-2xs">
            <h3>Detalles</h3>
          </div>
        </aside>
      </div>
    </div>
  );
}

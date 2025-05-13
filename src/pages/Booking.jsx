import { format } from "date-fns";
import { useReservation } from "../contexts/ReservationContext";
import { ReservationForm } from "../components/ReservationForm";
import { useEffect, useState } from "react";

import { fetchPension } from "../services/api";
import { fetchCategories } from "../services/api";

import { BookingPension } from "../components/BookingPension";
import { BookingCategories } from "../components/BookingCategories";

export function Booking() {
  const { state, roomNumber, rooms, people } = useReservation();
  console.log("state", state);
  console.log("roomNumber", roomNumber);
  console.log("rooms", rooms);
  console.log("people", people);
  const [note, setNote] = useState("");
  const [priceRooms, setPriceRooms] = useState([]);

  const [pension, setPension] = useState([]);
  const [selectedRegimen, setSelectedRegimen] = useState(0);
  const [categories, setCategories] = useState([]);

  const [loadingPension, setLoadingPension] = useState(true);
  const [errorPension, setErrorPension] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    setPriceRooms([]);
  }, [roomNumber]);

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
          <BookingCategories
            categories={categories}
            state={state}
            roomNumber={roomNumber}
            rooms={rooms}
            priceRooms={priceRooms}
            setPriceRooms={setPriceRooms}
          />

          <section className="block w-9/10 text-left mt-6  px-5 mx-auto rounded-t-xl">
            <h6 className="text-black text-4xl font-bold pt-8 mb-5">
              Agrega una nota a la reserva
            </h6>

            <textarea
              className="mb-10  w-full h-[150px] p-2.5 bg-gray-100 border-2 border-gray-300 text-lg rounded-xl"
              placeholder="Escribe aquí tu nota"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </section>
        </div>

        {/* Sección de detalles de la reserva */}
        <aside className="sticky top-0 w-3/10 h-80 text-lg text-black bg-gray-100 rounded-lg">
          <div className="w-full bg-gray-100 pb-6 rounded-b-lg">
            <div className="w-full py-2.5 rounded-lg border border-gray-200 bg-gray-300 text-gray-800 shadow-2xs">
              <h3>Detalles de la reserva</h3>
            </div>

            <div className="text-left  border-b border-gray-500 mx-2.5 py-2">
              <div className="flex justify-between items-center">
                <p className="font-semibold">Fechas:</p>
                {` ${format(state[0].startDate, "yyyy/MM/dd")} - ${format(
                  state[0].endDate,
                  "yyyy/MM/dd"
                )}`}
              </div>

              <div className="flex justify-between items-center">
                <p className="font-semibold ">Nº Personas:</p>
                {people}
              </div>

              <div className="flex justify-between items-center">
                <p className="font-semibold ">Régimen:</p>
                {pension[selectedRegimen - 1]?.name}
              </div>
            </div>

            {/* Detalles de las habitaciones */}
            <div className="text-left bg-gray-100 border-b border-gray-500 mx-2.5 py-2">
              {rooms.slice(0, roomNumber).map((room, idx) => (
                <div className="pb-2" key={idx}>
                  <p className="font-semibold text-xl">Habitación {idx + 1}</p>
                  <div className="flex justify-between items-center">
                    <p className="pl-3 font-semibold">- Categoría:</p>
                    {categories.find((cat) => cat.id === priceRooms[idx]?.id)
                      ?.name || (
                      <span className="text-red-500">No seleccionada</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="pl-3 font-semibold">- Nº Personas:</p>
                    {room.value}
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="pl-3 font-semibold">- Precio:</p>
                    {priceRooms[idx]?.value}€
                  </div>
                </div>
              ))}
            </div>

            {/* PRECIO TOTAL */}
            <div className=" bg-gray-100  mx-2.5 py-2">
              {/*Precio total de las habitaciones*/}
              <div className="flex justify-between items-center font-bold">
                <p className="text-LG">Régimen</p>
                {(pension.find((p) => p.id === selectedRegimen)?.price || 0) *
                  people}
                €
              </div>
              {/*Precio total de las pensiones*/}
              <div className="flex justify-between items-center font-bold">
                <p className="text-LG">Habitaciones:</p>
                {priceRooms.reduce((acc, room) => acc + room.value, 0)}€
              </div>
              <div className="flex justify-between items-center text-3xl font-bold">
                {/* Suma de habitaciones y régimen */}
                <p className="text-xl">PRECIO FINAL:</p>
                {priceRooms.reduce((acc, room) => acc + room.value, 0) +
                  (pension.find((p) => p.id === selectedRegimen)?.price || 0) *
                    people}
                €
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

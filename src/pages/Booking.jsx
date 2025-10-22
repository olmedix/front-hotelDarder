import { format } from "date-fns";
import { useUser } from "../contexts/UserContext";
import { useReservation } from "../contexts/ReservationContext";
import { ReservationForm } from "../components/ReservationForm";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";

import { fetchPension } from "../services/api";
import { fetchCategories } from "../services/api";
import { fetchReserva } from "../services/api";
import { API_BASE_URL } from "../services/api";

import { Spinner } from "../components/Spinner";
import { BookingPension } from "../components/BookingPension";
import { BookingCategories } from "../components/BookingCategories";

export function Booking() {
  const stripePromise = loadStripe(
    "pk_test_51RIeK2RpGxL5WH6XfnCzEWv5XSuvvf3UwrBs7V76aJ7wU9uJKpy2joWfVkM6KFhVoFiVlT6MLzO0dXqC0hfXeTIm00uzoS5tZ3"
  );
  const navigate = useNavigate();

  const { user } = useUser();
  const {
    state,
    roomNumber,
    setRoomNumber,
    rooms,
    people,
    roomNumberSelected,
    setRoomNumberSelected,
  } = useReservation();
  const [note, setNote] = useState("");
  const [priceRooms, setPriceRooms] = useState([]);
  const [lastUsedDiscount, setLastUsedDiscount] = useState(false);

  const [pension, setPension] = useState([]);
  const [selectedRegimen, setSelectedRegimen] = useState(0);
  const [categories, setCategories] = useState([]);

  const [loadingPension, setLoadingPension] = useState(true);
  const [errorPension, setErrorPension] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  // Conocer la diferencia entre las dos fechas en días
  const start = state[0].startDate;
  const end = state[0].endDate;
  const diffTime = Math.abs(end - start); // diferencia en milisegundos
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convertir a días

  // Para actualizar el numero de habitaciones disponibles localmente
  const [selectedRoomsCount, setSelectedRoomsCount] = useState({});
  const [roomCategorySelected, setRoomCategorySelected] = useState({});
  useEffect(() => {
    setSelectedRoomsCount({});
  }, [roomNumber]);

  useEffect(() => {
    setPriceRooms([]);
  }, [roomNumber, people, state]);

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

  const resetReservationForm = () => {
    setNote("");
    setPriceRooms([]);
    setRoomNumber(1);
    setRoomNumberSelected(1);
  };

  const toggleTotalPrice = () => {
    return (
      priceRooms.reduce((acc, room) => acc + room.value, 0) +
      (pension.find((p) => p.id === selectedRegimen)?.price || 0) *
        people *
        diffDays
    );
  };

  const handlePurchase = async () => {
    try {
      const generateRandomString = (length = 10) => {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
        return result;
      };

      // Agrupar por categoría de habitación
      const groupedRoomCategories = Object.values(
        rooms.slice(0, roomNumberSelected).reduce((acc, room, index) => {
          const id = priceRooms[index]?.id;
          const numPeople = room.value;

          if (!id) return acc;

          if (!acc[id]) {
            acc[id] = {
              id,
              quantity: 1,
              numPeople: numPeople,
            };
          } else {
            acc[id].quantity += 1;
            acc[id].numPeople += numPeople;
          }

          return acc;
        }, {})
      );

      const reservations = [
        {
          reservation_number: generateRandomString(),
          start_date: format(state[0].startDate, "yyyy-MM-dd"),
          end_date: format(state[0].endDate, "yyyy-MM-dd"),
          numPeople: people,
          totalPrice: toggleTotalPrice(),
          status: "pending",
          notes: note,
          pension_id: selectedRegimen,
          room_categories: groupedRoomCategories,
        },
      ];

      //Crear la reserva
      const reservaData = await fetchReserva(
        lastUsedDiscount ? false : true,
        reservations
      );
      const reserva = reservaData.data[0];

      if (lastUsedDiscount) {
        // 1. Guardar la reserva en localStorage para el pago
        localStorage.setItem("reservationRooms", JSON.stringify(reserva));

        // 2. Crear sesión de Stripe
        const response = await fetch(
          `${API_BASE_URL}/create-checkout-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "Reserva de habitación",
              amount: toggleTotalPrice(),
              type: "hotel",
            }),
          }
        );
        const session = await response.json();
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: session.id });
      } else {
        // Modal de confirmación de reserva
        modalConfirmReservation();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const modalConfirmReservation = () => {
    Swal.fire({
      title: "Reserva realizada",
      text: "¡Gracias por reservar con nosotros, pronto recibirá un correo con la información de su reserva!",
      icon: "success",
      confirmButtonColor: "#0097e6",
      confirmButtonText: "Aceptar",
    });
  };

  if (loadingPension || loadingCategories) {
    return <Spinner />;
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
      <div className="mt-44 sm:mt-50 mx-auto">
        <ReservationForm setPriceRooms={setPriceRooms} />
      </div>

      <div className="flex flex-col-reverse lg:flex lg:flex-row w-8/10 mx-auto mt-20 mb-36">
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
            priceRooms={priceRooms}
            setPriceRooms={setPriceRooms}
            diffDays={diffDays}
            lastUsedDiscount={lastUsedDiscount}
            setLastUsedDiscount={setLastUsedDiscount}
            selectedRoomsCount={selectedRoomsCount}
            setSelectedRoomsCount={setSelectedRoomsCount}
            roomCategorySelected={roomCategorySelected}
            setRoomCategorySelected={setRoomCategorySelected}
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
        <aside className="w-full lg:w-3/10 lg:sticky top-0 h-80 text-lg text-black bg-gray-100 rounded-lg">
          <div className="w-full bg-gray-100 pb-6 rounded-b-lg">
            <div className="w-full py-2.5 rounded-lg border border-gray-200 bg-gray-300 text-gray-800 shadow-2xs">
              <h3>Detalles de la reserva</h3>
            </div>

            <div className="text-left  border-b border-gray-500 mx-2.5 py-2">
              <div className="flex justify-between lg:block xl:flex items-center">
                <p className="font-semibold">Fechas:</p>
                <p className="lg:text-end">
                  {` ${format(state[0].startDate, "yyyy/MM/dd")} - ${format(
                    state[0].endDate,
                    "yyyy/MM/dd"
                  )}`}
                </p>
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
              {rooms.slice(0, roomNumberSelected).map((room, idx) => (
                <div className="pb-2" key={idx}>
                  <p className="font-semibold text-xl">Habitación {idx + 1}</p>
                  <div className="flex lg:block xl:flex justify-between items-center">
                    <p className="pl-3 font-semibold">- Categoría:</p>
                    <p className="text-end">
                      {categories.find((cat) => cat.id === priceRooms[idx]?.id)
                        ?.name || (
                        <span className="text-red-500">No seleccionada</span>
                      )}
                    </p>
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
                  people *
                  diffDays}
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
                {toggleTotalPrice()}€
              </div>

              <button
                className="mt-4 border-2 border-[#0097e6] bg-[#0097e6] text-white py-2 px-3 shadow-md shadow-black rounded-lg hover:bg-[#0072a3] transition duration-300 ease-in-out
                disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed"
                onClick={() => {
                  if (!user) {
                    Swal.fire({
                      title: "Inicia sesión",
                      text: "Para realizar la reserva debes iniciar sesión",
                      icon: "warning",
                      confirmButtonColor: "#0097e6",
                      confirmButtonText: "Iniciar sesión",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate("/login");
                      }
                    });
                    return;
                  }
                  handlePurchase();
                  resetReservationForm();
                }}
                disabled={
                  priceRooms.length < roomNumber ||
                  roomNumberSelected < roomNumber
                }
              >
                Reservar ahora
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

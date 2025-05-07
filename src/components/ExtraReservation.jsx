import { loadStripe } from "@stripe/stripe-js";
import { fetchReservaExtras } from "../services/api";
import { API_BASE_URL } from "../services/api";
import { useState } from "react";
import { useHotel } from "../contexts/HotelContext";
import { generatePDF } from "../services/generatePdf";

const stripePromise = loadStripe(
  "pk_test_51RIeK2RpGxL5WH6XfnCzEWv5XSuvvf3UwrBs7V76aJ7wU9uJKpy2joWfVkM6KFhVoFiVlT6MLzO0dXqC0hfXeTIm00uzoS5tZ3"
);

export function ExtraReservation({
  selectedExtras,
  extras,
  setSelectedExtras,
  setQuantity,
  setOpenQuantity,
}) {
  const { hotel } = useHotel();
  const [showDialog, setShowDialog] = useState(false);

  const totalPrice = Object.entries(selectedExtras).reduce(
    (acc, [id, quantity]) => {
      const extra = extras.find((item) => item.id === parseInt(id));
      if (!extra) return acc;
      return acc + extra.price * quantity;
    },
    0
  );

  const resetSelectedExtras = () => {
    //Vaciar el carrito de extras
    Object.keys(selectedExtras).forEach((id) => {
      selectedExtras[id] = 0;
    });
    localStorage.removeItem("selectedExtras");
    setSelectedExtras({});
    setQuantity({});
    setOpenQuantity({});
  };

  const handlePurchase = async (status) => {
    try {
      const generateRandomString = (length) => {
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

      const reservations = [
        {
          extra_reservation_number: generateRandomString(10),
          totalPrice: totalPrice,
          status: status,
          user_id: 1,
          extras: Object.entries(selectedExtras).map(([id, quantity]) => ({
            extra_id: id,
            quantity: quantity,
          })),
        },
      ];

      // 1. Crear la reserva
      const reservaData = await fetchReservaExtras(reservations);
      const reserva = reservaData.data[0];

      if (!reserva) throw new Error("Error creando reserva");

      if (status === "confirmed") {
        // 2. Crear sesión de Stripe
        const response = await fetch(
          `${API_BASE_URL}/create-checkout-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "Reserva de extras",
              amount: reserva.totalPrice,
            }),
          }
        );

        const session = await response.json();
        const stripe = await stripePromise;

        localStorage.setItem("reserva", JSON.stringify(reserva));
        localStorage.setItem("extras", JSON.stringify(extras));
        localStorage.setItem("reservations", JSON.stringify(reservations));
        resetSelectedExtras();
        await stripe.redirectToCheckout({ sessionId: session.id });
      } else if (status === "pending") {
        generatePDF(reserva, extras, reservations);
        setShowDialog(true);
        resetSelectedExtras();
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error en el proceso de compra");
    }
  };

  return (
    <>
      <aside className="w-1/4 ">
        <div className="w-full py-2.5 rounded-lg border border-gray-200 bg-gray-300 text-gray-800 shadow-2xs">
          <h2 className="text-xl font-medium">Detalles de la reserva</h2>

          <ul className="space-y-2 mt-4 px-2">
            {Object.entries(selectedExtras).map(([id, quantity]) => {
              const extra = extras.find((item) => item.id === parseInt(id));

              if (quantity === 0) return null; // Si la cantidad es 0, no pinta nada
              if (!extra) return null; // Si no encuentra el extra, no pinta nada

              return (
                <li
                  key={id}
                  className="flex justify-between items-center p-3 bg-white rounded-md shadow"
                >
                  <span className="text-gray-700 font-medium">
                    {extra.name}
                  </span>
                  <span className="text-[#0097e6] font-bold">
                    {`(${extra.price * quantity}€) `} x{quantity}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Total */}
          {totalPrice === 0 ? (
            <div className="mt-6 mx-2 px-4 bg-white rounded-md shadow font-bold text-lg flex flex-col items-center justify-center h-40 text-center">
              <p className="text-gray-600">¡Añade extras a tu reserva!</p>
              <p className="text-[#0097e6] mt-2">
                Haz tu experiencia aún mejor ✨
              </p>
            </div>
          ) : (
            <div className="mx-2 mt-8 px-4 py-3 bg-white rounded-md shadow font-bold text-lg flex justify-between items-center">
              <span>Total a pagar:</span>
              <span className="text-green-600">{totalPrice.toFixed(2)}€</span>
            </div>
          )}

          {/* Botón de continuar con la reserva */}
          {totalPrice !== 0 && (
            <>
              <button
                className=" mt-4 mr-2 p-2 bg-[#0097e6] text-white font-semibold rounded-md shadow hover:bg-[#007bb5] focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:ring-opacity-50"
                disabled={totalPrice === 0}
                onClick={() => handlePurchase("confirmed")}
              >
                Pagar ahora
              </button>

              <button
                className=" mt-4 p-2 bg-[#0097e6] text-white font-semibold rounded-md shadow hover:bg-[#007bb5] focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:ring-opacity-50"
                disabled={totalPrice === 0}
                onClick={() => handlePurchase("pending")}
              >
                Pagar en el hotel
              </button>
            </>
          )}
        </div>
        <div className="mt-6 mx-2 p-4 bg-gray-200 rounded-md shadow font-bold text-lg flex flex-col items-center justify-center text-center">
          <p className="text-gray-600">
            ¡Confirma el día de tu reserva con el Hotel!
          </p>
          <p className="text-[#0097e6] mt-2">
            Email:{" "}
            <a href={`tel:${hotel[0].phone}`} className="hover:underline">
              {hotel[0].email}
            </a>
          </p>
          <p className="text-[#0097e6] mt-2">
            Telf:{" "}
            <a href={`tel:${hotel[0].phone}`} className="hover:underline">
              {hotel[0].phone}
            </a>
          </p>
        </div>
      </aside>

      {showDialog && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-300 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#0097e6]">
              ¡Reserva realizada!
            </h2>
            <p className="text-gray-700 mb-4">
              El cobro se realizará en el hotel. 📄
            </p>
            <button
              className="px-4 py-2 bg-[#0097e6] text-white rounded hover:bg-[#007bb5]"
              onClick={() => setShowDialog(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

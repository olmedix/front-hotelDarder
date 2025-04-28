import { loadStripe } from "@stripe/stripe-js";
import { fetchReservaExtras } from "../services/api";
import { API_BASE_URL } from "../services/api";
import { jsPDF } from "jspdf";
import { useState } from "react";

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
  const [showDialog, setShowDialog] = useState(false);

  const totalPrice = Object.entries(selectedExtras).reduce(
    (acc, [id, quantity]) => {
      const extra = extras.find((item) => item.id === parseInt(id));
      if (!extra) return acc;
      return acc + extra.price * quantity;
    },
    0
  );

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
        await stripe.redirectToCheckout({ sessionId: session.id });
      } else if (status === "pending") {
        const doc = new jsPDF();

        const today = new Date();
        const formattedDate = today.toLocaleDateString();
        const formattedTime = today.toLocaleTimeString();

        // Título
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Confirmación de Reserva de Extras", 20, 20);

        doc.setLineWidth(0.5);
        doc.line(20, 25, 190, 25); // línea divisoria

        // Información general
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(
          `Número de reserva: ${reserva.extra_reservation_number}`,
          20,
          40
        );
        doc.text(`Fecha: ${formattedDate}`, 20, 50);
        doc.text(`Hora: ${formattedTime}`, 20, 60);
        doc.text(`Estado: ${reserva.status}`, 20, 70);

        doc.line(20, 75, 190, 75); // línea divisoria

        // Lista de extras
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Extras reservados:", 20, 85);

        let y = 100;
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        reservations[0].extras.forEach((extra) => {
          const extraInfo = extras.find(
            (item) => item.id === parseInt(extra.extra_id)
          );
          if (extraInfo) {
            doc.text(
              `• ${extraInfo.name} x${extra.quantity} - ${(
                extraInfo.price * extra.quantity
              ).toFixed(2)}€`,
              25,
              y
            );
            y += 10;
          }
        });

        doc.line(20, y, 190, y); // línea divisoria final
        y += 10;

        // Total
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(
          `Total a pagar en el hotel: ${reserva.totalPrice.toFixed(2)}€`,
          20,
          y
        );

        // Guardar
        doc.save(`reserva_extras_${reserva.extra_reservation_number}.pdf`);
        setShowDialog(true);
        //Vaciar el carrito de extras
        Object.keys(selectedExtras).forEach((id) => {
          selectedExtras[id] = 0;
        });
        localStorage.removeItem("selectedExtras");
        setSelectedExtras({});
        setQuantity({});
        setOpenQuantity({});
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
          <button
            className=" mt-4 mr-2 p-2 bg-[#0097e6] text-white font-semibold rounded-md shadow hover:bg-[#007bb5] focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:ring-opacity-50"
            onClick={() => handlePurchase("confirmed")}
          >
            Pagar ahora
          </button>

          <button
            className=" mt-4 p-2 bg-[#0097e6] text-white font-semibold rounded-md shadow hover:bg-[#007bb5] focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:ring-opacity-50"
            onClick={() => handlePurchase("pending")}
          >
            Pagar en el hotel
          </button>
        </div>
      </aside>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-600">
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

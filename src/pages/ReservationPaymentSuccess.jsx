import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { fetchPayment } from "../services/api";
import { fetchUpdateReserva } from "../services/api";

export function ReservationPaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleSuccess() {
      const storedReserva = JSON.parse(
        localStorage.getItem("reservationRooms")
      );

      try {
        // Primero debe ejecutarse el cobro
        await fetchPayment({
          amount: storedReserva.totalPrice,
          payment_method: "card",
          IVA: storedReserva.totalPrice * 0.21,
          status: "paid",
          paymentable_type: "reservation",
          paymentable_id: storedReserva.id,
        });

        // Despues del cobro actualizamos el estado de la reserva
        await fetchUpdateReserva(storedReserva.reservation_number, "confirmed");

        localStorage.removeItem("reservationRooms");
      } catch (error) {
        console.error(error.message);
      }
    }

    handleSuccess();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        ¡Reserva confirmada!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Tu reserva se está procesando ,pronto recibirás un correo con toda la
        información de su reserva. 📄
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-[#0097e6] text-white rounded-md hover:bg-[#007bb5] transition"
      >
        Volver al inicio
      </button>
    </div>
  );
}

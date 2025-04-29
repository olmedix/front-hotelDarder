import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { generatePDF } from "../services/generatePdf";
import { fetchPayment } from "../services/api";

export function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleSuccess() {
      const storedReserva = JSON.parse(localStorage.getItem("reserva"));
      const storedExtras = JSON.parse(localStorage.getItem("extras"));
      const storedReservations = JSON.parse(
        localStorage.getItem("reservations")
      );

      try {
        await fetchPayment({
          amount: storedReserva.totalPrice,
          payment_method: "card",
          IVA: storedReserva.totalPrice * 0.21,
          status: "paid",
          paymentable_type: "extra_reservation",
          paymentable_id: storedReserva.id,
        });

        await generatePDF(storedReserva, storedExtras, storedReservations);

        localStorage.removeItem("reserva");
        localStorage.removeItem("extras");
        localStorage.removeItem("reservations");
      } catch (error) {
        console.error(error.message);
      }
    }

    handleSuccess();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        ¡Pago confirmado!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Tu reserva se está descargando automáticamente. 📄
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-[#0097e6] text-white rounded-md hover:bg-[#007bb5] transition"
      >
        Volver a Inicio
      </button>
    </div>
  );
}

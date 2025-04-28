import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { generatePDF } from "../services/generatePdf";

export function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleSuccess() {
      // Puedes sacar info de la reserva si quieres
      const storedReserva = JSON.parse(localStorage.getItem("reserva"));
      const storedExtras = JSON.parse(localStorage.getItem("extras"));
      const storedReservations = JSON.parse(
        localStorage.getItem("reservations")
      );

      if (storedReserva && storedExtras && storedReservations) {
        await generatePDF(storedReserva, storedExtras, storedReservations);

        // Limpia el storage si quieres
        localStorage.removeItem("reserva");
        localStorage.removeItem("extras");
        localStorage.removeItem("reservations");
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

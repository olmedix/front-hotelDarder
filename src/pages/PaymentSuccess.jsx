import { useNavigate } from "react-router-dom";

export function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="text-black">
      <h1>¡Gracias por tu compra!</h1>
      <p>Tu reserva ha sido confirmada.</p>
      <p>Recibirás un correo electrónico con los detalles de tu reserva.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Volver a Inicio
      </button>
    </div>
  );
}

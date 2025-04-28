import { loadStripe } from "@stripe/stripe-js";
import { fetchReservaExtras } from "../services/api";
import { API_BASE_URL } from "../services/api";

const stripePromise = loadStripe(
  "pk_test_51RIeK2RpGxL5WH6XfnCzEWv5XSuvvf3UwrBs7V76aJ7wU9uJKpy2joWfVkM6KFhVoFiVlT6MLzO0dXqC0hfXeTIm00uzoS5tZ3"
);

export function ExtraReservation({ selectedExtras, extras }) {
  const totalPrice = Object.entries(selectedExtras).reduce(
    (acc, [id, quantity]) => {
      const extra = extras.find((item) => item.id === parseInt(id));
      if (!extra) return acc;
      return acc + extra.price * quantity;
    },
    0
  );

  const handlePurchase = async () => {
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
          totalPrice: totalPrice, // Usamos el total calculado
          status: "pending", // Estado de la reserva
          extras: Object.entries(selectedExtras).map(([id, quantity]) => ({
            extra_id: id,
            quantity: quantity,
          })),
        },
      ];

      console.log("reservations", reservations);
      // 1. Crear la reserva
      const reservaData = await fetchReservaExtras(reservations);
      const reserva = reservaData.data[0];

      if (!reserva) throw new Error("Error creando reserva");

      // 2. Crear la sesión de Stripe
      const response = await fetch(`${API_BASE_URL}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Reserva de extras",
          amount: reserva.totalPrice,
        }),
      });

      const session = await response.json();

      // 3. Redirigir al checkout de Stripe
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error(error);
      alert("Hubo un error en el proceso de compra");
    }
  };

  return (
    <aside className="w-1/4 ">
      <div className="w-full py-2.5 rounded-lg border border-gray-200 bg-gray-300 text-gray-800 shadow-2xs">
        <h2 className="text-xl font-medium">Detalles de la reserva</h2>

        <ul className="space-y-2 mt-4 px-2">
          {Object.entries(selectedExtras).map(([id, quantity]) => {
            const extra = extras.find((item) => item.id === parseInt(id));

            if (!extra) return null; // Si no encuentra el extra, no pinta nada

            return (
              <li
                key={id}
                className="flex justify-between items-center p-3 bg-white rounded-md shadow"
              >
                <span className="text-gray-700 font-medium">{extra.name}</span>
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
          className=" mt-4 p-2 bg-[#0097e6] text-white font-semibold rounded-md shadow hover:bg-[#007bb5] focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:ring-opacity-50"
          onClick={handlePurchase}
        >
          Comprar
        </button>
      </div>
    </aside>
  );
}

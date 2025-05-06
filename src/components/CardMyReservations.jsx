export function CardMyReservations({ reservation }) {
  return (
    <div className="bg-[#f2f2f2] rounded-lg shadow-gray-700 shadow-lg p-4 my-4 text-left">
      <p>
        <span className="font-semibold"> Número de reserva: </span>
        {reservation.reservation_number + " "}
      </p>
      <p>
        <span className="font-semibold"> Fecha de inicio: </span>
        {reservation.start_date}
      </p>
      <p>
        <span className="font-semibold"> Fecha de fin: </span>
        {reservation.end_date}
      </p>
      <p>
        <span className="font-semibold"> Número de personas: </span>
        {reservation.numPeople + " "}
      </p>
      <p>
        <span className="font-semibold"> Pensión: </span>
        {reservation.pension + " "}
      </p>
      <p>
        <span className="font-semibold"> Precio: </span>
        {reservation.totalPrice + " "}€
      </p>
      {reservation.payment && (
        <p>
          <span className="font-semibold"> Método de pago: </span>
          {reservation.payment.payment_method}
        </p>
      )}
      <p>
        <span className="font-semibold"> Estado: </span>
        {reservation.status === "pending" &&
        reservation.end_date < new Date().toISOString().split("T")[0]
          ? "Completed"
          : reservation.status}
      </p>
      <p>
        <span className="font-semibold"> Categorias: </span>
      </p>
      <ul>
        {reservation.room_categories.map((category, index) => (
          <li key={index} className="text-gray-500 text-sm pl-2">
            {category.name} - {category.roomView}
          </li>
        ))}
      </ul>
    </div>
  );
}

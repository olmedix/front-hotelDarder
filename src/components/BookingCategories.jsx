import { URL_BACK } from "../services/api";
import { useState, useEffect } from "react";
import { useReservation } from "../contexts/ReservationContext";
import { FaRulerCombined } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiBathtubFill } from "react-icons/pi";
import Swal from "sweetalert2";

export function BookingCategories({
  categories,
  priceRooms,
  setPriceRooms,
  diffDays,
  lastUsedDiscount,
  setLastUsedDiscount,
}) {
  const { roomNumber, rooms, roomNumberSelected, setRoomNumberSelected } =
    useReservation();
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  const discountPrice = 0.9; // 10% de descuento

  // Vamos cambiando de habitación seleccionada y si el usuario reduce comienza desde la 1
  useEffect(() => {
    setRoomNumberSelected(1);
  }, [roomNumber]);

  // Si el usuario cambia entre tipo de descuento, se actualizan los precios de todas las habitaciones.
  useEffect(() => {
    if (appliedDiscount === null) return;

    const updatedPrices = priceRooms.map((priceObj) => {
      if (!priceObj || !priceObj.id) return priceObj;
      const category = categories.find((c) => c.id === priceObj.id);
      if (!category) return priceObj;

      return {
        id: category.id,
        value: category.price * diffDays * appliedDiscount,
      };
    });

    setPriceRooms(updatedPrices);
  }, [appliedDiscount]);

  const handleCategorySelect = (item, newDiscount) => {
    const roomIndex = roomNumberSelected - 1;

    if (item.capacity < rooms[roomIndex].value) {
      Swal.fire({
        icon: "warning",
        title: "Capacidad excedida",
        text: "La habitación no acepta esa cantidad de personas.",
        confirmButtonColor: "#0097e6",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // Si el tipo de descuento ha cambiado, lo actualizamos
    if (appliedDiscount !== newDiscount) {
      setAppliedDiscount(newDiscount);
    }

    const newPrice = item.price * diffDays * newDiscount;

    const updatedPrices = [...priceRooms];
    updatedPrices[roomIndex] = {
      id: item.id,
      value: newPrice,
    };

    setPriceRooms(updatedPrices);

    setLastUsedDiscount(newDiscount !== 1);

    if (roomNumberSelected < roomNumber) {
      setRoomNumberSelected(roomNumberSelected + 1);
      const h2Element = document.querySelector("h2");
      if (h2Element) {
        const y = h2Element.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="block w-9/10 text-left mt-6  px-5 mx-auto rounded-t-xl">
      <h2 className="text-black text-4xl font-bold pt-8 mb-5">
        Elige tu habitación {roomNumberSelected}
      </h2>

      {categories.map((item) => (
        <article
          key={item.id}
          className="mb-10  w-full h-[300px] bg-gray-100 border-2 border-gray-300 text-lg rounded-xl"
        >
          <div className="flex h-6/10 w-full border-b-2 border-gray-300">
            <div
              style={{
                position: "relative",
                width: "30%",
                height: "100%",
                backgroundImage: `url(${URL_BACK}${item.images[1].url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="w-3/10 h-6/10 rounded-tl-xl"
            />

            <div className=" w-7/10">
              <h3 className="bg-[#0097e6] text-white pb-2 px-4 font-semibold text-2xl rounded-tr-xl ">{`${item.name} ${item.room_view.name}`}</h3>
              <p className="px-4 text-gray-500 pb-2">{item.description}</p>
              <ul className="px-4 flex gap-x-6 text-sm text-gray-500 pb-2 font-semibold">
                <li className="flex gap-2">
                  <FaRulerCombined /> {item.roomArea}M²
                </li>
                <li className="flex gap-2">
                  <FaPeopleGroup className="text-xl" />
                  {item.capacity}
                </li>
                {item.jacuzzi === 1 && (
                  <li className="flex gap-2">
                    <PiBathtubFill className="text-xl" /> Jacuzzi
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="flex  w-full h-4/10">
            <div className="w-1/2 pt-2 border-r-2 border-gray-300 text-center">
              <h6 className="font-semibold pb-1 ">
                <span className="border rounded-lg border-green-700 bg-green-300 py-1 px-2">
                  -10%
                </span>
                {" - "}
                PAGO EN LA RESERVA
              </h6>

              <div className="flex text-center justify-center items-center gap-4">
                <span className="font-semibold">
                  {" "}
                  {item.price * diffDays * discountPrice}€
                </span>

                {/* BOTON  CON DESCUENTO*/}
                <button
                  className="border-2 border-[#0097e6] text-[#0097e6] py-2 px-3 shadow-md shadow-black rounded-lg hover:bg-[#0097e6] hover:text-white transition duration-300 ease-in-out"
                  onClick={() => handleCategorySelect(item, discountPrice)}
                >
                  Seleccionar
                </button>
              </div>
            </div>

            <div className="w-1/2 pt-2  border-gray-300 text-center">
              <h6 className="font-semibold pb-1">PAGO EN EL HOTEL</h6>
              <div className="flex text-center justify-center items-center gap-4">
                <span className="font-semibold">{item.price * diffDays}€</span>

                {/* BOTON  */}
                <button
                  className="border-2 border-[#0097e6] text-[#0097e6] py-2 px-3 shadow-md shadow-black rounded-lg hover:bg-[#0097e6] hover:text-white transition duration-300 ease-in-out"
                  onClick={() => handleCategorySelect(item, 1)}
                >
                  Seleccionar
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

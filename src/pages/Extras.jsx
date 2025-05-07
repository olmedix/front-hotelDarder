import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import { fetchExtras } from "../services/api";
import { URL_BACK } from "../services/api";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

import { Header } from "../components/Header";
import { ExtraReservation } from "../components/ExtraReservation";

export function Extras() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [extras, setExtras] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState({});
  const [openItems, setOpenItems] = useState({});
  const [openQuantity, setOpenQuantity] = useState({});
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    const getExtras = async () => {
      try {
        const data = await fetchExtras();
        setExtras(data);
      } catch (err) {
        setError("Error al obtener los extras");
      } finally {
        setLoading(false);
      }
    };

    getExtras();
  }, []);

  useEffect(() => {
    const storedExtras = localStorage.getItem("selectedExtras");
    if (storedExtras) {
      setSelectedExtras(JSON.parse(storedExtras));
      setQuantity(JSON.parse(storedExtras)); // Para que también se refleje visualmente
      const openQuantityState = {};
      Object.keys(JSON.parse(storedExtras)).forEach((id) => {
        openQuantityState[id] = true;
      });
      setOpenQuantity(openQuantityState);
    }
  }, []);

  const toggleCollapse = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleQuantity = (id) => {
    setOpenQuantity((prev) => ({
      ...prev,
      [id]: true, // Cuando haga click, siempre abrir
    }));

    setQuantity((prev) => ({
      ...prev,
      [id]: 1, // Iniciar la cantidad directamente en 1
    }));
  };
  const handleIncrement = (id) => {
    setQuantity((prev) => {
      const newQuantity = (prev[id] || 1) + 1;
      const updated = {
        ...prev,
        [id]: newQuantity,
      };
      updateSelectedExtras(updated);
      return updated;
    });
  };

  const handleDecrement = (id) => {
    setQuantity((prev) => {
      const newQuantity = Math.max(0, (prev[id] || 1) - 1);
      const updated = {
        ...prev,
        [id]: newQuantity,
      };
      updateSelectedExtras(updated);
      if (newQuantity === 0) {
        setOpenQuantity((prevOpen) => ({
          ...prevOpen,
          [id]: false,
        }));
      }
      return updated;
    });
  };

  const updateSelectedExtras = (updatedQuantities) => {
    const selected = {};

    for (const id in updatedQuantities) {
      if (updatedQuantities[id] > 0) {
        selected[id] = updatedQuantities[id];
      }
    }

    setSelectedExtras(selected);
    localStorage.setItem("selectedExtras", JSON.stringify(selected));
  };

  const handleSelectExtra = (id) => {
    const updatedSelected = {
      ...selectedExtras,
      [id]: 1,
    };

    setSelectedExtras(updatedSelected);
    setOpenQuantity((prev) => ({
      ...prev,
      [id]: true,
    }));
    setQuantity((prev) => ({
      ...prev,
      [id]: 1,
    }));

    localStorage.setItem("selectedExtras", JSON.stringify(updatedSelected));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative w-full min-h-screen text-black bg-cover bg-center">
      <section className="relative flex px-5 mt-40 mb-36 w-9/10 mx-auto rounded-t-xl">
        <main className="w-3/4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-14">
          {extras.map((extra) => (
            <article key={extra.id}>
              <div
                style={{
                  position: "relative",
                  width: "250px",
                  height: "250px",
                  backgroundImage: `url(${URL_BACK}${extra.images[0].url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="bg-gray-200 rounded-lg shadow-md flex items-center justify-center"
              >
                <div className="absolute top-0 -right-3 bg-[#0097e6] text-white font-semibold rounded-md rotate-25 px-3 py-1 shadow-2xs">
                  {extra.price} €
                </div>

                <div className="absolute -bottom-6 left-0 inline-flex gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-gray-300 text-gray-800 shadow-2xs">
                  <Collapsible
                    trigger={
                      <div
                        className="flex justify-between cursor-pointer py-3 px-4 w-full"
                        onClick={() => toggleCollapse(extra.id)}
                      >
                        {extra.name}
                        {openItems[extra.id] ? (
                          <IoIosArrowUp className="text-xl font-bold" />
                        ) : (
                          <IoIosArrowDown className="text-xl font-bold" />
                        )}
                      </div>
                    }
                    open={openItems[extra.id]}
                  >
                    <div className="w-full text-gray-500 bg-gray-200 px-4 py-2">
                      <p>{extra.description}</p>
                    </div>
                  </Collapsible>
                </div>
              </div>

              <div
                className="w-62 h-7 mt-7"
                onClick={() => {
                  if (!openQuantity[extra.id]) {
                    toggleQuantity(extra.id);
                  }
                }}
              >
                {openQuantity[extra.id] ? (
                  <div className="flex justify-between px-5 bg-[#0097e6] text-white py-2 w-full rounded-lg shadow-2xs hover:bg-[#007bb5] focus:outline-hidden focus:bg-[#007bb5]">
                    <span>{quantity[extra.id] || 1}</span>

                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDecrement(extra.id);
                        }}
                        className="bg-white text-[#0097e6] rounded-full px-2 font-bold"
                      >
                        {quantity[extra.id] === 1 ? <FaRegTrashAlt /> : "-"}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIncrement(extra.id);
                        }}
                        className="bg-white text-[#0097e6] rounded-full px-2 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="bg-[#0097e6] text-white py-2 w-full rounded-lg shadow-2xs hover:bg-[#007bb5] focus:outline-hidden focus:bg-[#007bb5]"
                    onClick={() => handleSelectExtra(extra.id)}
                  >
                    ¡LO QUIERO!
                  </button>
                )}
              </div>
            </article>
          ))}
        </main>

        {/* Detalles de Reserva de los extras */}
        <ExtraReservation
          selectedExtras={selectedExtras}
          extras={extras}
          setSelectedExtras={setSelectedExtras}
          setQuantity={setQuantity}
          setOpenQuantity={setOpenQuantity}
        />
      </section>
    </div>
  );
}

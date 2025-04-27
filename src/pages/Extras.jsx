import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import { fetchExtras } from "../services/api";
import { URL_BACK } from "../services/api";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { Header } from "../components/Header";
import { ExtraReservation } from "../components/ExtraReservation";

export function Extras() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [extras, setExtras] = useState([]);
  const [openItems, setOpenItems] = useState({});
  const [openQuantity, setOpenQuantity] = useState({});
  const [quantity, setQuantity] = useState({});

  const toggleCollapse = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleQuantity = (id) => {
    setOpenQuantity((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

  const handleIncrement = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative w-full min-h-screen text-black bg-cover bg-center">
      <Header />
      {console.log(extras)}

      <section className="relative flex px-5 mt-20 mb-36 w-9/10 mx-auto rounded-t-xl">
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

              <div className="w-62 h-7 mt-7" onClick={() => toggleQuantity(extra.id)}>
                {openQuantity[extra.id] ? (
                  <div className="flex justify-between px-5 bg-[#0097e6] text-white py-2 w-full rounded-lg shadow-2xs hover:bg-[#007bb5] focus:outline-hidden focus:bg-[#007bb5]">
                   <span>{quantity[extra.id] || 0} </span> 

                   <div className="flex space-x-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDecrement(extra.id); }}
                      className="bg-white text-[#0097e6] rounded-full px-2 font-bold"
                    >
                      -
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleIncrement(extra.id); }}
                      className="bg-white text-[#0097e6] rounded-full px-2 font-bold"
                    >
                      +
                    </button>
                  </div>
                     
                  </div>
                ) : (
                  <button
                    className="bg-[#0097e6] text-white py-2 w-full rounded-lg shadow-2xs hover:bg-[#007bb5] focus:outline-hidden focus:bg-[#007bb5]"
                  >
                    ¡LO QUIERO!
                  </button>
                )}
              </div>
            </article>
          ))}
        </main>

        {/* Detalles de Reserva de los extras */}
        <ExtraReservation />
      </section>
    </div>
  );
}

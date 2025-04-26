import React from "react";
import Collapsible from "react-collapsible";
import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import { fetchExtras } from "../services/api";
import { URL_BACK } from "../services/api";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export function Extras() {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [extras, setExtras] = useState([]);
  const [openItems, setOpenItems] = useState({});

  const toggleCollapse = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Cambia el estado solo del elemento con el id correspondiente
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

  // Funciones para incrementar y decrementar
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Solo decrementa si el valor es mayor a 1
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1); // Siempre incrementa
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative w-full h-screen text-black bg-cover bg-center">
      <Header />
      {console.log(extras)}

      <section className="relative flex px-5 mt-20 mb-36 w-9/10 mx-auto rounded-t-xl">
        <main className="w-3/4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-14">
          {extras.map((extra) => (
            <article>
              <div
                key={extra.id}
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
                        className="flex justify-between cursor-pointer py-3 px-4"
                        onClick={() => toggleCollapse(extra.id)}
                      >
                        {extra.name}
                        {openItems[extra.id] ? (
                          <IoIosArrowUp className="text-xl text-bold" />
                        ) : (
                          <IoIosArrowDown className="text-xl text-bold" />
                        )}
                      </div>
                    }
                    open={openItems[extra.id]}
                  >
                    <div className="w-full text-gray-500 bg-gray-200 px-4">
                      <p>{extra.description}</p>
                    </div>
                  </Collapsible>
                </div>
              </div>

              <div className="w-62 h-7 mt-7">
                <button className="bg-[#0097e6] text-white py-2 w-full rounded-lg shadow-2xs hover:bg-[#007bb5] focus:outline-hidden focus:bg-[#007bb5]">
                  ¡ LO QUIERO !
                </button>
              </div>
            </article>
          ))}
        </main>

        <aside className="w-1/4 h-screen py-2.5  rounded-lg border border-gray-200 bg-gray-300 text-gray-800 shadow-2xs">
          <h2 className="text-xl font-medium">Resumen de tu selección</h2>
        </aside>
      </section>

      <div className="py-2 px-3 w-full bg-white border border-gray-200 rounded-lg">
        <div
          className="w-full flex justify-between items-center gap-x-3"
          data-hs-input-number=""
        >
          <div>
            <span className="block text-xs text-gray-500">Select quantity</span>
            <input
              className="p-0 bg-transparent border-0 text-gray-800 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              style={{ MozAppearance: "textfield" }}
              type="text"
              aria-roledescription="Number field"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, e.target.value))}
              data-hs-input-number-input=""
            />
          </div>
          <div className="flex justify-end items-center gap-x-1.5">
            <button
              type="button"
              className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              onClick={handleDecrement}
              aria-label="Decrease"
            >
              <svg
                className="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
              </svg>
            </button>
            <button
              type="button"
              className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              onClick={handleIncrement}
              aria-label="Increase"
            >
              <svg
                className="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

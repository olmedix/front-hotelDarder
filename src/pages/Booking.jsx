import { useReservation } from "../contexts/ReservationContext";
import { ReservationForm } from "../components/ReservationForm";
import { useEffect, useState } from "react";
import { fetchPension } from "../services/api";

import Collapsible from "react-collapsible";
import { SiTicktick } from "react-icons/si";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export function Booking() {
  const { state, roomNumber, rooms, people } = useReservation();

  const [loadingPension, setLoadingPension] = useState(true);
  const [errorPension, setErrorPension] = useState(null);
  const [pension, setPension] = useState([]);
  const [selectedRegimen, setSelectedRegimen] = useState(null);

  const [openId, setOpenId] = useState(null); // para manejar cuál está abierto

  const handleClick = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleRadioChange = (id) => {
    setSelectedRegimen(id);
    setOpenId(id);
  };

  useEffect(() => {
    const getPension = async () => {
      try {
        const data = await fetchPension();
        console.log(data);
        setPension(data);
      } catch (err) {
        setErrorPension(err.message);
      } finally {
        setLoadingPension(false);
      }
    };

    getPension();
  }, []);

  if (loadingPension) return <div>Cargando...</div>;
  if (errorPension) return <div>{errorPension}</div>;

  return (
    <div className="relative w-full min-h-screen text-black bg-cover bg-center">
      <div className="mt-40 ">
        <ReservationForm />
      </div>

      <div className="flex w-9/10 mx-auto mt-20 mb-36">
        <section className="block w-3/4 text-left bg-red-400 px-5 mx-auto rounded-t-xl">
          <h2 className="text-black text-4xl font-bold pt-8">
            Elige un régimen
          </h2>

          {pension.map((item) => {
            const isOpen = openId === item.id;
            const isChecked = selectedRegimen === item.id;

            return (
              <div
                key={item.id}
                className="border-2 border-gray-200 rounded-lg bg-white p-5 mt-5"
              >
                <div className="flex justify-between items-center pb-3 border-b-2 border-gray-200 text-lg">
                  {/* Radio + Label (no abre/cierra) */}
                  <label className="font-semibold flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="regimen"
                      value={item.name}
                      checked={isChecked}
                      onChange={() => handleRadioChange(item.id)}
                      className="mr-2"
                    />
                    {item.name}
                  </label>

                  {/* Botón de abrir/cerrar (no afecta al radio) */}
                  <button
                    type="button"
                    onClick={() => handleClick(item.id)}
                    className="focus:outline-none"
                  >
                    {isOpen ? (
                      <IoIosArrowUp className="text-xl font-bold" />
                    ) : (
                      <IoIosArrowDown className="text-xl font-bold" />
                    )}
                  </button>
                </div>

                {/* Collapsible: solo depende de openId */}
                <Collapsible open={isOpen}>
                  <div className="block w-full px-4 py-3">
                    {item.description.split(",").map((desc, index) => (
                      <p key={index} className="flex mt-2">
                        <span className="pr-2 text-[#0097e6]">
                          <SiTicktick />
                        </span>
                        {desc.trim()}
                      </p>
                    ))}
                  </div>
                </Collapsible>
              </div>
            );
          })}
        </section>

        <aside className="w-1/4 h-80 bg-amber-300">
          <div className="w-full py-2.5 rounded-lg border border-gray-200 bg-gray-300 text-gray-800 shadow-2xs">
            <h3>Detalles</h3>
          </div>
        </aside>
      </div>
    </div>
  );
}
